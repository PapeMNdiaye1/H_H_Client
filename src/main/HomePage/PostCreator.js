import React, { Component } from 'react'
import Compressor from 'compressorjs';
import _get from 'lodash.get';
import { myPostFetcher } from '../MyFetchers'
import { Link } from "react-router-dom";

class PostCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PostTitle: "",
            PostBody: "",
            PostImage: '',
            PostId: "",
            SendPostBtnActive: false
        };
        this.uploadImage = this.uploadImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteLastImage = this.deleteLastImage.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.closePostCreator = this.closePostCreator.bind(this);
    }
    // ##################################################################
    closePostCreator() {
        this.props.onClosePostCreator()
    }
    // ##################################################################
    componentDidMount() {
        document.querySelector('.send-post').style.opacity = "";
        document.querySelector('#post-creator-overlay').style.display = "none";
        document.querySelector('.post-creator-error-container').style.display = 'none';
        // ##################################################################
        document.querySelector('.menu-home-background').style.display = 'none';
        document.querySelector('.menu-user-profile-background').style.display = 'none';
        document.querySelector('.menu-for-post-creation-background').style.display = 'flex';
    }
    // ##################################################################
    async handlePost() {
        document.querySelector('#post-creator-overlay').style.display = "flex";
        document.querySelector('.send-post').style.opacity = "";
        this.setState({
            SendPostBtnActive: false
        })
        let dt = new Date();
        let Now = `${(dt.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${dt
                .getDate()
                .toString()
                .padStart(2, "0")}-${dt
                    .getFullYear()
                    .toString()
                    .padStart(4, "0")} ${dt
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`
        let PostImageTitle = await document.querySelector("#image-name2").innerHTML;
        let PostImageId = await document.querySelector("#image-id-to-delete2").innerHTML;
        let Data = await {
            PostAuthorId: this.props.UserId,
            PostAuthorName: this.props.UserName,
            PostAuthorPicture: this.props.UserProfilePicture,
            PostTitle: this.state.PostTitle,
            PostBody: this.state.PostBody,
            PostImageURL: PostImageTitle,
            PostImageID: PostImageId,
            PostDate: Now,
            Timestamp: dt.getTime(),
        };
        // ##################################################################
        let response = await myPostFetcher("/Posts/creat-posts", Data)
        if (response.postIsCreated) {
            document.querySelector('#go-to-home-link').click()
        } else {
            document.querySelector('#post-creator-overlay').style.display = "none";
            document.querySelector('.post-creator-error-container').style.display = 'flex';
        }
    }
    // #################### ##############################################
    handleChange(e) {
        const theFormName = e.target.name;
        const theFormValue = e.target.value.trim();
        this.setState({
            [theFormName]: theFormValue.replace(/(\n)+/g, "\n").replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/gm, (match) => {
                return `<a href="${match}">${match}</a>`
            })
        });
        if (this.state.PostTitle.length > 4 && this.state.PostBody.length > 4) {
            document.querySelector('.send-post').style.opacity = "1";
            this.setState({
                SendPostBtnActive: true
            })
        } else {
            document.querySelector('.send-post').style.opacity = "";
            this.setState({
                SendPostBtnActive: false
            })
        }

    }
    // ##################################################################
    async deleteLastImage() {
        let imageName = document.querySelector(
            "#image-name2"
        );
        document.getElementById("post-image-src").src = ``;
        imageName.innerHTML = ""
        await document.getElementById("hidden_file_input2").click();
        let ProfilePictureToDelete = await document.querySelector(
            "#image-id-to-delete2"
        ).innerHTML
        if (ProfilePictureToDelete !== "") {
            fetch(`/files/${ProfilePictureToDelete}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });
        }
    }
    // ##################################################################
    async uploadImage() {
        const allFileInfos = document.getElementById("hidden_file_input2");
        await new Compressor(allFileInfos.files[0], {
            quality: 0.7,
            async success(result) {
                const formData = new FormData();
                formData.append("file", result);
                // #######################
                let response = await fetch("/upload", {
                    method: "post",
                    body: formData,
                });
                // #######################
                let pictureInServer = await response.json();
                let theFile = await _get(pictureInServer, "file.filename");
                let theFileId = await _get(pictureInServer, "file.id");
                console.log(theFile, theFileId)

                if ((theFile !== undefined) & (theFileId !== undefined)) {
                    document.getElementById("post-image-src").src = `image/${theFile}`;
                    document.querySelector(
                        "#image-name2"
                    ).innerHTML = theFile;
                    document.querySelector(
                        "#image-id-to-delete2"
                    ).innerHTML = theFileId;
                }
            },
            error(err) {
                console.log(err.message);
            },
        });
    }
    //? ##################################################################
    render() {
        let hiddenSendPostBtn
        if (this.state.SendPostBtnActive) {
            hiddenSendPostBtn = (
                <div className="hidden hidden-post-send" onClick={this.handlePost}>
                    send in postCreator
                </div >
            )
        } else {
            hiddenSendPostBtn = null
        }
        return (
            <React.Fragment >
                <div id="post-creator-container">
                    <div className="closePostCreator" onClick={this.closePostCreator}>
                    </div>
                    <div className='post-creator-error-container'>
                        Error To Send
                    </div>
                    <div className="post-creator">
                        <div className="title-container">
                            <div className="title">
                                <textarea
                                    name="PostTitle"
                                    id="creat-title"
                                    cols="1"
                                    rows="1"
                                    maxLength={48}
                                    placeholder="add a post title..."
                                    wrap="hard"
                                    onChange={this.handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="image-container">
                            <form
                                className="fileInput"
                                method="post"
                                encType="multipart/form-data" >
                                <input
                                    type="file"
                                    id="hidden_file_input2"
                                    className="hidden"
                                    name="file"
                                    accept="image/*"
                                    onChange={this.uploadImage}
                                />
                            </form>
                            <div className="post-creator-image">
                                <img id='post-image-src' src={this.state.PostImage} width="100%" height="" alt="" />
                                <div className='select-post-image-btn'
                                    onClick={this.deleteLastImage}  >
                                </div>
                            </div>
                        </div>
                        <div className="body-container">
                            <textarea
                                name="PostBody"
                                id="creat_body"
                                cols="10"
                                rows="10"
                                placeholder="add a post..."
                                onChange={this.handleChange}
                            >
                            </textarea>
                        </div>
                    </div>
                    {hiddenSendPostBtn}
                    <Link id="go-to-home-link" to="/home">
                    </Link>
                    <Link className="hidden" id="go-to-profile-link" to="/User-Profile">
                    </Link>
                </div>
                <div
                    className="hidden"
                    id="image-name2"></div>
                <div
                    className="hidden"
                    id="image-id-to-delete2"
                >
                </div>
                <div id="post-creator-overlay">

                </div>
            </React.Fragment >
        )
    }
}


export default PostCreator;
