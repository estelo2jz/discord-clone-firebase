import React from 'react';

import '../styles/Message.scss';
import { Avatar } from '@material-ui/core';

function Message() {
  return (
    <div className="message">
      <Avatar 
        src=""
      />
      <div className="message__info">
        <h4>estelo2jz
          <span className="message__timestamp">this is a message</span>
        </h4>
        <p>This is a message</p>
      </div>
    </div>
  )
}

export default Message
