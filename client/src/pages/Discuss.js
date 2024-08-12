import React, { useMemo, useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "../App.css";

function Discuss() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const language = localStorage.getItem("language").replace(/['"]+/g, "");
  const username = localStorage.getItem("username").replace(/['"]+/g, "");
  const socket = useMemo(() => {
    return io("http://localhost:8000");
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/GroupMSg", {
          params: { language },
        });
        const transformedMessages = response.data.map((msg) => ({
          username: msg.username,
          message: msg.message,
        }));
        console.log(transformedMessages);
        console.log(username, "hi");
        setMessages(transformedMessages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected. My id:", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log("Received welcome message:", s.msg, "from:", s.id);
    });

    socket.emit("Join-room", language);

    socket.on("receive", ({ message, username }) => {
      setMessages((prevMessages) => [...prevMessages, { message, username }]);
      console.log("Received : ", message);
      // toast.success(username, " joined!");
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { username, language, message };
    console.log("Send:", message);
    setMessages((prevMessages) => [...prevMessages, { message, username }]);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    socket.emit("send", payload);
    setMessage("");
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="msgDisplay">
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.username === username ? "ownMessage" : "otherMessage"
                  }`}
                >
                  <div className="username">{msg.username}</div>
                  <div className="text">{msg.message}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="msgInput">
            <input
              className="inputfield"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
            />
            <button className="sub-btn" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Discuss;
