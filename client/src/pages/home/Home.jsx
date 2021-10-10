import Header from "../../components/header/Header";
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../components/posts/Posts';
import './home.css';
import {axiosInstance} from "../../config";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Home() {
    const [posts,setPosts] = useState([]);
    const {search} = useLocation(); 
    /**search is one of properties of object returned by useLocation()
     * This statement is equal to const search = useLocation().search;
     * */
    //console.log("search:" +search);
    useEffect(() => {
        const fetchPosts = async()=>{
           const res =await axiosInstance.get("/posts/" + search);  //invoke get method to get all posts
           setPosts(res.data);
        }
        fetchPosts();
       
    }, [search])

    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>
    )
}
