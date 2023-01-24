import * as React from 'react';
import {useSelector} from 'react-redux';
import {MembershipTypeEnum} from '@interviewApp/src/config';
import {State} from '@interviewApp/src/types';

const Home = () => {
  const membershipType = useSelector(
    (state: State) => state.userProfile.membershipType,
  );

  return (
    <>
      <h1>Home Page</h1>
      {membershipType === MembershipTypeEnum.Gold || membershipType === MembershipTypeEnum.Admin && (
        <a href="/Gold">Gold Membership Page</a>
      )}

      {membershipType === MembershipTypeEnum.Silver || membershipType === MembershipTypeEnum.Admin && (
        <a href="/Silver">Silver Membership Page</a>
      )}

      {membershipType === MembershipTypeEnum.Bronze || membershipType === MembershipTypeEnum.Admin && (
        <a href="/Bronze">Bronze Membership Page</a>
      )}
    </>
  );
};

export default Home;
