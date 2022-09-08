import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatOption from "../../components/chatOption";
import Conversation from "../../components/conversation";
import "./style.css";
import { removeChatUser } from "../../actions/selected";
import { TiArrowForwardOutline, TiArrowBackOutline } from "react-icons/ti";

const ChatPage = () => {
  const username = useSelector((state) => state.profile.username);
  const chosenUser = useSelector((state) => state.selected.chatUser);
  const [socket, setSocket] = useState(null);
  const [chatList, setChatList] = useState(null);
  const [chatLog, setChatLog] = useState();
  const [target, setTarget] = useState(null);
  const chatUsers = useRef(null);
  const [createNew, setCreateNew] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const endpoint = "ws://127.0.0.1:8000/ws/ac/";
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      let newSocket = new WebSocket("ws://127.0.0.1:8000/ws/ac/");
      newSocket.onmessage = (data) => {
        let response = JSON.parse(data.data);
        handleResponse(response);
      };
      newSocket.onopen = () => {
        newSocket.send(JSON.stringify({ type: "online", username: username }));
        newSocket.send(JSON.stringify({ type: "getList" }));
        if (chosenUser != "") {
          setTarget(chosenUser);
          const get_log = {
            type: "getLog",
            recipient: chosenUser,
          };
          newSocket.send(JSON.stringify(get_log));
          dispatch(removeChatUser);
        }
      };
      setSocket(newSocket);
    } catch (error) {
      console.log("Error setting socket");
    }
  }, []);

  const orderMessages = (data) => {
    data = data.map((chat) => {
      return {
        ...chat,
        date: new Date(chat.date),
      };
    });
    data.sort((a, b) => (a.date > b.date ? 1 : -1));
    return data;
  };

  function handleResponse(data) {
    try {
      switch (data.type) {
        case "set_list":
          setChatList(data.data);
          break;
        case "set_log":
          let orderedMessages = orderMessages(data.data);
          setChatLog(orderedMessages);
          setChatList(null);
          setCreateNew(false);
          break;
        case "verify_error":
          setErrorMessage(data.data);
          setTarget(null);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("Error handling response", error);
    }
  }

  const handleNewUsername = (e) => {
    setNewUsername(e.target.value);
  };

  const createChat = () => {
    setCreateNew(true);
  };

  const sendMessage = (message, target) => {
    const newMessage = {
      type: "sendMsg",
      recipient: target,
      message: message,
    };
    socket.send(JSON.stringify(newMessage));
    getChatLog(target);
  };

  function getChatLog(targetUser) {
    setTarget(targetUser);
    const get_log = {
      type: "getLog",
      recipient: targetUser,
    };
    socket.send(JSON.stringify(get_log));
  }

  const checkNewUsername = (e) => {
    e.preventDefault();
    setTarget(newUsername);
    socket.send(JSON.stringify({ type: "verify", username: newUsername }));
  };

  const handleBack = () => {
    // chatUsers.current.style.display = 'flex'
    setChatLog(null);
    socket.send(JSON.stringify({ type: "getList" }));
  };

  return (
    <div className="chatContainer" role="chatPage">
      <div className="chatWrapper">
        {chatList ? (
          <div className="chatMenuWrapper" ref={chatUsers}>
            <div className="chatMenu">
              <h2>Connect with other animal lovers</h2>
              <button onClick={createChat}>
                <span className="icon">
                  <TiArrowForwardOutline />
                </span>
              </button>
            </div>

            {createNew ? (
              <>
                <form onSubmit={checkNewUsername}>
                  <label
                    htmlFor="new-user"
                    hidden={errorMessage ? false : true}
                  >
                    {" "}
                    {errorMessage}{" "}
                  </label>
                  <input
                    name="new-user"
                    type="text"
                    value={newUsername}
                    onChange={handleNewUsername}
                  />
                  <input type="submit" value="SEARCH" />
                </form>
              </>
            ) : null}
            <div className="chatList">
              {chatList.map((user) => (
                <ChatOption username={user[0]} onClick={getChatLog} />
              ))}
            </div>
          </div>
        ) : null}

        {chatLog ? (
          <>
            <Conversation
              chatlog={chatLog}
              username={username}
              target={target}
              sendMsg={sendMessage}
              handleBack={handleBack}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ChatPage;
