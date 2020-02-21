import Location from '../models/location';
import Logger from '../logger';

const logger = Logger('controller > rooms');

const getFloorList = async (location, locationid, workspaceid) => {
  if (location === null) {
    throw new Error(`Location Id doesn't exits ${locationid}`);
  }
  const findWorkspace = location.workspaces.id(workspaceid);
  if (findWorkspace === null) {
    throw new Error(`Workspace Id doesn't exits ${workspaceid}`);
  }
  const { floors } = findWorkspace;
  return floors;
};

const fetchRoom = async (
  location,
  locationid,
  workspaceid,
  floorid,
  roomid,
) => {
  if (location === null) {
    throw new Error(`Location Id doesn't exits ${locationid}`);
  }
  const getWorkspace = location.workspaces.id(workspaceid);
  if (getWorkspace === null) {
    throw new Error(`WorkSpace Id doesn't exits ${workspaceid}`);
  }
  const getFloor = getWorkspace.floors.id(floorid);
  if (getFloor === null) {
    throw new Error(`Floor Id doesn't exits ${floorid}`);
  }
  const room = getFloor.rooms.id(roomid);
  return { room, getFloor };
};

exports.getRooms = async (request, response, next) => {
  const { locationid, workspaceid } = request.params;

  try {
    const location = await Location.findById(locationid);
    const floors = await getFloorList(location, locationid, workspaceid);
    response.status(200);
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(floors));
    logger.info(`Get Floor by Workspace & Location: ${floors}`);
  } catch (error) {
    response.status(404);
    response.send(`${error}`);
    logger.info(`Error in getRooms controller: ${error}`);
  }
  return next();
};

exports.addRoom = async (request, response, next) => {
  const { locationid, workspaceid } = request.params;
  logger.info(`${locationid} ${workspaceid}`);
  const {
    floorName,
    name,
    amenities,
    capacity,
    isActive,
    description,
  } = request.body;
  const roomSchema = {
    name,
    amenities,
    images: [],
    isAvailable: isActive,
    description,
    capacity,
  };
  try {
    const location = await Location.findById(locationid);
    const floors = await getFloorList(location, locationid, workspaceid);
    const isFloorPresent = floors.some(
      (floor) => floor.name.toLowerCase() === floorName.toLowerCase(),
    );
    if (isFloorPresent) {
      const floor = floors.find(
        (eachfloor) => eachfloor.name.toLowerCase() === floorName.toLowerCase(),
      );
      floor.rooms.push(roomSchema);
      await location.save();
      const addedRoom = floor.rooms.find((eachroom) => eachroom.name === name);
      response.status(201);
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(addedRoom));
    } else {
      const floorSchema = {
        name: floorName,
        rooms: [],
        isActive: true,
      };
      floors.push(floorSchema);
      await location.save();
      const workspace = location.workspaces.id(workspaceid);
      const floor = workspace.floors.find(
        (eachfloor) => eachfloor.name.toLowerCase() === floorName.toLowerCase(),
      );
      floor.rooms.push(roomSchema);
      await location.save();
      response.status(201);
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(floor));
    }
  } catch (error) {
    response.status(404);
    response.send(`${error}`);
    logger.info(`add room > ${error}`);
  }
  return next();
};

exports.deleteRoom = async (request, response, next) => {
  const { roomid } = request.params;
  const { locationid, workspaceid, floorid } = request.body;

  try {
    const location = await Location.findById(locationid);
    const { room, getFloor } = await fetchRoom(
      location,
      locationid,
      workspaceid,
      floorid,
      roomid,
    );
    if (room === null) {
      throw new Error(`Room Id doesn't exits ${roomid}`);
    }
    logger.info(`room to be deleted, ${room}`);
    getFloor.rooms.splice(getFloor.rooms.indexOf(room), 1);
    const updatedLocation = await location.save();
    response.status(200);
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(updatedLocation));
  } catch (error) {
    response.status(404);
    response.send(`${error}`);
    logger.info(`delete room > ${error}`);
  }
  return next();
};

exports.updateRoom = async (request, response, next) => {
  const { roomid } = request.params;
  const { locationid, workspaceid, floorid, room } = request.body;
  logger.info(`room data from client ${room}`);
  try {
    const location = await Location.findById(locationid);
    const fetchRoomObj = await fetchRoom(
      location,
      locationid,
      workspaceid,
      floorid,
      roomid,
    );
    const getRoom = fetchRoomObj.room;
    if (getRoom === null) {
      throw new Error(`Room Id doesn't exits ${roomid}`);
    }
    const { name, amenities, capacity, isActive, description } = room;
    getRoom.name = name;
    getRoom.amenities = amenities;
    getRoom.capacity = capacity;
    getRoom.isActive = isActive;
    getRoom.description = description;
    logger.info(`udpated Room ${getRoom}`);
    const updatedLocation = await location.save();
    response.status(200);
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(updatedLocation));
  } catch (error) {
    response.status(404);
    response.send(`${error}`);
    logger.info(`updated room > ${error}`);
  }
  return next();
};

exports.addRoomImages = async (request, response, next) => {
  logger.info('Adding Images for the workspace');
  const locationId = request.params.locationid;
  const workspaceId = request.params.workspaceid;
  const { floorId, roomId } = request.body;
  try {
    if (locationId == null || workspaceId == null) {
      request.status(400);
      return next();
    }
    const imageURL = request.originalUrl;
    const location = await Location.findById(locationId);
    const workspace = location.workspaces.id(workspaceId);
    const floor = workspace.floors.id(floorId);
    const room = floor.rooms.id(roomId);
    room.images.push(imageURL);
    await location.save();
    logger.debug(`Room to be udpated : ${room} `);
    response.status(200);
    response.send('Image Uploaded Successfully');
  } catch (error) {
    logger.error(error.toString());
    response.status(500);
  }
  return next();
};
