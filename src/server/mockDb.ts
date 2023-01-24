import {
  RegisterForm,
  UserTableRow,
  GetMembershipAccessListResponse,
  AccessTableRow,
} from '@interviewApp/src/types';

const users: UserTableRow[] = [
  {
    userName: 'Admin',
    email: 'admin@madeup.com',
    membershipType: 'admin',
    password: 'made',
    fullName: 'Admin',
  },
];

const access: AccessTableRow[] = [
  {
    membershipType: 'gold',
    portalAccess: [
      {url: '/Gold', description: 'Gold'},
      {url: '/Home', description: 'Home'},
    ],
    apiAccess: [{url: '/api/getUserProfile', description: 'getUserProfile'}],
  },
  {
    membershipType: 'silver',
    portalAccess: [
      {url: '/Silver', description: 'Silver'},
      {url: '/Home', description: 'Home'},
    ],
    apiAccess: [{url: '/api/getUserProfile', description: 'getUserProfile'}],
  },
  {
    membershipType: 'bronze',
    portalAccess: [
      {url: '/Bronze', description: 'Bronze'},
      {url: '/Home', description: 'Home'},
    ],
    apiAccess: [{url: '/api/getUserProfile', description: 'getUserProfile'}],
  },
  {
    membershipType: 'admin',
    portalAccess: [
      {url: '/Bronze', description: 'Bronze'},
      {url: '/Home', description: 'Home'},
      {url: '/Silver', description: 'Silver'},
      {url: '/Gold', description: 'Gold'},
    ],
    apiAccess: [{url: '/api/getUserProfile', description: 'getUserProfile'}],
  },
];

const mockDb = () => ({
  getMembershipAccessList: (
    membershipType: string,
  ): GetMembershipAccessListResponse => {
    const accessRow = access.find((a: AccessTableRow) => {
      return a.membershipType === membershipType;
    });
    if (accessRow) {
      return {
        portalAccessList: accessRow.portalAccess,
        apiAccessList: accessRow.apiAccess,
      };
    }
  },
  addUser: (registerForm: UserTableRow): boolean =>
    users.push(registerForm) > 0 ? true : false,
  getUser: (userName: string): UserTableRow =>
    users.find((user: RegisterForm) => user.userName === userName),
});

export default mockDb;
