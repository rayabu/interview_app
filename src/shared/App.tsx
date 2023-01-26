// @ts-nocheck
import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import GoldMembership from './pages/GoldMembership';
import SilverMembership from './pages/SilverMembership';
import BronzeMembership from './pages/BronzeMembership';
import {useCookies} from 'react-cookie';
import {useAppSelector} from '@interviewApp/src/types';
import Header from './components/molecules/Header';

const App = () => {
  const userProfile = useAppSelector((state: any) => state.userProfile);
  const [removeCookie] = useCookies(['secureCookie']);
  return (
    <React.Fragment>
      {userProfile && (
        <Header removeCookie={removeCookie} userProfile />
      )}
      <Switch>
        <Route exact path="/">
          <Redirect exact from="/" to="/Login" />
        </Route>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/GoldMembershipPage" component={GoldMembership} />
        <Route
          exact
          path="/SilverMembershipPage"
          component={SilverMembership}
        />
        <Route
          exact
          path="/BronzeMembershipPage"
          component={BronzeMembership}
        />
      </Switch>
    </React.Fragment>
  );
};

export default App;
