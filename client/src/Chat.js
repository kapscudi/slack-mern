import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './chat.css';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from './Message';
import ChatInput from './ChatInput';
import axios from './axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('0b78815f7d516f384a8d', {
  cluster: 'eu',
});

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  const getConversation = () => {
    axios.get(`/get/conversation?id=${roomId}`).then((res) => {
      setRoomDetails(res.data[0].channelName);
      setRoomMessages(res.data[0].conversation);
    });
  };

  useEffect(() => {
    if (roomId) {
      getConversation();

      const channel = pusher.subscribe('conversation');
      channel.bind('newMessage', function (data) {
        getConversation();
      });
    }
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_headerleft">
          <h4 className="chat_channelname">
            <strong>#{roomDetails}</strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>
        <div className="chat_headerright">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
      <div className="chat_messages">
        {roomMessages.map(({ message, user, userimage, timestamp }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userimage={userimage}
          />
        ))}
      </div>
      <ChatInput channelName={roomDetails} channelId={roomId} />
    </div>
  );
}

export default Chat;
