import React, { Component } from "react";
import _get from 'lodash.get';
import "./Style/style.css";
import Signup from "./UsersControllers/Signup";
import Login from "./UsersControllers/Login";
import { HomePostsContainer } from "./HomePage/HomePostsContainer";
import PostCreator from "./HomePage/PostCreator";
import UserProfile from "./UserInfo/UserProfile";
import { myGetFetcher } from "./MyFetchers";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "idForTest",
      Name: "Pape M Ndiaye",
      Email: "pmomar44@gmail.com",
      ProfilePicture: "nimp",
      IsUserLogin: true,
      // IsUserLogin: false,
      ShowPostCreator: false,
    };
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.findUserInfos = this.findUserInfos.bind(this);
    this.toggleToGetHome = this.toggleToGetHome.bind(this);
    this.openPostCreator = this.openPostCreator.bind(this);
    this.closePostCreator = this.closePostCreator.bind(this);
  }
  // ####################################################
  async openPostCreator(childData) {
    this.setState({
      ShowPostCreator: true,
    })
    console.log('open Post Creator');
  }
  // ####################################################
  async closePostCreator(childData) {
    this.setState({
      ShowPostCreator: false,
    })
    console.log('close Post Creator');
  }
  // ####################################################
  async findUserInfos(UserEmail) {
    let UserInDb = await myGetFetcher(
      `/Users/get-user-infos/${UserEmail}`
    );
    return UserInDb;
  }
  // ####################################################
  async handleUserLogin(childData) {
    console.log(childData);
    if (childData.TheUserIsLogin) {
      let userInfos = await this.findUserInfos(childData.Email);
      if (_get(userInfos, "User._id") !== "") {
        this.setState({
          Id: _get(userInfos, "User._id"),
          Name: _get(userInfos, "User.userName"),
          Email: _get(userInfos, "User.email"),
          ProfilePicture: _get(userInfos, "User.profilePicture"),
          IsUserLogin: childData.TheUserIsLogin,
        })
      }
      console.log(this.state);
    }
  }
  // ####################################################
  async toggleToGetHome(childData) {
    console.log(childData);
  }
  //? ####################################################
  render() {
    if (this.state.IsUserLogin) {
      return (
        <div id="home_page_container">
          <BrowserRouter>
            <Redirect to={"/Home"} />
            <Mune onOpenPostCreator={this.openPostCreator}
              onClosePostCreator={this.closePostCreator}
            />
            <TopBar />
            {this.state.ShowPostCreator && <PostCreator
              onClosePostCreator={this.closePostCreator}
              onGetHome={this.toggleToGetHome}
              UserName={this.state.Name}
              UserId={this.state.Id}
              UserProfilePicture={this.state.ProfilePicture}
            />}
            <Switch>
              <Route
                exact
                path={"/User-Profile"}
                render={(props) => (
                  <UserProfile
                    {...props}
                    UserName={this.state.Name}
                    UserId={this.state.Id}
                    UserProfilePicture={this.state.ProfilePicture}
                  />
                )}
              />
              <Route
                exact
                path={"/Home"}
                render={(props) => (
                  <HomePostsContainer
                    {...props}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      )
    } else {
      return (
        <BrowserRouter>
          <Redirect to={"/login"} />
          <Switch>
            <Route
              exact
              path={"/SignUp"}
              render={(props) => (
                <Signup onUserLogin={this.handleUserLogin} />
              )}
            />
            <Route
              exact
              path={"/login"}
              render={(props) => (
                <Login {...props} onUserLogin={this.handleUserLogin} />
              )}
            />
          </Switch>
        </BrowserRouter>
      )
    }
  }
}

export const Form = ({ type, name, onchange, maxLength, minLength }) => {
  return (
    <div>
      {name !== "PasswordConfirmation" ? (
        <label htmlFor={name}>{name}</label>
      ) : (
        <label htmlFor={name}>Confirmation</label>
      )}
      <input
        required
        type={type}
        name={name}
        id={name}
        className="forms"
        maxLength={maxLength}
        minLength={minLength}
        onChange={onchange}
      />
    </div>
  );
};


//? #####################################################################

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="top-bar-container">
        </div>
      </BrowserRouter>);
  }
}

class Mune extends Component {
  constructor(props) {
    super(props);
    this.sendPost = this.sendPost.bind(this)
    this.goToCreatPost = this.goToCreatPost.bind(this)
    this.goToProfile = this.goToProfile.bind(this)
  }

  sendPost = () => {
    document.querySelector('.hidden-post-send').click()
  }

  goToCreatPost = () => {
    this.props.onOpenPostCreator()
  }
  goToProfile = () => {
    this.props.onClosePostCreator()
    let link = document.querySelector('#go-to-profile-link')
    if (link) {
      link.click()
    }
  }
  goToHome = () => {
    this.props.onClosePostCreator()
    let link = document.querySelector('#go-to-home-link')
    if (link) {
      link.click()
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div id="menu-container">
          <div className="menu-for-post-creation-background">
            <div className="menu-for-post-creation">
              <div className="go-to-profile-page"
                onClick={this.goToProfile}
              >
              </div>
              <div className="send-post"
                onClick={this.sendPost}
              >
                Send
              </div >
            </div>
          </div>
          {/* ############################################################"" */}
          <div className='menu-home-background'>
            <div className="menu-container-for-home">
              <div className="go-to-profile-page"
                onClick={this.goToProfile}
              >
              </div>
              <div className="go-to-creat-post"
                onClick={this.goToCreatPost}
              >
              </div >
              <div className="go-on-top"
              >
              </div >
            </div>
          </div>
          {/* ############################################################"" */}
          <div className="menu-user-profile-background">
            <div className="menu-container-for-user">
              <div className="go-to-profile-param"
              >
                Param
              </div>
              <div className="go-to-creat-post"
                onClick={this.goToCreatPost}
              >
              </div >
              <div className="go-on-home"
                onClick={this.goToHome}
              >
              </div >
            </div>
          </div>
        </div>
      </BrowserRouter>);
  }
}





export default App;
