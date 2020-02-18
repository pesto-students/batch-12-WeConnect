import mongoose from 'mongoose';
import Logger from '../logger';
import Workspace from './workspace';

const logger = Logger('Model > Location');

const locationSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  workspaces: {
    type: [Workspace],
    required: true,
  },
});

locationSchema.statics.fetchWorkspaces = async (
  location,
  page,
  workspacePerPage,
) => {
  const workspaces = await Location.find({
    location: { $regex: `.*${location.toLowerCase()}.*` },
  });
  if (workspaces == null) {
    return [];
  }
  const startIndex = (parseInt(page, 10) - 1) * parseInt(workspacePerPage, 10);
  const endIndex =
    (parseInt(page, 10) - 1) * parseInt(workspacePerPage, 10) +
    parseInt(workspacePerPage, 10);
  const workspacesToRender = workspaces.slice(startIndex, endIndex);
  return workspacesToRender;
};

locationSchema.statics.addWorkspaceImage = async (
  locationId,
  workspaceId,
  imageURL,
) => {
  try {
    const workspaceLocation = Location.findOne({ _id: locationId });
    const arrayOfWorkspaces = workspaceLocation.workspaces;
    arrayOfWorkspaces.foreach((workspace) => {
      // eslint-disable-next-line no-underscore-dangle
      if (workspace._id === workspaceId) {
        const arrayOfWorkspaceImages = workspace.images;
        arrayOfWorkspaceImages.push(imageURL);
      }
    });
    await workspaceLocation.save();
    return true;
  } catch (error) {
    logger.error(`Error while adding image ${error}`);
    return false;
  }
};

const createNewLocation = (locationName) => {
  logger.info(`Creating New Location, Name: ${locationName}`);
  const locationModel = new Location({
    location: locationName,
    workspaces: [],
  });
  return locationModel;
};

locationSchema.statics.addNewWorkspace = async (
  locationName,
  workspaceSchema,
) => {
  const location = locationName.trim().toLowerCase();
  logger.debug(`Adding Workspace in Location: ${location}`);

  let locationInDB = await Location.findOne({ location });
  if (locationInDB == null) {
    logger.info(`Location: ${location} is not in the database`);
    locationInDB = createNewLocation(location);
  } else {
    logger.info(`Location: ${location} found in the database`);
  }
  const workspaceInLocationModel = locationInDB.workspaces;
  logger.debug('Workspace in Database', workspaceInLocationModel);
  workspaceInLocationModel.push(workspaceSchema);
  const updatedLocation = await locationInDB.save();
  const lengthOfWorkspaces = updatedLocation.workspaces.length;
  const locationId = updatedLocation._id;
  const workspaceId = updatedLocation.workspaces[lengthOfWorkspaces - 1]._id;
  return {
    location_id: locationId,
    workspace_id: workspaceId,
  };
};

locationSchema.statics.deleteWorkspace = async (locationId, workspaceId) => {
  const locationInDB = await Location.findById(locationId);
  if (locationInDB == null) {
    throw new Error('Wrong Location ID');
  }

  logger.info(`Going to delete the workspace in ${locationInDB.location}`);

  const workspaceInDB = locationInDB.workspaces;

  logger.info(`Total workspaces : ${workspaceInDB.length}`);

  let nameOfWorkspaceToBeDeleted;
  const updatedWorkspaces = workspaceInDB.filter((workspace) => {
    const workspaceInDBId = workspace._id.toString();
    if (workspaceInDBId === workspaceId) {
      nameOfWorkspaceToBeDeleted = workspace.name;
      logger.info(`Deleting ${nameOfWorkspaceToBeDeleted} From the array...`);
      /* Compare the owner of workspace with current owner here else throw exception */
      return false;
    }
    return true;
  });

  if (updatedWorkspaces.length === workspaceInDB.length) {
    throw new Error('Wrong Workspace ID');
  } else {
    locationInDB.workspaces = updatedWorkspaces;
    await locationInDB.save();
    return true;
  }
};

const Location = mongoose.model('Location', locationSchema);

export default Location;
