// Frontend - GroupChat.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Navbar from "../Component/Navbar";

const socket = io("http://localhost:8000");

function Home() {
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.emit("joinGroup", groupName);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [groupName]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("sendMessage", { groupName, message: messageInput });
      setMessageInput("");
    }
  };

  return (
    <div>
      <Navbar />
      Home
    </div>
  );
}

export default Home;
