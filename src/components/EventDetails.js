import React, { useState, useEffect } from "react";
import axios from "axios";
import eventPicicture from "../Images/event.jpg";
import Navbar from "./Navbar";
import moment from 'moment'

const EventDetails = (props) => {
  const [event, setEvent] = useState();


//   Axios call for this events data    get data/:id
  useEffect(() => {
    axios
      .get(`http://localhost:3001/events/${props.match.match.params.id}`)
      .then((promise) => {
        setEvent(promise.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

//  Confirmation Function that creates post request
// const eventId = props.match.match.params.id
// const userId = props.match.user.id
console.log(props.match)
function confirmation(params) {
    axios({
        method: 'post',
        url: 'http://localhost:3001/attendees',
        attendees: {
            // event_id: eventId,
            // user_id: userId
        }
      });
}

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <div className="rounded border-4 p-4 m-4">
          <div>
            <img className="rounded py-2" src={eventPicicture}></img>
          </div>
          <div className="text-4xl">{event && event.event_name}</div>
          <div className="text-lg">{event && event.event_cat}</div>
        </div>
        <div className="grid grid-cols-5 gap-4 px-4">
          <div className="col-span-3">
            <div className="text-3xl pt-4">Description</div>
            <div>{event && event.description.replace(/["'\[\]',]/g, "")}</div>
            <div className="text-xl pt-4">Important Event Safety Info</div>
            <div>
              The exclusive concert will adhere to guidelines recommended by the
              Centers for Disease Control and Prevention (CDC) as well as all
              state and local public health mandates.{" "}
            </div>
            <div className="text-xl pt-4">General Rules</div>
            <div>Each ticket admits one.</div>
          </div>
          <div className="col-span-2 pt-6">
            <div>
              <div className="font-bold">Alameda Showhouse</div>
              <div>
                {event && event.street_address}, {event && event.state}, 
                {event && event.zip_code}
              </div>
            </div>
            <div className="pt-4">
                <div className="font-bold">{event && moment(event.date).format('MM/DD')}</div>
                <div className="font-bold">{event && event.time}</div>
                <div className="text-blue-300">Add to Calender</div>
            </div>
          </div>
        </div>
        {console.log(props)}
        {event && console.log(event)}
        <button className="px-8 py-2 rounded bg-purple-500 text-white mt-16 mb-4 bg-opacity-50" onClick={(e) => { if (window.confirm('Are you sure you wish to register for this event?')) confirmation(e)}}>Register</button>
      </div>
    </div>
  );
};

export default EventDetails;
