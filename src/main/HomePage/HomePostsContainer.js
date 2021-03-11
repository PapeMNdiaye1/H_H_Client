import React, { Component, Fragment } from "react";
import TopResponse from '../Style/images/top-response.svg';
import { myGetFetcher } from "../MyFetchers";
import Comments from "./Comments";
import { Link } from "react-router-dom";


export class HomePostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllPostsArray: [],
            AllPostComponents: [],
            ShowComments: false,
            PostInfos:"",
        }
        this.getLastPostsAndCreatComponents = this.getLastPostsAndCreatComponents.bind(this)
        this.openOnePost = this.openOnePost.bind(this);
        this.closePost = this.closePost.bind(this);
    }
      // ##############################################################################
    closePost(){
          this.setState({
      ShowComments: false
    })
    }
    // ##############################################################################
    openOnePost (childData) {
    this.setState({
      PostInfos: {...childData},
      ShowComments: true
    })
    }
    // ##############################################################################
    async componentDidMount() {
        document.querySelector('.menu-user-profile-background ').style.display = 'none';
        document.querySelector('.menu-for-post-creation-background').style.display = 'none';
        document.querySelector('.menu-home-background').style.display = 'flex';
        
        let LastPosts = await myGetFetcher("/Posts/get-last-posts");
        await this.setState({
            AllPostsArray: [...new Set([...LastPosts.allPosts])]
        })
        this.getLastPostsAndCreatComponents(this.state.AllPostsArray)
    }
    // ##############################################################################
    async getLastPostsAndCreatComponents(data) {
        let postComponent = [];
        await data.map((post) => {
            console.log(post.postImage);
            postComponent.push(
                <Post
                    InHome={false}
                    onOpenPost={this.openOnePost}
                    key={post._id}
                    Id={post._id}
                    PostAuthorId={post.postAuthorId}
                    PostAuthorName={post.postAuthorName}
                    PostAuthorPicture={post.postAuthorPicture}
                    PostImage={post.postImage}
                    PostImageId={post.postImageId}
                    PostTitle={post.postTitle}
                    PostBody={post.postBody}
                    PostDate={post.postDate}
                />)
            })
            this.setState({
            AllPostComponents: postComponent
        })
        console.log(this.state.AllPostComponents)
    }
    
    render() {
        return (
            <Fragment>
                {this.state.ShowComments &&  <Comments ThePostInfos={this.state.PostInfos} onClosePost={this.closePost}/> }
                <div id="home-posts-container">
                    <Link className="hidden" id="go-to-creat-post-link" to="/Creat-new-post">
                    </Link>
                    <Link className="hidden" id="go-to-profile-link" to="/User-Profile">
                    </Link>
                    {this.state.AllPostComponents}
                </div>
            </Fragment>
        );
    }
}

// *##############################################################################
// *##############################################################################

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PostImage: "",
            PostBody: "",
        }
        this.openPost = this.openPost.bind(this)
    }
  
    // ##############################################################################
    openPost(){
        if (this.props.Id != "" &&
            this.props.PostTitle != "" &&
            this.props.PostBody != "" &&
            this.props.PostDate != "" &&
            this.props.PostAuthorName != "" &&
            this.props.PostAuthorId != ""
            ) {
            this.props.onOpenPost({
                Id : this.props.Id,
                PostTitle :this.props.PostTitle,
                PostBody : this.props.PostBody,
                PostDate : this.props.PostDate,
                PostAuthorName :this.props.PostAuthorName,
                PostAuthorId: this.props.PostAuthorId,
                PostAuthorPicture : this.props.PostAuthorPicture,
                PostImage : this.props.PostImage,
                PostImageId : this.props.PostImageId,
            })
        }
    }
    // ##############################################################################
    componentDidMount() {
        this.setState({
            PostImage: this.props.PostImage
        })
        
        if (this.props.PostBody.length > 113) {
            this.setState({
                PostBody: (
                    <p>
                        {this.props.PostBody.slice(0, 113) + "... "}
                    </p>
                ),
            });
        } else {
            this.setState({
                PostBody: <p>{this.props.PostBody}</p>,
            });
        }
        document.querySelector(`#id${this.props.Id}`).innerHTML = this.props.PostBody;
    }
    // ?##############################################################################
    render() {
        let postImage;
        if (this.props.PostImage !== "") {
            postImage = (
                <img
                    onClick={this.handleComment}
                    src={`image/${this.state.PostImage}`}
                    alt={this.props.PostTitle}
                    width="100%"
                />
            );
        }


        let theProfilePicture;
        if (this.props.postAuthorPicture !== "") {
            theProfilePicture = { backgroundImage: `url(image/${this.props.PostAuthorPicture})` };
        } else {
            theProfilePicture = { background: "#000" };
        }

        let ProfilePicture;
        if (this.props.UserId === this.props.postAuthorId) {
            ProfilePicture = (
                <Link style={{ textDecoration: "none" }} to="/my-profile-page">
                    <div
                        style={theProfilePicture}
                        className="post-author-picture"
                    ></div>
                </Link>
            );
        } else {
            ProfilePicture = (
                <Link style={{ textDecoration: "none" }} to="/profile-page">
                    <div
                        onClick={this.openProfilePage}
                        style={theProfilePicture}
                        id={`post_author_picture${this.props.postId}`}
                        className="post-author-picture"
                    ></div>
                </Link>
            );
        }

        return (
            <Fragment>
                <div className="post-container-for-positon">
                    <div className='the-post-container'>
                        <div className="post-author-container">
                            {ProfilePicture}
                            <div>
                                {this.props.PostAuthorName}
                            </div>
                        </div>
                        <div className="post-infos_container">
                            <h4 className="post-title" onClick={this.openPost}>
                                {this.props.PostTitle}
                            </h4>
                            <div className="post-date">
                                {this.props.PostDate}
                            </div>
                        </div>
                        <div className="post">
                            <div className="post-image">
                                {postImage}
                            </div>
                            <div id={`id${this.props.Id}`} className="post-body">
                            </div>
                        </div>
                        <div className="post-options">
                            <div className="creat-response-container">
                                Your post...
                            </div>
                        </div>
                        <div className="top-response-container">
                            <div className="top-response-author-info-container">
                                <div className="top-response-author-profile-picture">
                                    d
                                </div>
                                <h3 className="top-response-author-name">
                                    Pape M Ndiaye
                                </h3>
                                <time className="top-response-date">
                                    02-20-2021 19:51
                                </time>


                            </div>
                            <div className="top-response-body">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Facilis eos voluptates quisquam eum voluptatem quos, voluptatum quod similique eligendi error tenetur laboriosam magni veniam porro maiores ex aspernatur, neque animi?
                             
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}




