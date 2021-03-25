import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarChannel from './SidebarChannel';
import db, { auth } from '../firebase'
import { selectUser } from '../features/userSlice';

import '../styles/Sidebar.scss';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  // this runs once
  useEffect(() => {
    db.collection("channels").onSnapshot(snapshot => 
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter anew channel name");

    if (channelName) {
      db.collection('channels').add({
        channelName: channelName,
      });
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Raven</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({id, channel}) => (
            <SidebarChannel 
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltIcon 
          className="sidebar__voiceIcon"
          fontSize="Large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connect</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}         
         />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0,5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
