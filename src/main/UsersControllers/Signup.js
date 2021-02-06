import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { myPostFetcher } from '../MyFetchers';
import Compressor from 'compressorjs';
import _get from 'lodash.get';
// #############################
import Bottom from '../Style/images/bottom-line.svg';
import Top from '../Style/images/top-line.svg';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Email: "",
            Password: "default_password",
            PasswordConfirmation: "",
            ProfilePicture: "",
            TheUserIsLogin: false,
        };
        this.uploadImage = this.uploadImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteLastImage = this.deleteLastImage.bind(this);
        // this.handleSignUp = this.handleSignUp.bind(this);
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
    handleChange(e) {
        const theFormName = e.target.name;
        const theFormValue = e.target.value;
        this.setState({
            [theFormName]: theFormValue,
        });

    }
    // ##################################################################
    async deleteLastImage() {
        let imageName = document.querySelector(
            "#image-name"
        );
        imageName.innerHTML = ""
        document.querySelector(".profilePicture-container").style.backgroundImage = "";
        await document.getElementById("hidden_file_input").click();
        let ProfilePictureToDelete = await document.querySelector(
            "#image-id-to-delete"
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
        const allFileInfos = document.getElementById("hidden_file_input");
        // Compressor for compress my files before send in db
        await new Compressor(allFileInfos.files[0], {
            quality: 0.1,
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
                if ((theFile !== undefined) & (theFileId !== undefined)) {
                    document.querySelector(
                        ".profilePicture-container"
                    ).style.backgroundImage = `url(image/${theFile})`;
                    // i can`t access to setState in this scop , so i put images infos in Html 
                    document.querySelector(
                        "#image-name"
                    ).innerHTML = theFile;
                    document.querySelector(
                        "#image-id-to-delete"
                    ).innerHTML = theFileId;
                }
            },
            error(err) {
                console.log(err.message);
            },
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className="signUp-container">
                    <div className="signUp-container-at-right">

                        <div className="signUp-box">
                            {/* the Picture form */}
                            <form
                                className="fileInput"
                                method="post"
                                encType="multipart/form-data"
                            >
                                <input
                                    type="file"
                                    id="hidden_file_input"
                                    name="file"
                                    accept="image/*"
                                    onChange={this.uploadImage}
                                />
                            </form>
                            {/* the Forms */}
                            <form className="forms-container"
                            // onSubmit={this.handleSignUp}
                            >
                                <div className="container-for-profilePicture-container">

                                    <div className="profilePicture-container" onClick={this.deleteLastImage}>
                                    </div>
                                </div>
                                <br />
                                <div className="form-container">
                                    <Form
                                        type="text"
                                        name="Name"
                                        onchange={this.handleChange}
                                        maxLength={18}
                                        minLength={5}
                                    />
                                </div>
                                <br />
                                <div className="form-container">
                                    <Form type="email" name="Email" onchange={this.handleChange} />
                                </div>
                                <br />
                                <div className="form-container form-container-last">
                                    <Form
                                        type="password"
                                        name="Password"
                                        onchange={this.handleChange}
                                        maxLength={20}
                                        minLength={5}
                                    />
                                    <br />
                                    <Form
                                        type="password"
                                        name="PasswordConfirmation"
                                        onchange={this.handleChange}
                                    />

                                </div>
                                <br />
                                <div className="btn_container">
                                    <button type="submit" className="btn">
                                        Send
                                     </button>
                                </div>
                            </form>
                            <div className="switch">
                                I have an account
                                <Link to="/login">
                                    <button type="submit" className="btn btn-warning mt-1">
                                        Login
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <img src={Top} className="top-line" alt="top-line" />
                    <img src={Bottom} className="bottom-line" alt="bottom-line" />
                </div>
                <div className="hidden" id="image-name"></div>
                <div className="hidden" id="image-id-to-delete"></div>
            </React.Fragment >
        )
    }
}

export const Form = ({ type, name, onchange, maxLength, minLength }) => {
    return (
        <div>
            {name !== "PasswordConfirmation" ? (
                <label htmlFor={name}>{name}</label>
            ) : (
                    <label htmlFor={name}>Confirmation</label>
                )}

            <input
                required
                type={type}
                name={name}
                id={name}
                className="forms"
                maxLength={maxLength}
                minLength={minLength}
                onChange={onchange}
            />
        </div>
    );
};


export default SignUp;
