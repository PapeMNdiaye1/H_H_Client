import React, { Component, Fragment } from 'react'
// import Compressor from 'compressorjs';
import _get from 'lodash.get';
import { Link } from "react-router-dom";

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

componentDidMount(){
    document.querySelector('.menu-for-post-creation-background').style.display = 'none';
    document.querySelector('.menu-home-background').style.display = 'flex';
}

    render() {
        return (
            <Fragment>
                <div id="user-profile-container">
                    <div className="user-profile-infos-container" >
                        <div className="user-profile-infos">
                            <div className="profile-picture-and-name-container">
                                <div className="profile-picture"
                                 style={{ backgroundImage:`url(image/${this.props.UserProfilePicture})`}}>
                                </div>
                                <div className="user-name">
                                    {this.props.UserName}
                                </div>
                            </div>
                          <div className="user-infos-container">
                                <div className="infos-title">Branches :
                                </div>
                                <div className="infos-body branches">
                                   REACT , NODE
                                </div>
                                <div className="infos-title">Post :
                                    
                                </div>
                                <div className="infos-body post">
                                    27
                                </div>
                                <div className="infos-title">Language :
                                    
                                </div>
                                <div className="infos-body language">
                                   JS
                                                                </div>
                                <div className="infos-title">Technos :
                                    
                                </div>
                                <div className="infos-body">
                                REACT , NODE 
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro perferendis officia autem, quo soluta a! Voluptatem delectus minima vel ea, laboriosam error at suscipit provident excepturi incidunt consectetur consequuntur dignissimos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro perferendis officia autem, quo soluta a! Voluptatem delectus minima vel ea, laboriosam error at suscipit provident excepturi incidunt consectetur consequuntur dignissimos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro perferendis officia autem, quo soluta a! Voluptatem delectus minima vel ea, laboriosam error at suscipit provident excepturi incidunt consectetur consequuntur dignissimos.
                                                                </div>
                                <div className="infos-title descripton">Descripton :
                                    
                                </div>
                                <div className="infos-body">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit placeat quam obcaecati facilis dolor commodi earum, soluta magnam voluptatum animi non, illum quos sapiente fuga error ducimus labore culpa veniam!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link id="go-to-creat-post-link" to="/Creat-new-post">
                    </Link>
            </Fragment>
        )
    }
}
export default UserProfile;