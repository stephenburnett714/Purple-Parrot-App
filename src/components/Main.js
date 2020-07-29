import React, { useState, useEffect } from "react";
import Navbar from './Navbar'
import axios from 'axios'
import image from '../Images/event.jpg'
import moment from 'moment'
import { NavLink } from 'react-router-dom'

const Main = (props) => {
  const [data, setData] = useState();


useEffect(() => {
  axios.get('http://localhost:3001/events')
   .then(promise => {
     
      setData(promise.data);
   })
   .catch(e => {
      console.error(e);
   })
}, []);

{console.log(data)}

  return (
    <div className="bg-purple-400">
      <Navbar />
      <div className="pt-20 px-2 flex items-center flex-col">
        <div className="text-4xl py-2">Trending Events</div>
        <div className="flex flex-row flex-wrap justify-between">
        {data && data.map(event=> (
          <NavLink to={`event/${event.id}`}>
        <div className="w-40 h-64 flex my-2 py-2 px-2 flex flex-col rounded bg-white items-center">
          <div><img className="rounded" src={image}></img></div>
        <div className="text-gray-600">{moment(event.date).format('MMMM Do')} @{event.time}</div>
          <div className="text-lg font-bold">{event.event_name}</div>
        <div className="text-sm text-gray-600">{event.street_address}, {event.state}</div>
        </div>
        </NavLink>
  ))}
  </div>
      
      </div>
    </div>
  );
};

export default Main;