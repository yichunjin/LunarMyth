import React, {useState} from 'react';

const Room = () => {
  return (
    <div className='videoRoom'>
      <div className="header">
        <div className="logo">
          <div className="header__back">
            <i className="fas fa-angle-left"></i>
          </div>
          <h3>Video Chat</h3>
        </div>
      </div>
      <div className="main">
        <div className="main__left">
          <div className="videos__group">
            <div id="video-grid"></div>
          </div>
          <div className="options">
            <div className="options__left">
              <div id="stopVideo" className="options__button">
                <i className="fa fa-video-camera"></i>
              </div>
              <div id="muteButton" className="options__button">
                <i className="fa fa-microphone"></i>
              </div>
            </div>
            <div className="options__right">
              <div id="inviteButton" className="options__button">
                <i className="fas fa-user-plus"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="main__right">
          <div className="main__chat_window">
            <div className="messages"></div>
          </div>
          <div className="main__message_container">
            <input id="chat_message" type="text" autocomplete="off" placeholder="Type message here..." />
            <div id="send" className="options__button">
              <button className="sendBtn">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;