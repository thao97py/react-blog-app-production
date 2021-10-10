import "./post.css"
import { Link } from "react-router-dom"

export default function Post({ post }) {
    const imageFolderURL = "http://localhost:5000/images/";
    return (
        <div className="post">
            <hr />
            {post.photo && (
                <img
                    className="postImg" src={imageFolderURL + post.photo} alt="post"
                />
            )}
            <div className="postInfo">
                <div className="postCats"> 
                    {post.categories.map((eachCategory) => (  
                        <span className="postCat"> <Link className= "link" to={`/?cat=${eachCategory}`}><i className="postTag fas fa-tag"></i>{eachCategory}</Link></span>
                    ))}
                </div>
                <span className="postTitle"> <Link className="link" to={`/post/${post._id}`}>{post.title}</Link> </span>

                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                <p className="postDesc">{post.desc}</p>
            </div>
        </div>
    )
}
