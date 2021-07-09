import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Intro from './Intro.jsx';
import char from './data.js';
import Card from './card.jsx';
import Des from './Des.jsx';
import Chat from './chat.jsx';
import Room from './room.jsx';
import Peer from 'peerjs';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');
const peer = new Peer(undefined, {
  host: '/',
  port: '3001',
});

const App = () => {
  const [mode, setMode] = useState('intro');
  const [i, setI] = useState(null);
  const [players, setPlayers] = useState([]);
  const [text, setText] = useState([]);
  const [vote, setVote] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const videoGrid = document.getElementById("video-grid");
    const myVideo = document.createElement("video");
    const showChat = document.querySelector("#showChat");
    const backBtn = document.querySelector(".header__back");
    myVideo.muted = true;


    const user = prompt("Enter your name");

    let myVideoStream;
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        myVideoStream = stream;
        addVideoStream(myVideo, stream);

        peer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
        });
      });
      
    peer.on('open', (id) => {
      socket.emit('join-room', roomId, id, user);
    });


    let text = document.querySelector('#chat_message');
    let send = document.getElementById('send');
    let messages = document.querySelector('.messages');

    send.addEventListener('click', (e) => {
      if (text.value.length !== 0) {
        socket.emit('message', text.value);
        text.value = '';
      }
    });

    text.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && text.value.length !== 0) {
        socket.emit('message', text.value);
        text.value = '';
      }
    });

    socket.on('createMessage', (message, userName) => {
      messages.innerHTML =
        messages.innerHTML +
        `<div class='message'>
            <b><i class='far fa-user-circle'></i> <span> ${userName === user ? 'me' : userName}</span>
            <span>: ${message}</span>
        </div>`;
    });

  }, []);


  const addVideoStream = (video, stream) => {
    console.log('video ' + video);
    console.log('stream: ' + stream);
    const videoGrid = document.getElementById('video-grid');
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
      videoGrid.append(video);
    });
  };

  const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
      video.remove();
    });
  };




  let card = [];
  let centerCard = [];
  let order = [0, 2, 3, 4, 5, 1, 6];

  const generateNPC = () => {
    let npc = char.slice(0);
    npc.splice(i, 1);
    for (let i of npc) {
      if (i.id === 0 || i.id === 2) {
        card.push(i);
      }
      card.push(i);
    }
    let n = Math.floor(Math.random() * 7);
    for (let i = 0; i < 3; i++) {
      centerCard.push(card[n]);
      card.splice(n, 1);
    }
    setPlayers(card);
  };

  const generateText = (status) => {
    let text = [];
    if (status === 1) {

      for (let n of order) {
        if (i === n) {
          text.push('It is your turn now! Usually a ' + char[n].action);
          return text;
        }
        text.push(char[n].action);
      }
    }
    if (status === 2) {
      for (let n of order) {
        if (n > i) {
          text.push(char[n].action);
        }
      }
    }
    return text;
  };

  const playGame = (n) => {
    if (reveal) {
      return;
    }
    if ( i === 3) {
      players[n].reveal = true;
      setReveal(true);
      if (players[n].id === 0) {
        alert ('Congrats! You found the werewolf, you are safe now!');
      }
    }
  };

  const voteWerewolf = (n) => {
    if (vote) {
      players[n].reveal = true;
      setReveal(!reveal);
      if (players[n].id === 0) {
        alert ('Congrats! You found the werewolf, you are safe now!');
      } else {
        alert ('Sorry! Werewolves escaped and turned back to eat you!');
      }
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      messages.push(input.value);
      setMessages(messages);
      input.value = '';
    }

    socket.on('chat message', function(msg) {
      var item = document.createElement('li');
      item.textContent = msg;
      console.log('test' + msg);
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
  };

  return (
    <div>
      <h1>Welcome to Play One night found werewolf</h1>
      <div id='callGrid'></div>

      {mode === 'intro' && <div>
        <h2>Choose a role you want to play:</h2>
        <Intro char={char} setI={setI}/>

        {i !== null ? <div className='info'>
          <Des info={char[i]}/>
          <button className='button' onClick={
            async (e) => {
              generateNPC();
              let t = generateText(1);
              await setText(t);
              setMode('game');
            }}>Choose {char[i].name}</button>
        </div>
          : <div className='info'></div>}

      </div>}

      {mode === 'game' && <div>
        <h2>Game Start, watch carefully :</h2>
        <div className='game container'>
          <div className='content-box'>
          Everyone, go to sleep
            {text.map((t, j) => <p key={j} style={{'animationDelay': j * 2000 + 'ms'}}>- {t}</p>)}
          </div>
          <div className='desk container'>
            <div className='players container'>
              {[[0, 'A'], [1, 'B'], [2, 'C'], [3, 'D'], [4, 'E']].map((n) => <div key={n} className='npc container' onClick={(e) => {
                if (vote) {
                  voteWerewolf(n[0]);
                } else {
                  playGame(n[0]);
                }
              }}>
                <span>PLAYER {n[1]}</span>
                {players[n[0]].reveal ? <img src={players[n[0]].img}></img>
                  : <img src='./img/cardBack.png'></img>}
              </div>
              )}
            </div>
            <div>Center Cards: </div>
            <div className='center container'>
              {[0, 1, 2].map((n) => <div key={n} className='centerCard'>
                <img src='./img/cardBack.png'></img>
              </div>
              )}
            </div>
          </div>
        </div>
        <div className='gameBtn container'>
          <div>
            <button className='button' >Take Action</button>
          </div>
          <div>
            <button className='button' onClick={(e) => setVote(true)}>Vote Werewolf</button>
            {vote && <div>Please Choose One player!</div>}
          </div>
        </div>
      </div>}
      <Room />
      {/* <Chat messages={messages} handleSubmit={handleSubmit}/> */}
    </div>
  );
};

export default App;