import React, { Component } from 'react'
import NotificationItem from './NotificationItem';
import { GetuserNotifes } from '../../services/GetUserNotifi.service';
import Navbar from '../common/Navbar/Navbar';
import Moment from 'moment';
import io from 'socket.io-client';

export class NotificationsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifs: [],
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
        let dataNotif = this.state.socketNotif;
        this.state.socket.on('userLikesList', (likes) => {
            dataNotif = dataNotif.concat(likes)
            this.setState({
                socketNotif: dataNotif
            })
        })
    }

    componentWillUnmount() {
        let room = localStorage.getItem("userId");
        this.state.socket.emit('initLikesList', room)
        this.state.socket.disconnect(true);
    }

    render() {
        return (
            <>
                <Navbar />

                <div className="content-wrapper">
                    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

                    <section className="content">
                        <section className="content">
                            <div className="row">
                                <h1>NEW</h1>
                                {this.state.socketNotif !== undefined ?
                                    this.state.socketNotif.map((notif, i) => {
                                        return <NotificationItem key={i} notif={{ id: notif.likerId, from: notif.fullname, option: { type: notif.title, read: false }, date: Moment(notif.time).fromNow() }} />
                                    })
                                    : ""}


                                <h1>SEEN</h1>
                                {this.state.notifs ?
                                    this.state.notifs.map((notif, i) => {
                                        return notif.seen === 0 ?
                                            <NotificationItem key={i} notif={{ id: notif.id, from: notif.fullname, option: { type: notif.categorie, read: false }, date: Moment(notif.updatedAt).fromNow() }} />
                                            : ""
                                    })
                                    : ""}
                            </div>
                        </section>
                    </section>
                </div>
            </>
        )
    }
}

export default NotificationsHome;
