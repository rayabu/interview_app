import React, {FC, useEffect} from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import {withGoToNav} from '@interviewApp/src/shared/hocs/withGoToNav';
import {useAppDispatch, UserProfile} from '@interviewApp/src/types';
import actions from '@interviewApp/src/shared/redux/action';
import Style from '@interviewApp/src/shared/components/atom/style';

interface Props {
  navigateToRoute: (path: string) => void;
  removeCookie: any;
  userProfile: UserProfile
}

const Header: FC<Props> = ({navigateToRoute, removeCookie, userProfile}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.getUserProfile());
  }, [userProfile != null]);

  const logoutWrapper = () => {
    removeCookie('secureCookie', {path: '/', domain: 'localhost'});
    navigateToRoute('/Login');
  };

  return (
    <React.Fragment>
      <header>
        <div className="flex-item flex-row space-between align-center">
          {userProfile && (
            <div>
              <label>User Name: {userProfile.userName}</label>
              <label>Membership Type: {userProfile.membershipType}</label>
              <DropdownButton
                id="dropdown-basic-button"
                title={<span>{userProfile.fullName}</span>}>
                <Dropdown.Item onSelect={logoutWrapper}>Log out</Dropdown.Item>
              </DropdownButton>
            </div>
          )}
        </div>
      </header>
      <Style>{``}</Style>
    </React.Fragment>
  );
};

export default withGoToNav(Header);
