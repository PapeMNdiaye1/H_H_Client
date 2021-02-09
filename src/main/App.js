import React, { Component } from "react";
import "./Style/style.css";
import Signup from "./UsersControllers/Signup";
import Login from "./UsersControllers/Login";
import HomePostsContainer from "./HomePage/HomePostsContainer";
import PostCreator from "./HomePage/PostCreator";
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
      // IsUserLogin: false,
      IsUserLogin: true,
    };
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.findUserInfos = this.findUserInfos.bind(this);
    this.toggleToGetHome = this.toggleToGetHome.bind(this);
  }
  //? ####################################################
  async findUserInfos(UserEmail) {
    let UserInDb = await myGetFetcher(
      `/Users/get-user-infos/${UserEmail}`
    );
    return UserInDb;
  }
  //? ####################################################
  async handleUserLogin(childData) {
    console.log(childData);
    if (childData.TheUserIsLogin) {
      this.setState({
        IsUserLogin: childData.TheUserIsLogin,
      });
      let userInfos = await this.findUserInfos(childData.Email);
      console.log(userInfos.User);
    }
  }
  //? ####################################################
  async toggleToGetHome(childData) {
    console.log(childData);
  }
  //? ####################################################
  render() {
    if (this.state.IsUserLogin) {
      return (
        <div id="home_page_container">
          <BrowserRouter>
            {/* <Redirect to={"/Home"} /> */}
            <Redirect to={"/Creat-new-post"} />
            <Mune />
            <TopBar />
            <Switch>
              <Route
                exact
                path={"/Creat-new-post"}
                render={(props) => (
                  <PostCreator
                    {...props}
                    onGetHome={this.toggleToGetHome}
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
  }

  sendPost = () => {
    document.querySelector('.hidden-post-send').click()
  }
  goToCreatPost = () => {
    let link = document.querySelector('#go-to-creat-post-link')
    if (link) {
      link.click()
      document.querySelector('.menu-for-post-creation-background').style.display = 'flex';
      document.querySelector('.menu-home-background').style.display = 'none';
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div id="menu-container">
          <div className="menu-for-post-creation-background">
            <div className="menu-for-post-creation">
              <div className="go-to-profile-page">
              </div>
              <div className="send-post"
                onClick={this.sendPost}
              >
                Send
            </div >
            </div>
          </div>

          <div className='menu-home-background'>
            <div className="menu-container-for-home">
              <div className="go-to-profile-page">
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

        </div>
      </BrowserRouter>);
  }
}





export default App;
