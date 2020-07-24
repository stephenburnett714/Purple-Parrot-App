import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components'


const Ul = styled.ul`
list-style: none;
display: flex;
justify-content: center;


li {
    padding: 22px 15px;
    font-size: x-large;
}


@media (min-width: 1023px){ 
display: none;
}


@media (max-width: 1023.1px){ 
    
    flex-flow: column nowrap;
    background-color: #b794f4;;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)': 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    margin: 0;
    align-items:center;
    transition: transform .3s ease-in-out;
}
`;

export default function NavMenu(props) {

    const setOpen = props.setOpen
    const open = props.open

    return (
        <Ul  open={props.open}>
            <div></div>
            <NavLink exact to={'/main'}>
                <li onClick={() => setOpen(!open)} className="text-white text-2xl">Home</li>
            </NavLink>

            <NavLink exact to={'/tickets'}>
                <li onClick={() => setOpen(!open)} className="text-white text-2xl">Tickets</li>
            </NavLink>

            <NavLink exact to={'/favorites'}
                >
                 <li onClick={() => setOpen(!open)} className="text-white text-2xl">Favorites</li>
            </NavLink>

            <NavLink exact to={'/profile'}
                >
                <li onClick={() => setOpen(!open)} className="text-white text-2xl">Profile</li>
            </NavLink>

        </Ul>
    )
}