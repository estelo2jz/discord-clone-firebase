import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelName, selectChannelId } from '../features/appSlice';
import { selectUser } from '../features/userSlice';
import db from '../firebase';

import '../styles/Chat.scss';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [])

  const sendMessage = e => {
    e.preventDefault();
  }

  return (
    <div className="chat">
      <ChatHeader 
      // pass props to other components
        channelName={channelName}
      />
      <div className="chat__messages">
        {messages.map((messages) => {
          <Message />
        })}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="Large" />
        <form>
          <input 
            value={input} 
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`} />
          <button 
          disabled={!channelId}
            className="chat__inputButton" 
            type="submit"
            onclick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  )
}

export default Chat
