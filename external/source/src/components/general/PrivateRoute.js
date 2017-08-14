import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Helpers
import { meApi } from './../../shared/ApiService';

// Components
import LoadingPage from './LoadingPage';

const token = localStorage.getItem('token');

const checkMe = async props => {
  let auth = await meApi(token);
  let success = auth.status >= 200 && auth.status < 300;

  if (success) {
    props.setToken(token);
    auth.json().then(resp => {
      props.setActiveUser(resp);
    });
  } else {
    props.setToken('');
    props.setActiveUser({});
    props.meFailed(true);
    localStorage.removeItem('token');
  }

  return success;
};

export default function({ component: Component, props, ...rest }) {
  const login = (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: props.location }
      }}
    />
  );

  const tracks = (
    <Redirect
      to={{
        pathname: '/tracks',
        state: { from: props.location }
      }}
    />
  );

  if (!props.token && !token) {
    return <Route {...rest} render={props => login} />;
  }

  if (
    props.location.pathname === '/users' &&
    props.activeUser.roles &&
    !(
      props.activeUser.roles.includes('owner') ||
      props.activeUser.roles.includes('pm')
    )
  ) {
    return <Route {...rest} render={props => tracks} />;
  }

  if (!props.token) {
    let isLoading = true;

    checkMe(props).then(resp => {
      isLoading = resp;
    });

    if (props.token) {
      return <Route {...rest} render={props => <Component {...props} />} />;
    } else {
      const component = isLoading ? <LoadingPage /> : login;
      return <Route {...rest} render={props => component} />;
    }
  } else {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}
