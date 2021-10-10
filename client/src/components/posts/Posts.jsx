import Post from "../post/Post.jsx"
import "./posts.css"

export default function Posts({posts}) {
    return (
        <div className="posts">
            {posts.map((eachPost) => (
                <Post post={eachPost} />
            ))}
        </div>
    );
}
