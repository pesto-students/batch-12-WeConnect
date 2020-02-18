/* eslint-disable */

import request from "supertest";
import db from "../../db";
import app from "../../app";
import Location from "../../models/location";

describe("Testing the Location apis", () => {
  var sampleWorkspace = {
    workspace_name: "Example Workspace",
    address: {
      full_address: "Plot-5/87, Phase 4, blue one square",
      locality: "Udyog Vihar",
      pincode: "713336"
    },
    location: "EXAMPLECITY",
    operation_hours: [
      "09:00 - 23:00",
      "09:00 - 23:00",
      "09:00 - 23:00",
      "09:00 - 23:00",
      "09:00 - 23:00",
      "closed",
      "closed"
    ],
    owner: "userID",
    workspace_amenities: ["Coffee", "DustBin", "Wifi", "Parking"]
  };

  beforeAll(() => db.dbConnect());

  let locationid;
  let workspaceid;

  test("Add with all correct values", async () => {
    const res = await request(app)
      .post("/api/workspace/")
      .send(sampleWorkspace);
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toBeTruthy();
    expect(res.body.location_id).toBeTruthy();
    expect(res.body.workspace_id).toBeTruthy();
    locationid = res.body.location_id;
    workspaceid = res.body.workspace_id;
  });

  test("Fetch the values of the sample workspace", async () => {
    const response = await request(app).get(
      `/api/workspace/${sampleWorkspace.location}`
    );
    expect(response.statusCode).toEqual(200);
    const workspace = response.body.locations[0].workspaces[0];
    expect(workspace.name).toEqual(sampleWorkspace.workspace_name);
    expect(workspace.workspaceAmenities).toBeTruthy();
    expect(workspace.operationHours).toBeTruthy();
    expect(workspace.address).toBeTruthy();
    expect(workspace.owner).toBeTruthy();
  });

  const newName = "EXAMPLE NAME 2";

  test("Update Workspace Name", async () => {
    const response = await request(app)
      .put(`/api/workspace/${locationid}/${workspaceid}`)
      .send({ workspace_name: newName });
    expect(response.statusCode).toEqual(202);

    const updatedResponse = await request(app).get(
      `/api/workspace/${sampleWorkspace.location}`
    );
    expect(updatedResponse.statusCode).toEqual(200);
    const workspace = updatedResponse.body.locations[0].workspaces[0];
    expect(workspace.name).toEqual(newName);
    expect(workspace.workspaceAmenities).toBeTruthy();
    expect(workspace.operationHours).toBeTruthy();
    expect(workspace.address).toBeTruthy();
    expect(workspace.owner).toBeTruthy();
  });

  test("Delete the workspace from the city (Wrong Location ID)", async () => {
    const res = await request(app).delete(
      `/api/workspace/wrongId/${workspaceid}`
    );
    expect(res.statusCode).toEqual(400);
  });

  test("Delete the workspace from the city (Wrong Workspace ID)", async () => {
    const res = await request(app).delete(
      `/api/workspace/${locationid}/wrongworkspaceid`
    );
    expect(res.statusCode).toEqual(400);
  });

  test("Delete the workspace from the city", async () => {
    const res = await request(app).delete(
      `/api/workspace/${locationid}/${workspaceid}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBeTruthy();
  });

  afterAll(() => {
    return Location.deleteOne({ _id: locationid }, () => {
      return db.dbDisconnect();
    });
  });
});
