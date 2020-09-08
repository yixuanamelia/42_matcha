import React from "react";
import "./Navbar.css";
import io from 'socket.io-client';
import Moment from 'moment';

// Import services
import { GetuserNotifes } from '../../../services/GetUserNotifi.service';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifs: [],
      visibleNotif: false,
      popVisible: false,
      socketNotif: [],
      socket: io(process.env.REACT_APP_API_URL),
    }

  }

  async UNSAFE_componentWillMount() {
    let response = await GetuserNotifes();
    if (response.code === 200)
      this.setState({
        notifs: response.data
      })
    let room = localStorage.getItem("userId");
    this.state.socket.connect(true);
    this.state.socket.emit('join', room);
  }

  componentDidMount() {
    this.state.socket.on('userLikesList', (likes) => {
      this.setState({
        socketNotif: likes,
        visibleNotif: true,
      })
    })
  }

  componentWillUnmount() {
    let room = localStorage.getItem("userId");
    this.state.socket.emit('initLikesList', room)
    this.state.socket.disconnect(true);
  }

  showPopList = async (e) => {
    e.preventDefault();
    let response = await GetuserNotifes();
    console.log("response.data :", response.data);
    if (response.code === 200)
      this.setState({
        notifs: response.data,
        popVisible: !this.state.popVisible,
        visibleNotif: false,
        socketNotif: []
      })
  }

  render() {
    const { visibleNotif, notifs, socketNotif } = this.state;

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
              {visibleNotif ? <div class="notifnum">
                <span></span>
              </div> : null}

              {this.state.popVisible === true ?
                <div class="recpoint"></div> : null}

            </a>

            <a href="/editprofile">Me</a>
            <a href="/logout">Logout</a>
          </div>
        </div>

        {this.state.popVisible === true ?
          <div class="notiflist">
            {/* <div class="head">
              <span>Notifications({notifs.length})</span>
              <a href="">Mark all as read</a>
            </div> */}

            {notifs ? notifs.map(notif => {
              return <div key={notif.id} class="singlenotif">
                <a href={`/profiledetail/${notif.id}`}>
                  <b> {notif.fullname}</b> {notif.description}
                </a>
                <span>{Moment(notif.updatedAt).fromNow()}</span>
              </div>
            }) : null}
          </div>
          : null
        }
      </>
    );
  };
}


export default Navbar;