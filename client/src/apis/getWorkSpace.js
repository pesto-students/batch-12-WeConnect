import axios from 'axios';
import BASE_URL from '../constants';

const LoadData = async (query) => {
  console.log(query);
  const response = await axios.get(BASE_URL + '/api/workspace/' + query);
  console.log('ssssss');
  console.log(response);
  if (response.status < 300) {
    const { data } = response;
    return data;
  }
  return [];
};

const sampleLocation = {
  status: 'success',
  workspaces: [
    {
      operationHours: [
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        'closed',
        'closed',
      ],
      isActive: false,
      maxCapacity: 0,
      images: [
        'https://via.placeholder.com/350x150?text=WEWORK',
        'https://via.placeholder.com/350x150?text=WEWORK2',
        'https://via.placeholder.com/350x150?text=WEWORK3',
      ],
      floors: [],
      workspaceAmenities: ['Coffee', 'Theatre', 'Parking'],
      roomAmenities: [],
      operationalHours: [],
      _id: '5e4add8f81686374dcdd3fd4',
      name: 'WeWork',
      address: {
        _id: '5e4add8f81686374dcdd3fd5',
        fullAddress: 'Plot-5/87, Phase 4, blue one square',
        locality: 'udyog vihar',
        pincode: '713336',
      },
      owner: '5e4700a5ffcc4113d83a80ff',
    },
    {
      operationHours: [
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        'closed',
        'closed',
      ],
      isActive: false,
      maxCapacity: 0,
      images: [
        'https://via.placeholder.com/350x150?text=SOMEIMAGE',
        'https://via.placeholder.com/350x150?text=LLLLL',
        'https://via.placeholder.com/350x150?text=THIRD',
      ],
      floors: [],
      workspaceAmenities: ['Smoking Area', 'Parking'],
      roomAmenities: [],
      operationalHours: [],
      _id: '5e4add8f81686374dcdd3fd4',
      name: 'We Work Delhi',
      address: {
        _id: '5e4add8f81686374dcdd3fd5',
        fullAddress: 'Plot-5/87, Phase 4, blue one square',
        locality: 'udyog vihar',
        pincode: '713336',
      },
      owner: '5e4700a5ffcc4113d83a80ff',
    },
    {
      operationHours: [
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        'closed',
        'closed',
      ],
      isActive: false,
      maxCapacity: 0,
      images: [
        'https://via.placeholder.com/350x150?text=Delhi',
        'https://via.placeholder.com/350x150?text=DELHI',
        'https://via.placeholder.com/350x150?text=INDIA',
      ],
      floors: [],
      workspaceAmenities: ['Chai', 'Coffee', 'Snacks'],
      roomAmenities: [],
      operationalHours: [],
      _id: '5e4add8f81686374dcdd3fd4',
      name: 'DelhiBeast',
      address: {
        _id: '5e4add8f81686374dcdd3fd5',
        fullAddress: 'Plot-5/87, Phase 4, blue one square',
        locality: 'udyog vihar',
        pincode: '713336',
      },
      owner: '5e4700a5ffcc4113d83a80ff',
    },
    {
      operationHours: [
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        'closed',
        'closed',
      ],
      isActive: false,
      maxCapacity: 0,
      images: [
        'https://via.placeholder.com/350x150?text=WEWORK',
        'https://via.placeholder.com/350x150?text=SECOND',
        'https://via.placeholder.com/350x150?text=THIRD',
      ],
      floors: [],
      workspaceAmenities: ['Chai', 'Coffee', 'Parking'],
      roomAmenities: [],
      operationalHours: [],
      _id: '5e4add8f81686374dcdd3fd4',
      name: 'StartupHub',
      address: {
        _id: '5e4add8f81686374dcdd3fd5',
        fullAddress: 'Plot-5/87, Phase 4, blue one square',
        locality: 'udyog vihar',
        pincode: '713336',
      },
      owner: '5e4700a5ffcc4113d83a80ff',
    },
    {
      operationHours: [
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        'closed',
        'closed',
      ],
      isActive: false,
      maxCapacity: 0,
      images: [
        'https://via.placeholder.com/350x150?text=WEWORK',
        'https://via.placeholder.com/350x150?text=SECOND',
        'https://via.placeholder.com/350x150?text=THIRD',
      ],
      floors: [],
      workspaceAmenities: ['Chai', 'Coffee', 'Parking'],
      roomAmenities: [],
      operationalHours: [],
      _id: '5e4add8f81686374dcdd3fd4',
      name: 'WorkTogether',
      address: {
        _id: '5e4add8f81686374dcdd3fd5',
        fullAddress: 'Plot-5/87, Phase 4, blue one square',
        locality: 'udyog vihar',
        pincode: '713336',
      },
      owner: '5e4700a5ffcc4113d83a80ff',
    },
    {
      operationHours: [
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        '09:00 - 23:00',
        'closed',
        'closed',
      ],
      isActive: false,
      maxCapacity: 0,
      images: ['https://via.placeholder.com/350x150?text=INNOVATE'],
      floors: [],
      workspaceAmenities: [],
      roomAmenities: [],
      _id: '5e4addfc6f8588763e208e0a',
      name: 'Innovate',
      address: {
        _id: '5e4addfc6f8588763e208e0b',
        fullAddress: 'Somewhere in Delhi, because no one cares',
        locality: 'udyog vihar',
        pincode: '713336',
      },
      owner: '5e4700a5ffcc4113d83a80ff',
    },
  ],
};

const getWorkSpaceData = async (query) => {
  const { workspaces } = await LoadData(query);
  if (workspaces.length > 0) {
    return workspaces;
  }
  return [];
};

export { getWorkSpaceData, sampleLocation };
