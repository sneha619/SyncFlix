import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function WatchParty() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("sync-movie", (data) => {
      console.log("Movie sync event:", data);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit("send-message", message);
    setMessage("");
  };

  return (
    <div>
      <h2>Watch Party {id}</h2>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default WatchParty;
