import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ children }) => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.user_email) {
    return <Navigate to='/login' />;
  } else return children;
};

export default AuthenticatedRoute;
