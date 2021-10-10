import "./singlePost.css"
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

export default function SinglePost() {
    const location = useLocation();//fetch data from posts model in database
    const path = location.pathname.split("/")[2];
    //split("/")[2] to get search properties
    const [post, setPost] = useState({});
    const imageFolderURL = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDesc, setUpdatedDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [updatedPhoto, setUpdatedPhoto] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            const res = await axiosInstance.get("/posts/" + path);
            setPost(res.data);
            setUpdatedTitle(res.data.title);
            setUpdatedDesc(res.data.desc);
            setCurrentPhoto(res.data.photo);
        }
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axiosInstance({
                method: 'delete',
                url: "/posts/" + path,
                data: { username: post.username }
            });
            window.location.replace("/");sss
        } catch (err) { }
    };

    const handleUpdate = async () => {
        try {
            if (updatedPhoto) {
                const data = new FormData();
                const filename = Date.now() + updatedPhoto.name;
                data.append("name", filename);
                data.append("file", updatedPhoto);
                post.photo = filename;
                try {
                    await axiosInstance.post("/upload", data);
                } catch (err) {

                }
            };
            await axiosInstance({
                method: 'put',
                url: "/posts/" + post._id,
                data: {
                    username: post.username,
                    title: updatedTitle,
                    desc: updatedDesc,
                    photo: post.photo
                }
            });
            //window.location.reload();
            setCurrentPhoto(post.photo);
            setUpdateMode(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = async () => {
        setUpdateMode(false);
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {currentPhoto && !updateMode &&
                    (<img
                        src={imageFolderURL + currentPhoto} alt="" className="singlePostImg"
                    />)
                }
                {updateMode && (
                    <> 
                       {updatedPhoto && <img
                            src ={URL.createObjectURL(updatedPhoto)}
                            alt="" className="singlePostImg"
                        />
                       }
                        <label className="writeFormUpload" htmlFor="fileInput"><i className="writeIcon fas fa-plus"></i>  Upload your Post's picture
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={e => setUpdatedPhoto(e.target.files[0])}
                        />
                    </>)
                }
                {
                    updateMode ? (
                        <input
                            type="text"
                            value={updatedTitle}
                            className="singlePostTitleInput"
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            autoFocus />
                    ) : (
                        <h1 className="singlePostTitle">{updatedTitle}
                            {post.username === user?.username &&
                                <div className="singlePostEdit">
                                    <i
                                        className="singlePostIcon far fa-edit"
                                        onClick={() => setUpdateMode(true)}>
                                    </i>
                                    <i
                                        className="singlePostIcon far fa-trash-alt" onClick={handleDelete}>
                                    </i>
                                </div>
                            }
                        </h1>)
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author:
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={updatedDesc}
                        onChange={(e) => setUpdatedDesc(e.target.value)}
                        autoResizeEnabled={true}
                    ></textarea>
                ) : (
                    <p className="singlePostDesc">{updatedDesc}</p>
                )
                }
                {updateMode &&
                    <div className="singlePostButtons">
                        <button className="singlePostButton Update" onClick={handleUpdate}>Update</button>
                        <button className="singlePostButton Cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                }
            </div>
        </div>
    )
};
