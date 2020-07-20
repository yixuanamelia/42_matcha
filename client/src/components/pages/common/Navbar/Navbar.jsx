import React from "react";
import "./Navbar.css";
class Navbar extends React.Component {

  render() {
    return (
      <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </link>
        <link href="https://fonts.googleapis.com/css2?family=Nunito&family=Yellowtail&display=swap" rel="stylesheet">
        </link>
        <link href="https://fonts.googleapis.com/css2?family=Nunito&family=Yellowtail&display=swap" rel="stylesheet"></link>
        <div class="header">
          <a href="#default" class="logo">Matcha</a>
          <div class="header-right">
            <a class="active" href="#home">Home</a>
            <a href="#login">Notification</a>
            <a href="#register">Chatroom</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      </>
    );
  };
}


export default Navbar;