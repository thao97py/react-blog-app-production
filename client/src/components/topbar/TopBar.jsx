import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css"

export default function TopBar() {
    const {user,dispatch} = useContext(Context);
    const publicFolder ="http://localhost:5000/images/";

    const handleLogout= ()=>{
        dispatch({type:"LOGOUT"});
    };

    const openExternalPage=(exUrl)=>{
        window.open(exUrl, '_blank');
    };

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square" onClick={()=> openExternalPage('https://www.facebook.com/phuongthao.truongthi.98')}></i>
                <i className="topIcon fab fa-github-square" onClick={()=> openExternalPage('https://github.com/thao97py/React-Blog-App')}></i>
                <i className="topIcon fab fa-pinterest-square" onClick={()=> openExternalPage('https://www.pinterest.com/')}></i>
                <i className="topIcon fab fa-linkedin" onClick={()=> openExternalPage('https://www.linkedin.com/in/thao97py/')}></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem"><NavLink exact className="link"  activeClassName="active" to="/">HOME</NavLink></li>
                    <li className="topListItem"><NavLink className="link" activeClassName="active" to="/write">WRITE</NavLink></li>
                    <li className="topListItem"><NavLink className="link" activeClassName="active" to="/about">ABOUT</NavLink></li>
                    <li className="topListItem"><NavLink className="link" activeClassName="active" to="/contact">CONTACT</NavLink></li>
                    <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                            <Link to="/settings">
                            <img className="topImg" src={publicFolder+ user.profilePic} alt="user's profile picture" />
                            </Link>
                            ) : (
                            <ul className="topList">
                                 <li className="topListItem">
                                     <NavLink className="link" activeClassName="active" to="/login">LOGIN</NavLink>
                                </li>
                                 <li className="topListItem">
                                     <NavLink className="link" activeClassName="active" to="/register">REGISTER</NavLink>
                                </li>
                            
                            </ul>
                            )
                }
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
