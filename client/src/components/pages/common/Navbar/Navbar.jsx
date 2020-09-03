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
            <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <a href="/notifications" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i style={{ fontSize: '22px' }} class="fa fa-bell"></i>
              <div class="notifnum">
                <span>3</span>
              </div>
            </a>

            <a href="/editprofile">Me</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      </>
    );
  };
}


export default Navbar;