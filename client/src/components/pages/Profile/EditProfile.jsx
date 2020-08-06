import React from "react";
import './EditProfile.css';
import Navbar from '../common/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';

class EditProfile extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <section id="contact-form" class="bg-light py-3" >
          <div class="container">
            <h1 class="l-heading">My Profile  </h1>
            <div class="form-group">
              <label for="name">First Name</label>
              <input type="text" name="first_name" id="f-name" placeholder="John/Jane" />
            </div>
            <div class="form-group">
              <label for="">Last Name</label>
              <input type="text" name="last_name" id="l-name" placeholder="Doe" />
            </div>
            <div class="form-group">
              <label for="name">E-mail</label>
              <input type="text" name="email" id="email" />
            </div>

            <div class="form-group">
              <label for="name">Password</label>
              <input type="text" name="password" id="password" />
            </div>

            <div class="form-group">
              <label for="name">Gender  </label>
              <select>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="name">Age </label>
              <select>
                <option value="Under 16">Under 16</option>
                <option value="16 to 25">16 to 25</option>
                <option value="26 to 40">26 to 40</option>
                <option value="40 to 60">40 to 60</option>
                <option value="Over 60">Over 60</option>
              </select>
            </div>

            <div class="form-group">
              <label for="name">Sexual Orientation </label>
              <select name="SO" id="SO">
                <option value="heterosexual">Heterosexual</option>
                <option value="homosexual">Homosexual </option>
                <option value="bisexual">Bisexual</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">About</label>
              <textarea name="biography" id="biogrpahy" placeholder="My bio"></textarea>

              <input type="file" id="myFile" name="filename" />
            </div>
            <button class="btn" type="submit">Update</button>
          </div>
        </section>
      </div >

    )
  }
}

export default EditProfile;
