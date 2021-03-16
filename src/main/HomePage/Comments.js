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

    closeComment() {
        document.querySelector('#comments-container').style.display = "none"
    }

    render() {
        return (
            <Fragment>
                <div id="comments-container">
                    <div className="close-comments-container">
                        <div className="close-comments" onClick={this.closeComment}>
                            X
                        </div>
                    </div>
                    <div className="the-big-container">
                        <div className="comment-info-container">
                            <header className="post-author-infos-container">
                                <div className="post-author-profile-picture">
                                </div>
                                <div className="post-author-name">
                                    Pape Momar Ndiaye
                            </div>
                                <time className="post-date">
                                    22-33-44 09:55
                            </time>
                            </header>
                            {/* ######################################### */}
                            <section className="post-container">
                                <h3 className="post-title">
                                    post title
                            </h3>
                                <div className="post-image-container">
                                </div>
                                <p className="post-body">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nihil modi illo vel, ad tempora excepturi dolorem itaque quia et amet consectetur nulla rerum doloremque libero culpa numquam. Assumenda, laborum.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nihil modi illo vel, ad tempora excepturi dolorem itaque quia et amet consectetur nulla rerum doloremque libero culpa numquam. Assumenda, laborum.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nihil modi illo vel, ad tempora excepturi dolorem itaque quia et amet consectetur nulla rerum doloremque libero culpa numquam. Assumenda, laborum.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nihil modi illo vel, ad tempora excepturi dolorem itaque quia et amet consectetur nulla rerum doloremque libero culpa numquam. Assumenda, laborum.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nihil modi illo vel, ad tempora excepturi dolorem itaque quia et amet consectetur nulla rerum doloremque libero culpa numquam. Assumenda, laborum.
                            </p>
                            </section>
                            {/* ######################################### */}
                            <div className="response-container-container">
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aspernatur voluptatibus neque sint consequatur quae, incidunt quos, sunt adipisci iusto aut accusantium modi. Voluptate odit voluptas sunt error, quaerat accusantium.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aspernatur voluptatibus neque sint consequatur quae, incidunt quos, sunt adipisci iusto aut accusantium modi. Voluptate odit voluptas sunt error, quaerat accusantium.
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

