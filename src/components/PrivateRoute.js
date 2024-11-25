import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Component {...rest} /> : <Text>You need to login</Text>;
};

export default PrivateRoute;
