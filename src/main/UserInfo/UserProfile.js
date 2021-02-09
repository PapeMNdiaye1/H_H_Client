import React, { Component, Fragment } from 'react'
import { myGetFetcher } from "../MyFetchers";
import { Post } from "../HomePage/HomePostsContainer";

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
            AllMyPostsComponents:"",
            AuthorId:"idForTest",
            ModifyUserDescription:false,
        }
        this.getMyLastPostsAndCreatComponents = this.getMyLastPostsAndCreatComponents.bind(this)
    }
    
    // ##############################################################################
    async componentDidMount(){
        document.querySelector('.menu-for-post-creation-background').style.display = 'none';
        document.querySelector('.menu-home-background').style.display = 'none';
        document.querySelector('.menu-user-profile-background').style.display = 'flex';
         // ###################
        let MyLastPosts = await myGetFetcher(`/Posts/only-my-post/${this.state.AuthorId}`);
        // console.log(MyLastPosts)
        this.getMyLastPostsAndCreatComponents(MyLastPosts.allPosts)
    }
    // ########################################p######################################
    async getMyLastPostsAndCreatComponents(data) {
        let postComponent = [];
        await data.map((post) => {
            console.log(post.postImage)
            postComponent.push(
                <Post
                    key={post._id}
                    InHome={false}
                    PostAuthorId={post.postAuthorId}
                    PostAuthorName={post.postAuthorName}
                    PostAuthorPicture={post.postAuthorPicture}
                    PostImage={post.postImage}
                    PostImageId={post.postImageId}
                    PostTitle={post.postTitle}
                    PostBody={post.postBody}
                    PostDate={post.postDate}
          />
      )
        })
        this.setState({
            AllMyPostsComponents: postComponent
        })
        console.log(this.state.AllMyPostsComponents)
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
                                    {!this.state.ModifyUserDescription ? 
                                    'REACT , NODE' :
                                    '############'
                                    }
                                </div>
                                <div className="infos-title">Post :
                                    
                                </div>
                                <div className="infos-body post">
                                    {!this.state.ModifyUserDescription ?
                                    '27':
                                    '############'
                                    }
                                </div>
                                <div className="infos-title">Language :
                                </div>
                                <div className="infos-body language">
                                    {!this.state.ModifyUserDescription ?
                                    'JS , Java' :
                                    '############'
                                    }
                                                                </div>
                                <div className="infos-title">Technos :
                                    
                                </div>
                                <div className="infos-body">
                                    {!this.state.ModifyUserDescription ?
                                    "Technos" :
                                    '############'
                                    }                                                                </div>
                                <div className="infos-title descripton">Descripton :
                                    
                                </div>
                                <div className="infos-body">
                                    {!this.state.ModifyUserDescription ?
                                    "Descripton" :
                                    '############'
                                    }                                
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="all-my-posts-container">
                {this.state.AllMyPostsComponents}
                </div>
                </div>
                <Link id="go-to-creat-post-link" to="/Creat-new-post">
                </Link>
                <Link id="go-to-home-link" to="/home">
                </Link>
            </Fragment>
        )
    }
}
export default UserProfile;