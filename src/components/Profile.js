import React from 'react';
import Navbar from './Navbar';
import ProfilePicture from '../Images/profile-picture.png'
import {NavLink} from 'react-router-dom'

const Profile = (props) => {

    const level = Math.floor((props.user.score / 100)) + 1

    const capitalize = (string) => {
        if (typeof string !== 'string') return ''
        return string.charAt(0).toUpperCase() + string.slice(1)
      }

    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <div>Profile</div>
                {console.log(props)}
                <img className="h-40 w-40"src={ProfilePicture}></img>
                
            <div>{capitalize(props.user.user_name)}</div>
            <div>Level: {level}  |  Points : {props.user.score}</div>

            <NavLink to="/preferences">Preferences</NavLink>
            {/* <NavLink>Location</NavLink>
            <NavLink>Past Events</NavLink>
            <NavLink>Settings</NavLink>
            <NavLink>Change Password</NavLink> */}
            </div>
        </div>
    );
}

export default Profile;