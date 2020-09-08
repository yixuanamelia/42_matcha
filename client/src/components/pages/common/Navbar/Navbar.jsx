import React from "react";
import "./Navbar.css";


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popVisible: false
    }
  }

  showPopList = (e) => {
    e.preventDefault();
    this.setState({ popVisible: !this.state.popVisible })
  }

  render() {
    return (
      <>
        <div class="header">
          <a href="#default" class="logo">Matcha</a>
          <div class="header-right">
            <a class="active" href="/">Home</a>
            <a href="/chatroom">Chatroom</a>
            <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <a href="#" onClick={(e) => this.showPopList(e)}>
              <i style={{ fontSize: '22px' }} class="fa fa-bell"></i>
              <div class="notifnum">
                <span>3</span>
              </div>
              {this.state.popVisible === true ?
                <div class="recpoint"></div> : null}

            </a>

            <a href="/editprofile">Me</a>
            <a href="/logout">Logout</a>
          </div>
        </div>

        {this.state.popVisible === true ?
          <div class="notiflist">
            <div class="head">
              <span>Notifications(12)</span>
              <a href="">Mark all as read</a>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>
            <div class="singlenotif">
              abn has liked your profile
                  <span>12 jan 2019 at 10:03 pm</span>
            </div>

          </div>
          : null
        }

      </>
    );
  };
}


export default Navbar;