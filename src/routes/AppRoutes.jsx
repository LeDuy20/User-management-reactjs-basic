import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login/Login";
import TableUser from "../Components/TableUser/TableUser";

import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <TableUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
