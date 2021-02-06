import React, { Component } from 'react'
import Compressor from 'compressorjs';
import _get from 'lodash.get';
import { myPostFetcher } from '../MyFetchers'

class PostCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PostTitle: "",
            PostBody: "",

            // PostImage: 'https://cdn.mos.cms.futurecdn.net/MMwRCjVEaoJPP4dBBugWFY-1200-80.jpg',
            PostId: "",
        };
        this.uploadImage = this.uploadImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteLastImage = this.deleteLastImage.bind(this);
        this.handlePost = this.handlePost.bind(this);

    }
    // ##################################################################
    async handlePost() {
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
        // document.querySelector(".post_creation_container_overlay").style.display = "flex";
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
        };
        // #####################
        let response = await myPostFetcher("/Posts/creat-posts", Data)
        console.log(response.postIsCreated);
        // #####################
        // this.setState({
        //     PostImage: "",
        //     PostTitle: "",
        //     PostDescription: "",
        // });
        // #####################
        // document.querySelector("#creat_title").value = "";
        // document.querySelector("#creat_description").value = "";
        // this.props.onGetHome();
        // document.querySelector(".goToHome").click();
    }
    // ##################################################################
    handleChange(e) {
        const theFormName = e.target.name;
        const theFormValue = e.target.value.trim();
        this.setState({
            [theFormName]: theFormValue.replace(/(\n)+/g, "\n"),
        });
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
        return (
            <React.Fragment >
                <div id="post-creator-container">
                    <div className="post-creator">
                        <div className="title-container">
                            <div className="title">
                                <textarea
                                    name="PostTitle"
                                    id="creat-title"
                                    cols="10"
                                    rows="1"
                                    placeholder="add a post title..."
                                    onChange={this.handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="image-container">
                            <form
                                className="fileInput"
                                method="post"
                                encType="multipart/form-data"
                            >
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
                            ></textarea>
                        </div>
                    </div>
                    {/* for cicking in send on post creator componant i added this btn */}
                    <div className="hidden hidden-post-send" onClick={this.handlePost}>
                        send in postCreator
                    </div >
                </div>
                <div
                    className="hidden"
                    id="image-name2"></div>
                <div
                    className="hidden"
                    id="image-id-to-delete2"
                >
                </div>
            </React.Fragment >
        )
    }
}


export default PostCreator;
