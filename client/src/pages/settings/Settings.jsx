import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { useContext,useState } from "react"
import { axiosInstance } from "../../config"

export default function Settings() {
    const {user,dispatch}=useContext(Context);

    const [userName,setUsername] = useState(user.username);
    const [userEmail,setUserEmail] = useState(user.email);
    const [userPassword,setUserPassword] = useState(null);
    //const [userPic,setUserPic]=useState(null);
    const [newUserPic,setNewUserPic] =useState(null);
    
    const [successUpdated,setSuccessUpdated]=useState(false);
    const publicFolder ="http://localhost:5000/images/";
    // console.log("pw outside: " + userPassword);
    const handleSubmit= async (e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        // console.log("pw: " + userPassword);
        const updatedUser = {userId:user._id,
                            username:userName,
                            email:userEmail,
                            };
        if (userPassword != null){
            updatedUser.password =userPassword;
        }
        if(newUserPic){
            const data = new FormData();
            const filename = Date.now() + newUserPic.name;
            data.append("name",filename);
            data.append("file",newUserPic);
            updatedUser.profilePic=filename;
            try{
                await axiosInstance.post("/upload",data);
            }catch(err){
                
            }
        };

        try{
            const res = await axiosInstance.put("/users/" +user._id,updatedUser);
            dispatch({type:"UPDATE_SUCCESS",payload:res.data});
            setSuccessUpdated(true);
           
        }catch(err){
            dispatch({type:"UPDATE_FAILURE"});
        }
        setTimeout(()=>{
            setSuccessUpdated(false);
        },7000);
    };
    
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form action="" className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img 
                            className="settingsPPImg" 
                            src={newUserPic ? URL.createObjectURL(newUserPic) :publicFolder + user.profilePic} 
                            alt="" 
                        />
                        <label htmlFor="fileInput"><i className="settingsPPIcon fas fa-user-circle"></i></label>
                        <input 
                            type="file" id="fileInput" 
                            style={{display:"none"}}
                            onChange={(e)=>setNewUserPic(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input 
                        type="text" 
                        placeholder = {user.username}
                        onChange={e=> setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder = {user.email}
                        onChange={e=> setUserEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder = "************"
                        onChange={e=> setUserPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {successUpdated && (<span className="settingsSuccessUpdate">Your profile has successfully been updated... </span>
                    )}
                </form>
            </div>
                <Sidebar />
        </div>
    )
}
