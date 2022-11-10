import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo-bg.png";
import classes from "../styles/nav.module.css";
import Account from "./Account";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt="Learn with Sumit Logo" />
            <h3>Learn with Sumit</h3>
          </NavLink>
        </li>
      </ul>
      <Account />
    </nav>
  );
};

export default Nav;
