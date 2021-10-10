import"./sidebar.css"
import womenphoto from "../../images/womenphoto.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";

export default function Sidebar() {
    const [cats,setCats] = useState([]);

    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axiosInstance.get("/categories/");
            setCats(res.data);
        }
        getCats()
    },[]);

    const openExternalPage=(exUrl)=>{
        window.open(exUrl, '_blank');
    };

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle"><Link className="link" to="/about">ABOUT ME</Link></span>
                <img className="sidebarimg" src={womenphoto} alt="my pic" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus obcaecati ipsa quasi a deleniti magni nobis enim dolorum necessitatibus.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((eachCategory)=>(
                    <Link className= "link" to={`/?cat=${eachCategory.catName}`}>
                    <li className="sidebarListItem"> <i className="postTag fas fa-tag"></i>{eachCategory.catName}</li>
                    </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-facebook-square" onClick={()=> openExternalPage('https://www.facebook.com/phuongthao.truongthi.98')}></i>
                <i className="sidebarIcon fab fa-github-square" onClick={()=> openExternalPage('https://github.com/thao97py/React-Blog-App')}></i>
                <i className="sidebarIcon fab fa-pinterest-square" onClick={()=> openExternalPage('https://www.pinterest.com/')}></i>
                <i className="sidebarIcon fab fa-linkedin" onClick={()=> openExternalPage('https://www.linkedin.com/in/thao97py/')}></i>
                </div>
            </div>
        </div>
    );
}
