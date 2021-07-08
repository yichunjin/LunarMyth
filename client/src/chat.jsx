import React, {useState} from 'react';

const Chat = ({ messages, handleSubmit }) => {
  return (
    <div>
      <ul id="messages"></ul>
      <form id="form" action="" onSubmit={(e) => handleSubmit(e)}>
        <input id="input" autoComplete="off" /><button>Send</button>
      </form>
      <script>var socket = io();</script>
    </div>
  );
};

export default Chat;