import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: "3rem" }}>
            Ticket Logger 
          </h1>
          <img width='80px' src='logo192.png' ></img>
        </Link>
        {/* <p className="m-0" style={{ fontSize: "1.75rem", fontWeight: "700" }}>
          Check your ticket status!
        </p> */}
        <div>
          {Auth.loggedIn() ? (
            <>
               <Link className="btn btn-med btn-light m-2" to="/">
                Home
              </Link>
              <Link className="btn btn-med btn-primary m-2" to="/AllTickets">
                View All Tickets
              </Link>
              <Link className="btn btn-med btn-primary m-2" to="/NewTicket">
               Create new Ticket
              </Link>
              <Link className="btn btn-med btn-primary m-2" to="/myGroups">
                My Groups
              </Link>
              <Link className="btn btn-med btn-primary m-2" to="/myProjects">
                My Projects
              </Link>
              <button className="btn btn-med btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
