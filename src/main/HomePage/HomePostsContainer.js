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
        let LastPosts = await myGetFetcher("/Posts/get-last-posts");
        await this.setState({
            AllPostsArray: [...new Set([...LastPosts.allPosts])]
        })
        // console.log(this.state.AllPostsArray)
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
                    <Link id="go-to-creat-post-link" to="/Creat-new-post">
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
        }
    }
    render() {
        return (
            <Fragment>

                <div className="post-container-for-positon">
                    <div className='the-post-container'>
                        <div className="post-author-container">
                            <div className="post-author-picture">
                            </div>
                            <div>
                                {this.props.PostAuthorName}
                            </div>
                        </div>
                        <div className="post-infos_container">
                            <div className="post-title">
                                {this.props.PostTitle}
                            </div>
                            <div className="post-date">
                                {this.props.PostDate}
                            </div>
                        </div>
                        <div className="post">
                            <div className="post-image">
                                <img
                                    onClick={this.handleComment}
                                    src={`image/${this.props.PostImage}`}
                                    alt={this.props.ostTitle}
                                    width="100%"
                                />
                            </div>
                            <div className="post-body">
                                {this.props.PostBody}
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
                                            <div className="the-top-response-author">
                                                Pape M Ndiaye
                                            </div>
                                        </div>
                                        <div className="the-top-response-body">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Repudiandae corrupti tempora, ducimus aperiam reprehenderit iusto
                                            sapiente numquam ipsa quas at sequi cumque voluptatum porro ad est eius?
                                            Aut labore molestias!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}




export default HomePostsContainer;