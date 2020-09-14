import React from "react";
import Navbar from '../common/Navbar/Navbar';
import { GetUserInfo } from '../../services/FetchUserInfo.service';
import { GetUserIntrests } from '../Main/interest.service';
import getUserLikes from '../../services/GetUserlikesDislikes.service';
import { PutUpdateUserLikes } from '../../services/UpdateUserLikeDislike.service';
import { BlockThisUser } from "../../services/BlockUser.service";
import { VisitThisUser } from '../../services/VisitUser.service';
import Moment from 'moment';
import { PutUpdateUserUnlikes } from '../../services/UpdateUserUnlikes.service';
import { reportThisUser } from '../../services/ReportUser.service';

import { ToastContainer } from 'react-toastify';
import io from 'socket.io-client';
import './profileDetails.css';

const customNotification = require('../utils/notification');

class ProfileDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            likes: 0,
            dislikes: 0,
            singleHObbi: "",
            psudonym: "",
            socket: io(process.env.REACT_APP_API_URL),
            lastname: "",
            showAddHobi: false,
            countLikes: 0,
            userHasLikedMe: "",
            countdisLikes: 0,
            profilePhoto: "",
            email: "",
            oldMultiPhotos: [],
            oldProfilePhoto: "",
            age: "",
            multiPhotos: [],
            Password: "",
            interestsArray: [],
            SexualOrientation: "",
            ProfileCompletion: "",
            online: "",
            updatedAt: "",
            gender: "",
            location: "",
            Fame: "",
            Bibliography: "",
            selectedOption: [],
        };

        this.handlelikes = this.handlelikes.bind(this);
        this.handleBlock = this.handleBlock.bind(this);
        this.handleReport = this.handleReport.bind(this);
    }

    async handleBlock(e) {
        e.preventDefault();
        let userId = this.props.match.params.id;
        let dataRes = await BlockThisUser(userId);


        if (dataRes !== undefined && dataRes.code === 200)
            customNotification.fireNotification("success", dataRes.msg)

        let userAction = localStorage.getItem("userId");

        setTimeout(() => {
            let data = {
                id: userAction + userId,
                title: "block",
                fullname: "",
                msg: " blocked your profile",
                likerId: userAction,
                likedId: userId,
                time: Moment()
            }
            this.state.socket.emit('likeUser', data)
        }, 320)
    }

    async handleReport(e) {
        e.preventDefault();
        let userId = this.props.match.params.id;
        let dataIn = await reportThisUser(userId);

        if (dataIn !== undefined && dataIn.code === 200)
            customNotification.fireNotification("success", dataIn.msg)

        let userAction = localStorage.getItem("userId");

        setTimeout(() => {
            let data = {
                id: userAction + userId,
                title: "report",
                fullname: "",
                msg: " reported your profile",
                likerId: userAction,
                likedId: userId,
                time: Moment()
            }
            this.state.socket.emit('likeUser', data)
        }, 320)
    }

    async handlelikes(e, state) {
        e.preventDefault();
        let userId = this.props.match.params.id;
        let userAction = localStorage.getItem("userId");

        await PutUpdateUserLikes(userId, state);
        setTimeout(async () => {
            let usLikes = await getUserLikes(userId);
            if (usLikes.data !== undefined)
                this.setState({
                    likes: usLikes.data.likes,
                    dislikes: usLikes.data.dislikes
                })
        }, 10)

        setTimeout(() => {
            let data = {
                id: userAction + userId,
                title: "",
                fullname: "",
                msg: "",
                likerId: userAction,
                likedId: userId,
                time: Moment()
            }

            if (this.state.countDislikes < this.state.dislikes)
                if (state === 1) {
                    data.title = "dislike";
                    data.msg = " disliked your profile";
                    this.state.socket.emit('likeUser', data)
                }

            if (this.state.countLikes < this.state.likes)
                if (state === 0) {
                    data.msg = " liked your profile";
                    data.title = "like";
                    this.state.socket.emit('likeUser', data)
                }

            if (this.state.countLikes > this.state.likes) {
                PutUpdateUserUnlikes(userId);
                if (state === 0) {
                    data.msg = " unliked your profile";
                    data.title = "unlike";
                    this.state.socket.emit('likeUser', data)
                }
            }


            let init = this.state.likes;
            let initDislike = this.state.dislikes;
            this.setState({
                countLikes: init,
                countDislikes: initDislike
            })
        }, 320)
    }


    getProfilePicture(pictures, state) {
        let pics = [];
        let i = 0;
        while (i < pictures.length) {
            if (pictures[i].state === state)
                pics.push(pictures[i].path)
            i++;
        }

        return pics;
    }

    initProfileInformation(data) {
        let userInfo = data.info;
        let profilePhoto = this.getProfilePicture(data.pictures, 1);
        let photoes = this.getProfilePicture(data.pictures, 0)

        let userInterests = data.tags;

        this.setState({
            userHasLikedMe: data.liked,
            firstname: userInfo.firstname,
            psudonym: userInfo.pseudo,
            lastname: userInfo.lastname,
            oldProfilePhoto: profilePhoto.length > 0 ? profilePhoto : "",
            profilePhoto: "",
            email: userInfo.email,
            online: userInfo.online,
            updatedAt: userInfo.updatedAt,
            age: userInfo.age,
            oldMultiPhotos: photoes,
            multiPhotos: [],
            selectedOption: userInterests,
            SexualOrientation: userInfo.sexual_orientation,
            ProfileCompletion: userInfo.profile_completion,
            gender: userInfo.gender,
            location: userInfo.localisation,
            Fame: userInfo.fame,
            Bibliography: userInfo.bio,
        })
    }

    initInterestArray(interests) {
        this.setState({
            interestsArray: interests
        })
    }

    async UNSAFE_componentWillMount() {
        let userId = this.props.match.params.id;
        let usInfo = await GetUserInfo(userId);
        let usInterest = await GetUserIntrests(userId);
        let usLikes = await getUserLikes(userId);
        let usVivsit = await VisitThisUser(userId);
        let userAction = localStorage.getItem("userId");

        if (usLikes.data !== undefined)
            this.setState({
                likes: usLikes.data.likes,
                dislikes: usLikes.data.dislikes
            })

        if (usInfo.data !== undefined)
            this.initProfileInformation(usInfo.data);

        if (usInterest !== undefined && usInterest.code === 200)
            this.initInterestArray(usInterest.data)

        setTimeout(() => {
            let likes = this.state.likes;
            let dislike = this.state.dislikes;
            this.setState({
                countLikes: likes,
                countDislikes: dislike
            })

            let data = {
                id: userAction + userId,
                title: "visit",
                fullname: "",
                msg: " has visited your profile",
                likerId: userAction,
                likedId: userId,
                time: Moment()
            }

            this.state.socket.emit('likeUser', data)
        }, 300)
    }

    componentWillUnmount() {
        this.state.socket.disconnect(true);
    }

    componentDidMount() {
        let room = localStorage.getItem("userId");
        this.state.socket.connect(true);
        this.state.socket.emit('join', room);
    }

    render() {


        return (
            <div>
                <Navbar />
                <ToastContainer />
                <div className="content-wrapper" >
                    {/* item1 */}
                    <div className="user-pic">
                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" style={{ 'height': '250px', 'border-radius': '50%', 'border': '5px solid #FEDE00', 'margin-top': '30px' }} class="img-responsive" alt="" />
                        <div className="l-heading1">
                            {this.state.firstname}{" "}
                            {this.state.lastname}
                            <div class="online-status"></div>
                        </div>
                        {/* TODO:add online status green dot <div className="online-status">    <svg xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="green" />
                                </svg>
                            </div> */}


                        <ul className="list-group list-group-unbordered text-center">
                            <li className="list-group-item">
                                {this.state.oldProfilePhoto === "" && this.state.oldMultiPhotos.length === 0
                                    ? "" : <span>
                                        <button onClick={(e) => { this.handlelikes(e, 0) }} className="btn btn-primary" >Like {this.state.likes}</button>
                                        <button onClick={(e) => { this.handlelikes(e, 1) }} className="btn btn-warning">Dislike {this.state.dislikes}</button>

                                    </span>}
                                <button onClick={(e) => { this.handleBlock(e) }} className="btn btn-danger" >Block</button>
                                <button onClick={(e) => { this.handleReport(e) }} className="btn btn-danger">Report</button>
                            </li>
                        </ul>

                    </div>

                    {/* item2 */}
                    <div className="profile-detail">
                        <nav class="navbar navbar-light bg-light" style={{ 'border-radius': '10px', 'margin-top': '20px' }}>
                            <ul className="l-heading2">
                                <li><a ref="">Profile</a></li>
                                <li><a ref="">Pictures</a></li>
                            </ul>
                        </nav>

                        <div class="detail-list">
                            <div style={{ 'margin-top': '15px' }} >  Pseudo : {this.state.psudonym}</div>
                        </div>
                        <div class="detail-list">
                            Age : {this.state.age}
                        </div>
                        <div class="detail-list">
                            Gender : {this.state.gender}
                        </div>
                        <div class="detail-list">
                            Location : {this.state.location}
                        </div>
                        <div class="detail-list">
                            Sexual Orientation : {this.state.SexualOrientation}
                        </div>
                        <div class="detail-list">
                            Profile Completion : {this.state.ProfileCompletion}
                        </div>
                        <div class="detail-list">
                            Fame : {this.state.Fame}
                        </div>
                        <div class="detail-list">
                            Interests :
                            {this.state.selectedOption ? this.state.selectedOption.map((hobi, i) => {
                            return <p key={i}>{hobi.label}</p>
                        }) : ""}
                        </div>
                        <div class='detail-list'>
                            About
                             <div className='detail-list-about'>
                                <textarea
                                    value={this.state.Bibliography}
                                    id="Bibliography" name="Bibliography"
                                    rows="5" cols="42" onChange={this.handleChange}>
                                </textarea>

                            </div>
                        </div>
                    </div>

                </div>



                <div className="content-wrapper" >
                    <section className="content">
                        <div class="container">
                            <div class="profile-userpic">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="box box-primary" id="fixMarginTop">
                                            <div className="box-body box-profile">
                                                {this.state.oldProfilePhoto && this.state.profilePhoto === "" ?
                                                    <img
                                                        className="profile-user-img img-responsive img-circle"

                                                        src={this.state.oldProfilePhoto.toString().substring(0, 4) !== 'http' ?
                                                            process.env.REACT_APP_API_URL +
                                                            "/" +
                                                            this.state.oldProfilePhoto :
                                                            this.state.oldProfilePhoto
                                                        }
                                                        alt="pic holder"
                                                    />
                                                    : ""}




                                                <h5 style={{ 'fontSize': '12px' }} className="text-muted text-center">
                                                    {this.state.online === 0 ?
                                                        Moment(this.state.updatedAt).fromNow()
                                                        :
                                                        ""}
                                                </h5>

                                                <h5 style={{ 'fontSize': '12px' }} className="text-muted text-center">
                                                    {this.state.userHasLikedMe === true ?
                                                        "This User liked me" :
                                                        ""}
                                                </h5>


                                            </div>
                                        </div>


                                    </div>
                                </div>



                                <div className="box box-primary">

                                    <div className="box-body">


                                        <div className="input-group image-preview col-md-10 col-md-offset-2">
                                            {this.state.oldMultiPhotos && this.state.multiPhotos.length === 0 ?
                                                this.state.oldMultiPhotos.map((oldProfilePhoto, index) => {
                                                    return (<img key={index} style={{ position: 'relative', float: 'left', width: '200px' }}
                                                        className="img-responsive center-block"
                                                        src={oldProfilePhoto.indexOf("http") !== 1 ?
                                                            process.env.REACT_APP_API_URL +
                                                            "/" +
                                                            oldProfilePhoto : oldProfilePhoto
                                                        } alt="pic holder"
                                                    />)
                                                }) : ""}
                                        </div>
                                        <div>
                                            {/* <p style={{ height: '140px', lineHeight: '20px', overflow: 'hidden' }}>
                                                {this.state.note}
                                            </p> */}
                                        </div>


                                        <hr></hr>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >
            </div >
        );
    }
}

export default ProfileDetails;
