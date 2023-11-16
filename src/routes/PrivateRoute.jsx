import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../Components/context/UserContext";
import Alert from 'react-bootstrap/Alert';

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);

  if(user && !user.auth) {
    return <>
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          You no
        </p>
      </Alert>
    </>  
  }

  return (
    <>
      {props.children}
    </>
  );
};

export default PrivateRoute;
