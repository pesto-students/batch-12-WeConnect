import Logger from '../logger';
import Location from '../models/location';
import Workspace from '../models/workspace';
import User from '../models/user';

const logger = Logger('controller > workspace');

exports.getWorkspaces = async (request, response, next) => {
  const { qLocation, page = 1, count = 10 } = request.params;
  try {
    if (qLocation === undefined) {
      logger.error('Search Value is empty');
      response.status(404).json({
        error: 'Empty query in the search..',
      });
      return next();
    }
    logger.info(`Exploring workspace at location: ${qLocation}`);
    const workspacesToRender = await Location.fetchWorkspaces(
      qLocation,
      page,
      count,
    );
    response.status(200).json({
      status: 'success',
      workspaces: workspacesToRender,
    });
  } catch (error) {
    logger.error(error);
    response.status(500);
  }
  return next();
};

exports.addWorkspaceImages = async (request, response, next) => {
  logger.info('Adding Images for the workspace');
  const locationId = request.params.locationid;
  const workspaceId = request.params.workspaceid;

  const owner = User.getOwner(request);
  if (owner == null) {
    logger.info('The logged in user is not an owner...');
    response.status(401).json({
      status: 'failure',
      message: 'You are not an Owner. Please register as owner.',
    });
    return next();
  }
  logger.info(`Logged in User is an Owner, Name: ${owner.firstName}`);

  try {
    if (locationId == null || workspaceId == null) {
      request.status(400);
      return next();
    }

    const imageFormData = request.file;
    const imagePath = imageFormData.path;

    logger.debug(`Image Path : ${imagePath}`);

    const imageSaved = Location.addWorkspaceImage(
      locationId,
      workspaceId,
      imagePath,
    );

    logger.debug(`Image Saved : ${imageSaved}`);
    if (imageSaved) {
      response.status(202);
    } else {
      throw new Error('Unable to add Image for workspace');
    }
  } catch (error) {
    logger.error(error.toString());
    response.status(500);
  }
  return next();
};

exports.addWorkspace = async (request, response, next) => {
  logger.info('Adding a Workspace.');

  try {
    const {
      workspaceName,
      address,
      operationHours,
      location,
      workspaceAmenities,
    } = request.body;

    const owner = User.getOwner(request);
    if (owner == null) {
      logger.info('The logged in user is not an owner...');
      response.status(401).json({
        status: 'failure',
        message: 'You are not an Owner. Please register as owner.',
      });
      return next();
    }
    logger.info(`Logged in User is an Owner, Name: ${owner.firstName}`);

    const addressSchema = {
      ...address,
    };

    const workspaceSchema = {
      name: workspaceName,
      address: addressSchema,
      operationHours,
      // eslint-disable-next-line no-underscore-dangle
      owner: owner._id,
      workspaceAmenities,
    };

    const updatedLocation = await Location.addNewWorkspace(
      location,
      workspaceSchema,
    );
    if (
      Object.prototype.hasOwnProperty.call(updatedLocation, 'location_id') &&
      Object.prototype.hasOwnProperty.call(updatedLocation, 'workspace_id')
    ) {
      response.status(201).json({
        status: 'success',
        ...updatedLocation,
      });
    } else {
      throw new Error('Unable to save the new workspace');
    }
    return next();
  } catch (error) {
    logger.error(`Error while saving new location ${error.toString()}`);
    response.status(500).json({
      status: 'Failure',
      Message: 'Internal Server Error',
      error: error.message,
    });
    return next();
  }
};

exports.updateWorkspace = async (request, response, next) => {
  const { locationid, workspaceid } = request.params;
  const { workspaceName, address, operationHours } = request.body;

  const update = { name: workspaceName, address, operationHours };
  const locationInDB = await Location.findById(locationid);
  if (locationInDB === undefined) {
    response.status(404).json({
      status: 'Failure',
      Message: 'Location is not present in your profile',
    });
    return next();
  }
  const workspacesInLocation = locationInDB.workspaces;

  let workspaceToUpdate;
  workspacesInLocation.forEach((workspace) => {
    // eslint-disable-next-line no-underscore-dangle
    if (workspace._id.toString() === workspaceid) {
      workspaceToUpdate = workspace;
    }
  });

  Object.keys(Workspace.paths).forEach((key) => {
    logger.debug(`Checking Key : ${key}`);
    if (update[key] !== undefined) {
      logger.debug(`Updating Key : ${key} : ${update[key]}`);
      workspaceToUpdate[key] = update[key];
    }
  });

  await locationInDB.save();
  response.status(202).json({
    status: 'success',
  });
  return next();
};

exports.deleteWorkspace = async (request, response, next) => {
  const locationId = request.params.locationid.trim();
  const workspaceId = request.params.workspaceid.trim();

  try {
    logger.debug(`Location Id: ${locationId} & Workspace Id: ${workspaceId}`);

    if (workspaceId == null || locationId == null) {
      response.status(400).json({
        status: 'Bad Request - Missing Ids',
      });
      return next();
    }

    const removed = await Location.deleteWorkspace(locationId, workspaceId);
    if (removed) {
      response.status(200).json({
        status: 'success',
      });
    } else {
      response.status(200).json({
        status: 'failed',
      });
    }
  } catch (error) {
    logger.error(error.message || error.toString());
    response.status(400).json({
      error: error.toString(),
    });
  }
  return next();
};
