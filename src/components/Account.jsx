import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/account.module.css";

const Account = () => {
  const { currentUser, logout } = useAuth();
  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            {" "}
            logout{" "}
          </span>
        </>
      ) : (
        <>
          <NavLink
            to="signup"
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            Signup
          </NavLink>
          <NavLink
            to="login"
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            Login
          </NavLink>
        </>
      )}
    </div>
  );
};
export default Account;
