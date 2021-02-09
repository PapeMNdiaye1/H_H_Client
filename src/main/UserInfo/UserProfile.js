import React, { Component, Fragment } from 'react'
// import Compressor from 'compressorjs';
import _get from 'lodash.get';
// import { myPostFetcher } from '../MyFetchers'
// import { Link } from "react-router-dom";

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Id: "",
            Name: "",
            Email: "",
            ProfilePicture: "",
        }
    }
    render() {
        return (
            <Fragment>
                <div id="user-profile-container">
                    <div className="user-profile-infos-container" >
                        <div className="user-profile-infos">
                            <div className="profile-picture-and-name-container">
                                <div className="profile-picture">
                                </div>
                                <div className="user-name">
                                    {this.props.UserName}
                                </div>
                            </div>

                            <div className="user-infos-container">
                                <div className="infos-title branches">
                                </div>
                                <div className="infos-title post">
                                </div>
                                <div className="infos-title language">
                                </div>
                                <div className="infos-title technos">
                                </div>
                                <div className="infos-title descripton">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default UserProfile;