import React from "react";
import './EditProfile.css';
import Navbar from '../common/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { editThisUser } from '../../services/EditUser.service';
import { GetUserInfo } from '../../services/FetchUserInfo.service';
import { GetUserIntrests } from '../../services/GetAllInterests.service';
import { getUserLocation } from '../../services/GetUserLocation.service';
import Select from 'react-select';

const customNotification = require('../utils/notification');

class EditProfile extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      singleHObbi: "",
      psudonym: "",
      lastname: "",
      showAddHobi: false,
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
      gender: "",
      location: "",
      Fame: "",
      Bibliography: "",
      selectedOption: [],
    };

    this.handlePhotoesChange = this.handlePhotoesChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addHobytag = this.addHobytag.bind(this);
    this.handlFormSubmitAction = this.handlFormSubmitAction.bind(this);
    this.handleShowAddHoby = this.handleShowAddHoby.bind(this);
    this.initPageProfileData = this.initPageProfileData.bind(this);
  }

  validateData() {
    let regLocation = new RegExp(/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/)

    if (this.state.multiPhotos.length > 4) {
      customNotification.fireNotification("warning", "You cn not upload more than 4 pictures")
      return false;
    } else if (18 > parseInt(this.state.age) > 120) {
      customNotification.fireNotification("warning", "You don't have the legal age to date, this incident will be repported")
      return false;
    } else if (this.state.Password !== "" && this.state.Password.length < 8) {
      customNotification.fireNotification("warning", "Password must contain at least 8 characters.")
      return false;
    } else if (this.state.location !== "" && !regLocation.test(this.state.location)) {
      customNotification.fireNotification("warning", "Locaiton must valid.")
      return false;
    } else
      return true;
  }

  async initPageProfileData() {
    const userId = localStorage.getItem("userId");

    let userLocatData = await getUserLocation();

    if (this.state.location === "" && userLocatData !== undefined) {
      this.setState({
        location: userLocatData
      })
    }

    let profileData = await GetUserInfo(userId);
    if (profileData.data !== undefined)
      this.initProfileInformation(profileData.data);

    if (profileData !== "" && profileData.code === 204)
      customNotification.fireNotification("error", profileData.msg)

    let interestData = await GetUserIntrests(userId);
    if (interestData !== undefined && interestData.code === 200)
      this.initInterestArray(interestData.data)
  }

  async UNSAFE_componentWillMount() {
    this.initPageProfileData()
  }

  async handlFormSubmitAction(e) {
    e.preventDefault();

    console.log("this.state :", this.state);

    if (this.validateData()) {
      let userEdited = await editThisUser(this.state);

      if (userEdited.msg !== "" && userEdited.code !== 200)
        customNotification.fireNotification("success", userEdited.msg)
      else customNotification.fireNotification("error", userEdited.msg)

      setTimeout(async () => {
        this.initPageProfileData()
      }, 20)
    }
  }

  handlePhotoesChange(e) {
    e.preventDefault();
    const target = e.target;

    if (target.type === "file") {
      this.setState({
        multiPhotos: target.files
      });
    }

  }

  handleShowAddHoby(e) {
    e.preventDefault();
    let opt = !this.state.showAddHobi;
    this.setState({
      showAddHobi: opt
    })
  }

  addHobytag(e) {
    e.preventDefault();

    let interests = this.state.interestsArray;
    if (this.state.singleHObbi !== "") {
      let newHobby = { value: this.state.singleHObbi, label: this.state.singleHObbi };
      interests.push(newHobby);
      this.setState({
        singleHObbi: "",
        showAddHobi: false,
        interestsArray: interests
      })
    } else {
      this.setState({
        singleHObbi: "",
        showAddHobi: false,
      })
    }
  }

  handleSelectChange = selectedOption => {
    this.setState(
      { selectedOption },
    );
  };

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
      firstname: userInfo.firstname,
      psudonym: userInfo.pseudo,
      lastname: userInfo.lastname,
      oldProfilePhoto: profilePhoto.length > 0 ? profilePhoto : "",
      profilePhoto: "",
      email: userInfo.email,
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

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (target.type === "file") {
      this.setState({
        profilePhoto: target.files[0]
      });
    } else
      this.setState({
        [name]: value
      });

  }

  render() {
    return (
      <div>
        <Navbar />
        <ToastContainer />
        <div class="profile-main">
          <div class="profile-img">
            <div class="upload-img">

              {this.state.oldProfilePhoto && this.state.profilePhoto === "" ? <img style={{ position: 'relative', float: 'left', width: '200px' }}
                className="avatar"
                src={this.state.oldProfilePhoto.toString().substring(0, 5) === 'https' ?
                  this.state.oldProfilePhoto :
                  process.env.REACT_APP_API_URL +
                  "/" +
                  this.state.oldProfilePhoto[0]
                }
                alt="pic holder"
              />
                : ""}
              <input id="Photo" name="profilePhoto" onChange={this.handleChange} type="file" accept="image/png, image/jpeg, image/gif" />
            </div>

            <br></br>
            <div class="list-img">

              {this.state.oldMultiPhotos && this.state.multiPhotos.length === 0 ?
                this.state.oldMultiPhotos.map((oldProfilePhoto, index) => {
                  return (<img key={index} style={{ position: 'relative', float: 'left', width: '200px' }}
                    className="avatar"
                    src={oldProfilePhoto.toString().substring(0, 5) === 'https' ?
                      oldProfilePhoto :
                      process.env.REACT_APP_API_URL +
                      "/" +
                      oldProfilePhoto
                    } alt="pic holder"
                  />)
                }) : ""}


              <div className="form-group">
                <label className="col-sm-2 control-label">
                  Upload a photoes
                </label>


                <div className="input-group image-preview col-md-8 files">

                  <input type="file" name="multiPhotos" onChange={this.handlePhotoesChange} multiple accept="image/png, image/jpeg, image/gif" />
                  <p className="help-block col-md-7">Only 5 photoes and format JPEG/PNG allowed.</p>
                </div>
              </div>
            </div>

          </div>


          <section style={{ flex: '3' }} id="contact-form" class="bg-light py-3">
            <div class="container">
              <h1 class="l-heading">
                My Profile
            </h1>

              <div class="form-group">
                <label for="name">First Name</label>
                <input type="text"
                  value={this.state.firstname}
                  className="form-control"
                  onChange={this.handleChange}
                  id="f-name" placeholder="John/Jane" />
              </div>

              <div class="form-group">
                <label for="">Last Name</label>
                <input
                  type="text"
                  id="l-name"
                  value={this.state.lastname}
                  className="form-control"
                  name="lastname"
                  onChange={this.handleChange}
                  placeholder="Doe" />
              </div>

              <div class="form-group">
                <label for="">Psudonym</label>
                <input
                  type="text"
                  id="l-name"
                  value={this.state.psudonym}
                  className="form-control"
                  name="psudonym"
                  onChange={this.handleChange}
                  placeholder="Doe" />
              </div>

              <div class="form-group">
                <label for="name">E-mail</label>
                <input
                  type="text"
                  id="email"
                  id="inputEmail"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleChange}
                />

              </div>

              <div class="form-group">
                <label for="name">Password</label>
                <input
                  type="password"
                  value={this.state.Password}
                  className="form-control"
                  id="Password"
                  name="Password"
                  onChange={this.handleChange}
                  placeholder="Leave the password empty if you dont want to change it"
                />

              </div>

              <div class="form-group">
                <label for="name">Gender  </label>
                <select className="form-control" name="gender" value={this.state.gender} onChange={this.handleChange}>
                  <option value="" >Select</option>
                  <option value="M" >M</option>
                  <option value="F" >F</option>
                </select>
              </div>

              <div class="form-group">
                <label for="name">Age </label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={this.state.age}
                  name="age"
                  onChange={this.handleChange}
                  placeholder="Age"
                />
              </div>

              <div class="form-group">
                <label for="name">Sexual Orientation </label>
                <select className="form-control" name="SexualOrientation" value={this.state.SexualOrientation} onChange={this.handleChange}>
                  <option value="" >Select</option>
                  <option value="B" >Bisexual</option>
                  <option value="F" >Heterosexual</option>
                  <option value="M" >Homosexual</option>
                </select>
              </div>

              <div className="form-group">
                <label
                  className="col-sm-2 control-label"
                >
                  Location
                          </label>

                <div className="col-sm-10">
                  <input
                    type="text"
                    value={this.state.location || ""}
                    className="form-control"
                    id="location"
                    name="location"
                    onChange={this.handleChange}
                    placeholder="Enter your location"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="col-sm-2 control-label"
                >
                  Profile Completion
                          </label>

                <div className="col-sm-10">
                  <input disabled={true}
                    type="text"
                    value={this.state.ProfileCompletion + " out of 11"}
                    className="form-control"
                    id="ProfileCompletion"
                    name="ProfileCompletion"
                    onChange={this.handleChange}
                    placeholder="Enter your ProfileCompletion link"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="col-sm-2 control-label"
                >
                  Fame
                          </label>

                <div className="col-sm-10">
                  <input disabled={true}
                    type="text"
                    value={this.state.Fame}
                    className="form-control"
                    id="Fame"
                    name="Fame"
                    onChange={this.handleChange}
                    placeholder="Enter your Lastname"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="col-sm-2 control-label"
                >Interests</label>
                {this.state.showAddHobi === false ?
                  <button onClick={(e) => { this.handleShowAddHoby(e) }}
                    className="btn btn-light">
                    Add New
                    {/* TODO:fix api when adding a new interests, not working properly for now! */}
                  </button>
                  : <button onClick={(e) => { this.addHobytag(e) }}
                    className="btn btn-light">

                    Add</button>}
                <div className="col-sm-9" style={{ 'zIndex': '222' }}>

                  <Select
                    isMulti
                    isSearchable
                    placeholder="Select your interests"
                    value={this.state.selectedOption}
                    onChange={this.handleSelectChange}
                    options={this.state.interestsArray}
                  />

                </div>
              </div>

              {this.state.showAddHobi === true ?

                <div className="form-group">
                  <label
                    className="col-sm-2 control-label"
                  >
                    New hobby
</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={this.state.singleHObbi}
                      className="form-control"
                      id="singleHObbi"
                      name="singleHObbi"
                      onChange={this.handleChange}
                      placeholder="Add a new tag for hobby"
                    />
                  </div>
                </div>
                : ""}

              <div class="form-group">
                <label for="message">About</label>
                <textarea
                  value={this.state.Bibliography}
                  id="Bibliography" name="Bibliography"
                  rows="5" cols="42" onChange={this.handleChange}>
                </textarea>
              </div>
            </div>

            <button onClick={(e) => { this.handlFormSubmitAction(e) }} class="btn">Update</button>
          </section>

        </div>
      </div >
    )
  }
}

export default EditProfile;
