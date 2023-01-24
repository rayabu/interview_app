import React from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

const withGoToNavBase = (WrappedComponent: any) => {
  const WithGoToNav = (props: any) => {
    const navigateToRoute = (path: string) => {
      const {history} = props;
      history.push(path);
    };
    return <WrappedComponent {...props} navigateToRoute={navigateToRoute} />;
  };

  return WithGoToNav;
};

const withGoToNav = (Component: any) =>
  compose(withRouter, withGoToNavBase)(Component);

export {withGoToNav, withGoToNavBase};
