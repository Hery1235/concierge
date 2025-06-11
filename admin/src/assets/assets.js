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

export const flatsAndResidentsDummyData = [
  {
    _id: "flat_001",
    site: sitesDummyData[0],
    flatAddress: "24A",
    residents: [
      {
        _id: "res1",
        name: "Haris",
        email: "haris@example.com",
        phone: "07459151351",
      },
      {
        _id: "res2",
        name: "Habeen",
        email: "gabeen@example.com",
        phone: "07459151351",
      },
    ],
    createdBy: "user_admin_001",
    createdAt: "2025-04-01T09:00:00.000Z",
  },
  {
    _id: "flat_002",
    site: sitesDummyData[0],
    flatAddress: "11A",
    residents: [
      {
        _id: "res3",
        name: "Hamdan",
        email: "haris@example.com",
        phone: "07459151351",
      },
    ],
    createdBy: "user_admin_001",
    createdAt: "2025-04-01T09:00:00.000Z",
  },
];

export const parcelsDummyData = [
  {
    _id: "parcel_001",
    name: "Muhammad Haris",
    site: "site_001",
    receivedBy: "user_concierge_001",
    flat: flatsAndResidentsDummyData[0],
    trackingNumber: "1234567890",
    collected: true,
    receivedAt: "2025-06-09T10:00:00.000Z",
    pickedAt: null,
  },
  {
    _id: "parcel_002",
    name: "Shanaya",
    site: "site_001",
    receivedBy: "user_concierge_001",
    flat: flatsAndResidentsDummyData[1],
    trackingNumber: "0987654321",
    collected: false,
    receivedAt: "2025-06-07T14:00:00.000Z",
    pickedAt: "2025-06-08T09:00:00.000Z",
  },
  {
    _id: "parcel_003",
    name: "Hamdan waqar",
    site: "site_002",
    receivedBy: "user_admin_001",
    flat: flatsAndResidentsDummyData[0],
    trackingNumber: "1122334455",
    collected: true,
    receivedAt: "2025-06-10T12:00:00.000Z",
    pickedAt: null,
  },
];
