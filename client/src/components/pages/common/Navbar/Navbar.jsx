import React from "react";
import "./Navbar.css";


class Navbar extends React.Component {

  render() {
    return (
      <>
        <div class="header">
          <a href="#default" class="logo">Matcha</a>
          <div class="header-right">
            <a class="active" href="/">Home</a>
            <a href="/chatroom">Chatroom</a>
            <a href="/notifications">Notification</a>
            <a href="/editprofile">Me</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      </>
    );
  };
}


export default Navbar;