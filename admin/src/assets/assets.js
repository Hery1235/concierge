export const usersDummyData = [
  {
    _id: "user_admin_001",
    username: "Admin Master",
    email: "admin.master@example.com",
    role: "admin",
    assignedSite: null,
    createdAt: "2025-03-25T09:29:16.367Z",
    updatedAt: "2025-04-10T06:34:48.719Z",
    __v: 1,
  },
  {
    _id: "user_concierge_001",
    username: "Concierge Sam",
    email: "concierge.sam@example.com",
    role: "concierge",
    assignedSite: "site_001",
    createdAt: "2025-03-28T11:12:30.167Z",
    updatedAt: "2025-04-05T10:20:12.445Z",
    __v: 1,
  },
];

export const sitesDummyData = [
  {
    _id: "site_001",
    name: "Sunset Boulevard Apartments",
    address: "123 Sunset Blvd, LA, CA",
    owner: "user_admin_001",
    createdBy: "user_admin_001",
    createdAt: "2025-04-01T08:00:00.000Z",
  },
  {
    _id: "site_002",
    name: "Palm Heights",
    address: "456 Palm St, Miami, FL",
    owner: "user_admin_001",
    createdBy: "user_admin_001",
    createdAt: "2025-04-03T10:15:00.000Z",
  },
];
export const buildingDummyData = [
  {
    id: "building_001",
    name: "Cooper",
    totalNumberOfFlats: 100,
    site: "site_001",
  },
  {
    id: "building_002",
    name: "Merchant",
    totalNumberOfFlats: 90,
    site: "site_002",
  },
];
export const residents = [
  {
    id: "resident_001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    building: buildingDummyData[0],
    phone: "07458172615",
    flatNumber: 12,
  },
  {
    id: "resident_002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    building: buildingDummyData[1],
    phone: "07458172615",
    flatNumber: 45,
  },
  {
    id: "resident_003",
    name: "Clara Lee",
    email: "clara.lee@example.com",
    building: buildingDummyData[1],
    phone: "07458172615",
    flatNumber: 7,
  },
  {
    id: "resident_004",
    name: "David Patel",
    email: "david.patel@example.com",
    building: buildingDummyData[1],
    phone: "07458172600",
    flatNumber: 33,
  },
];

export const parcelsDummyData = [
  {
    _id: "parcel_001",

    resident: residents[0],
    trackingNumber: "1234567890",
    concierge: "Hamdan",
    pickedAt: null,
    pickedBy: null,
    timestamp: "2025-06-09T10:00:00.000Z",
  },
  {
    _id: "parcel_002",

    resident: residents[1],

    trackingNumber: "0987654321",
    concierge: "AALyan",
    pickedAt: "2025-06-08T09:00:00.000Z",
    pickedBy: "Hamza",
    timestamp: "2025-06-07T14:00:00.000Z",
  },
  {
    _id: "parcel_003",
    resident: residents[1],
    trackingNumber: "1122334455",
    concierge: "Shaqiza",
    pickedAt: null,
    pickedBy: null,
    timestamp: "2025-06-10T12:00:00.000Z",
  },
];
