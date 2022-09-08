import React, { useState } from "react";
import { TiArrowForwardOutline, TiArrowBackOutline } from "react-icons/ti";

const Conversation = ({ chatlog, username, target, sendMsg, handleBack }) => {
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
    e.target.elements["msg-input"].value = "";
    sendMsg(input, target);
  };

  return (
    <div className="chatLog">
      <h2>Your conversation with {target} starts here</h2>
      {chatlog.map((chat) => (
        <>
          <div
            className={`chat-single ${
              username == chat.sender ? "from-user" : "from-target"
            }`}
          >
            <p>{chat.message}</p>
          </div>
        </>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <button type="button" onClick={handleBack}>
            {" "}
            <span className="icon">
              <TiArrowBackOutline />
            </span>
          </button>
          <input
            name="msg-input"
            type="text"
            value={input}
            onChange={handleInput}
            placeholder={`SEND A MESSAGE`}
          />
          <input type="submit" value="SEND" />
        </form>
      </div>
    </div>
  );
};

export default Conversation;
