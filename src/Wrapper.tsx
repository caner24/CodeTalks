import React from 'react';
import Router from './Router';
import UserProvider from './context/UserProvider';

export default () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};
