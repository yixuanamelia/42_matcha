import React from "react";
import "./Navbar.css";
class Navbar extends React.Component {

  render() {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=Nunito&family=Yellowtail&display=swap" rel="stylesheet">
        </link>
        <link href="https://fonts.googleapis.com/css2?family=Nunito&family=Yellowtail&display=swap" rel="stylesheet"></link>
        <div class="header">
          <a href="#default" class="logo">Matcha</a>
          <div class="header-right">
            <a class="active" href="/">Home</a>
            <a href="#login">Notification</a>
            <a href="#register">Chatroom</a>
            <a href="/editprofile">Me</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      </>
    );
  };
}


export default Navbar;