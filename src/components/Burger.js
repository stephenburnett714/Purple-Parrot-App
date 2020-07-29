import React, { useState } from 'react'
import styled from 'styled-components'
import NavMenu from './NavMenu'
import { NavLink } from "react-router-dom";


const StyledBurger = styled.div`
width:2rem;
height: 2rem;
position: fixed;
left: 25px;
display: flex;
justify-content: space-around;
flex-flow: column nowrap;
z-index: 20;


div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? 'white' : 'black'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all linear .3s;


    &:nth-child(1) {
        transform: ${({ open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
        transform: ${({ open}) => open ? 'translateX(100%)' : 'translateX(0)'};
        opacity: ${({ open }) => open ? 0 : 1 }
    }

    &:nth-child(3) {
        transform: ${({ open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
}

@media screen and (min-width: 1023.1px){
  display: none
}
`;

export default function Burger() {
    const [open, setOpen] = useState(false)



    return (
        <div>
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
            <div />
            <div />
            <div />
        </StyledBurger>
        <NavMenu open={open} setOpen={setOpen}/>
        </div>
    )
}