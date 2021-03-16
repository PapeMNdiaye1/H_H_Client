import React, { Component, Fragment } from 'react'

class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            AllResponses: [],
            PostAuthorId: "",
            PostAuthorName: "",
            PostAuthorPicture: "",
            PostDate: "",
            PostDescription: "",
            PostImage: "",
            PostImageId: "",
            PostResponses: [],
            PostTitle: "",
            Response: "",
            NofResponse: "",
            PostDescriptionModified: "",
            PostTitleModified: "",
            StartModification: false,
        };
        this.closeComment = this.closeComment.bind(this)
    }

    // ##############################################################################
    closeComment() {
        this.props.onClosePost()
    }
    // ##############################################################################
    componentDidMount() {
        console.log(this.props.ThePostInfos);
        document.querySelector(`#the-post-body`).innerHTML = this.props.ThePostInfos.PostBody;
        this.setState({
            PostId: this.props.ThePostInfos.Id,
            PostTitle: this.props.ThePostInfos.PostTitle,
            PostDescription: this.props.ThePostInfos.PostBody,
            PostDate: this.props.ThePostInfos.PostDate,
            PostImage: this.props.ThePostInfos.PostImage,
            PostImageId: this.props.ThePostInfos.PostImageId,
            PostAuthorId: this.props.ThePostInfos.PostAuthorId,
            PostAuthorName: this.props.ThePostInfos.PostAuthorName,
            PostAuthorPicture: this.props.ThePostInfos.PostAuthorPicture,
        })
    }

    // ?##############################################################################

    render() {
        let postImage;
        if (this.state.PostImage !== "") {
            postImage = (
                <img
                    src={`image/${this.state.PostImage}`}
                    alt={this.props.PostTitle}
                    width="100%"
                />
            );
        }
        let theProfilePicture;
        if (this.state.PostAuthorPicture !== "") {
            theProfilePicture = { backgroundImage: `url(image/${this.state.PostAuthorPicture})` };
        } else {
            theProfilePicture = { background: "#000" };
        }
        return (
            <Fragment>
                <div id="comments-container">
                    <div className="close-comments-container">
                        <div className="close-comments" onClick={this.closeComment}>
                        </div>
                    </div>
                    <div className="the-big-container">
                        <div className="comment-info-container">
                            <header className="post-author-infos-container">
                                <div className="post-author-profile-picture"
                                    style={theProfilePicture}
                                >
                                </div>
                                <div className="post-author-name">
                                    {this.state.PostAuthorName}
                                </div>
                                <time className="post-date">
                                    {this.state.PostDate}
                                </time>
                            </header>
                            {/* ######################################### */}
                            <section className="post-container">
                                <h3 className="post-title">
                                    {this.state.PostTitle}
                                </h3>
                                <div className="post-image-container">
                                    {postImage
                                    }
                                </div>
                                <p id="the-post-body">
                                </p>
                            </section>
                            {/* ######################################### */}
                            <div className="response-container-container">
                                <Response />
                                <Response />
                                <Response />
                                <Response />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


class Response extends Component {
    render() {
        return (
            <section className="response-container">
                <div className="the-response">

                    <div className="response-author-profile">
                        <div className="response-author-profile-picture">
                        </div>
                        <h3>Pape M. Ndiaye</h3>
                        <br />
                        <time>11-14-21 09:34</time>
                    </div>
                    <p className="the-response-body">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Hic aspernatur voluptatibus neque
                        sint consequatur quae, incidunt quos, sunt adipisci
                        iusto aut accusantium modi. Voluptate odit voluptas sunt error, quaerat accusantium.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Hic aspernatur voluptatibus neque sint consequatur quae,
                        incidunt quos, sunt adipisci iusto aut accusantium modi.
                        Voluptate odit voluptas sunt error, quaerat accusantium.
                    </p>
                    <div className="reply-to-the-response">
                        <div>Reply</div>
                    </div>
                </div>
                {/* <div className="show-rpely-container">
                    show-rpely-container
                </div> */}
                <div className="reply-container">
                    <Reply />
                    <Reply />
                    <Reply />
                    <Reply />
                </div>
            </section>
        )
    }
}



class Reply extends Component {
    render() {
        return (
            <div className="the-reply-container">
                <div className="reply-author-profile">
                    <div className="reply-author-profile-picture">

                    </div>
                    <h3>Pape M. Ndiaye</h3>
                    <br />
                    <time>11-14-21 09:34</time>
                </div>
                <p className="the-reply-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aspernatur voluptatibus neque sint consequatur quae, incidunt quos, sunt adipisci iusto aut accusantium modi. Voluptate odit voluptas sunt error, quaerat accusantium.
            </p>
            </div>
        )
    }
}



export default Comments

