import React, { useState } from 'react';
import './chatinput.css';
import { useStateValue } from './StateProvider';
import axios from './axios';

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      axios.post(`/new/message?id=${channelId}`, {
        message: input,
        timestamp: Date.now(),
        user: user.displayName,
        userimage: user.photoURL,
      });
    }
    setInput('');
  };

  return (
    <div className="chatinput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
