import React, { Component } from 'react'
import SuggestionAlert from './SuggestionAlert';
import { GetUserInfo } from '../../services/FetchUserInfo.service';
import { getUserLocation } from '../../services/GetUserLocation.service';
import { GetCurrentUserInfo } from '../../services/FetchCurrentUserInfo.service';
import { fetchAllUsersPublicData } from '../../pages/Main/Home.service';
import SuggestionList from './SuggestionList';
import { GetUserIntrests } from '../../services/GetAllInterests.service';
import Navbar from '../common/Navbar/Navbar';

export class Suggestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      singleHObbi: "",
      psudonym: "",
      lastname: "",
      email: "",
      age: "",
      multiPhotos: [],
      interestsArray: [],
      SexualOrientation: "",
      ProfileCompletion: "",
      gender: "",
      location: "",
      Fame: "",
      Bibliography: "",
      selectedOption: [],
      users: []
    };
  }

  initProfileInformation(data) {
    let userInfo = data.info;

    let userInterests = data.tags;

    this.setState({
      firstname: userInfo.firstname,
      psudonym: userInfo.pseudo,
      lastname: userInfo.lastname,
      email: userInfo.email,
      age: userInfo.age,
      selectedOption: userInterests,
      SexualOrientation: userInfo.sexual_orientation,
      ProfileCompletion: userInfo.profile_completion,
      gender: userInfo.gender,
      location: userInfo.localisation,
      Fame: userInfo.fame,
      Bibliography: userInfo.bio,
    })
  }

  initUsers(users) {
    this.setState({
      users: users
    });
  }

  initInterestArray(interests) {
    this.setState({
      interestsArray: interests
    })
  }

  async UNSAFE_componentWillMount() {
    const userId = localStorage.getItem("userId");

    let dataLocation = await getUserLocation();
    if (this.state.location === "" && dataLocation !== "")
      this.setState({
        location: dataLocation
      })

    let userInterestData = GetUserIntrests(userId);
    if (userInterestData !== undefined && userInterestData.code === 200)
      this.initInterestArray(userInterestData.data)


    let dataUserInfo = await GetUserInfo(userId);
    if (dataUserInfo.data !== undefined)
      this.initProfileInformation(dataUserInfo.data);

    let filter = {};

    setTimeout(async (filter) => {
      var tag_array = [];
      if (this.state.selectedOption !== null) {
        this.state.selectedOption.forEach(element => {
          tag_array.push(element.value);
        });
      }
      filter = { Suggestion: true, fame: parseInt(this.state.Fame), location: this.state.location, age: this.state.age, tags: tag_array, wants: this.state.SexualOrientation };

      let dataFetchAllUser = await fetchAllUsersPublicData(filter);
      if (dataFetchAllUser !== undefined && dataFetchAllUser.code === 200)
        this.initUsers(dataFetchAllUser.data);

    }, 600);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <section className="content">
            <section className="content">
              <br />
              <br />
              <br />
              <br />
              {this.state.ProfileCompletion < 8 ? <SuggestionAlert link={'/profile'} message={'Your profile is not complete, please update it'} /> :
                <div>
                  {this.state.users.length === 0 ? <div> Hmm strange, we didn't find anybody that fit your profile. Please make sure you added some popular tags to your profile. Or maybe you have nobody in a 10 000km radius that fits your sexual preferences</div> :
                    <SuggestionList users={this.state.users} interestsArray={this.state.selectedOption} />
                  }
                </div>
              }
            </section>
          </section>
        </div>
     </div>
    )
  }
}

export default Suggestion;