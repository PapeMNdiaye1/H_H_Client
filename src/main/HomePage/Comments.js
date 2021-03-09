import React, { Component, Fragment } from 'react'

class Comments extends Component {
    render() {
        return (
            <Fragment>
                <div id="comments-container">
                    <div className="close-comments">
                        X
                    </div>
                    <div className="the-big-container">
                        <div className="comment-info-container">
                            <header className="post-author-infos-container">
                                <div className="post-author-profile-picture">
                                </div>
                                <div className="post-author-name">
                                    Pape Momar Ndiaye
                            </div>
                                <div className="post-date">
                                    22-33-44 09:55
                            </div>
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
                <dir className="the-response">

                    <div className="response-author-profile">
                    </div>
                    <p className="The-response-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aspernatur voluptatibus neque sint consequatur quae, incidunt quos, sunt adipisci iusto aut accusantium modi. Voluptate odit voluptas sunt error, quaerat accusantium.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aspernatur voluptatibus neque sint consequatur quae, incidunt quos, sunt adipisci iusto aut accusantium modi. Voluptate odit voluptas sunt error, quaerat accusantium.
                </p>
                </dir>
                <div className="reply-container">

                </div>
            </section>
        )
    }
}


export default Comments

