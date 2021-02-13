import React, { Component, Fragment } from "react";
import TopResponse from '../Style/images/top-response.svg';
import { myGetFetcher } from "../MyFetchers";
import { Link } from "react-router-dom";


class HomePostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllPostsArray: [],
            AllPostComponents: []
        }
        this.getLastPostsAndCreatComponents = this.getLastPostsAndCreatComponents.bind(this)
    }
    // ##############################################################################
    async componentDidMount() {
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
                    key={post._id}
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


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PostImage: "",
            PostBody: "",
        }
    }

    componentDidMount() {
        this.setState({
            PostImage: this.props.PostImage
        })

        if (this.props.PostBody.length > 113) {
            this.setState({
                PostBody: (
                    <p>
                        {this.props.PostBody.slice(0, 113) + "... "}
                        {/* <samp onClick={this.sowAlldescription}>Ride-More</samp> */}
                    </p>
                ),
            });
        } else {
            this.setState({
                PostBody: <p>{this.props.PostBody}</p>,
            });
        }
    }

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
        } else {
            postImage = null;
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
                    // id={`post_author_picture${this.props.postId}`}
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
                            <h4 className="post-title">
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
                            <div className="post-body">
                                {this.state.PostBody}
                            </div>
                        </div>
                        <div className="post-options">
                            <div className="post-comment">
                                <div className="creat-response-container">
                                    <textarea
                                        name="PostDescription"
                                        id="creat-response"
                                        cols="10"
                                        rows="10"
                                        placeholder="Your post..."
                                    ></textarea>
                                </div >
                                <div className="top-response">
                                    <img src={TopResponse} alt="top-response" />
                                    <div className="the-top-response">
                                        <div className="the-top-response-author-infos">
                                            <h2 className="the-top-response-author">
                                                Pape M Ndiaye
                                            </h2>
                                        </div>
                                        <p className="the-top-response-body">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Repudiandae corrupti tempora, ducimus aperiam reprehenderit iusto
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div  >

             </div> */}
                </div>
            </Fragment>
        );
    }
}




export default HomePostsContainer;