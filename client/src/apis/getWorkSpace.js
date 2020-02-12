const getWorkSpaceData = async url => {
  await function wait() {
    return new Promise(setTimeout(() => {}, 4000));
  };
  return {
    status: "success",
    workspaces: [
      {
        operationHours: [],
        isActive: false,
        maxCapacity: 0,
        images: [],
        floors: [],
        workspaceAmenities: [],
        roomAmenities: [],
        operationalHours: [],
        _id: "5e4add8f81686374dcdd3fd4",
        name: "We Work",
        address: {
          _id: "5e4add8f81686374dcdd3fd5",
          fullAddress: "Plot-5/87, Phase 4, blue one square",
          locality: "udyog vihar",
          pincode: "713336"
        },
        owner: "5e4700a5ffcc4113d83a80ff"
      },
      {
        operationHours: [
          ["09:00 - 23:00"],
          ["09:00 - 23:00"],
          ["09:00 - 23:00"],
          ["09:00 - 23:00"],
          ["09:00 - 23:00"],
          ["closed"],
          ["closed"]
        ],
        isActive: false,
        maxCapacity: 0,
        images: [],
        floors: [],
        workspaceAmenities: [],
        roomAmenities: [],
        _id: "5e4addfc6f8588763e208e0a",
        name: "We Work 1",
        address: {
          _id: "5e4addfc6f8588763e208e0b",
          fullAddress: "Plot-5/87, Phase 4, blue one square",
          locality: "udyog vihar",
          pincode: "713336"
        },
        owner: "5e4700a5ffcc4113d83a80ff"
      }
    ]
  };
};

export { getWorkSpaceData };
