import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import ChatOption from '../../components/chatOption';
import Conversation from '../../components/conversation';
import './style.css'
import { removeChatUser } from '../../actions/selected';

const ChatPage = () => {
    const username = useSelector((state) => state.profile.username);
    const chosenUser = useSelector(state => state.selected.chatUser)
    const [socket, setSocket] = useState(null)
    const [chatList, setChatList] = useState(null)
    const [chatLog, setChatLog] = useState()
    const [target, setTarget] = useState(null)
    const chatUsers = useRef(null)
    const [createNew, setCreateNew] = useState(null)
    const [newUsername, setNewUsername] = useState('')
    const endpoint = "ws://127.0.0.1:8000/ws/ac/"
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        try{
        let newSocket = new WebSocket("ws://127.0.0.1:8000/ws/ac/");
        newSocket.onmessage = (data) => {
            console.log(data)
            let response = JSON.parse(data.data)
            handleResponse(response)
        }    
        newSocket.onopen = () => {
            newSocket.send(JSON.stringify({"type": "online", "username": username}))
            newSocket.send(JSON.stringify({"type": "getList"}))
            if (chosenUser != ''){
                console.log("Here#2")
                setTarget(chosenUser)
                const get_log = {
                    "type": "getLog",  
                    "recipient" : chosenUser,
                }
                newSocket.send(JSON.stringify(get_log))
                dispatch(removeChatUser)
            }
                    
        }    
        setSocket(newSocket)
        
        } catch(error){
        console.log("Error setting socket")
        }   

    }, []);

    const orderMessages = (data) => {
        data = data.map(chat => {
            return {
                ...chat,
                date : new Date(chat.date)
            }
        })
        data.sort((a, b) => (a.date > b.date ? 1 : -1))
        return data
    }

    function handleResponse(data){
        try{
            switch (data.type) {
                case "set_list":
                    setChatList(data.data)
                    break;
                case "set_log":
                    let orderedMessages = orderMessages(data.data) 
                    setChatLog(orderedMessages)
                    chatUsers.current.style.display = 'none'
                    setCreateNew(false)
                    break;
                case "verify_error":
                    setErrorMessage(data.data)
                    setTarget(null)
                    break;
                default:
                    break;
            }
        }catch(error){
            console.log("Error handling response", error)
        }
    }

    const createChat = () => {
        setCreateNew(true)
    }

    const sendMessage = (message, target) => {
        const newMessage = {
            "type": "sendMsg",
            "recipient" : target,
            "message": message,
        }
        socket.send(JSON.stringify(newMessage))
        getChatLog(target)
    }

    function getChatLog(targetUser){
        setTarget(targetUser)
        const get_log = {
            "type": "getLog",  
            "recipient" : targetUser,
        }
        socket.send(JSON.stringify(get_log))
    }

    const handleNewUsername = (e) => {
        setNewUsername(e.target.value)
    }

    const checkNewUsername = (e) => {
        e.preventDefault()
        setTarget(newUsername)
        socket.send(JSON.stringify({"type": "verify", "username" : newUsername}))
    }

    return (
        <div className='chat-page' role='chatPage'>
        {/* <div id="delete-this-when-redux">
            <form onSubmit={sendOnline}>
                <input type="submit" value="Submit" />
            </form>
            <form onSubmit={sendTest}>
                <input type="submit" value="send anger" />
            </form>
            <form onSubmit={getList}>
                <input type="submit" value="get list" />
            </form>
        </div> */}
            
        {chatList ? 
        <div className='chat-list' ref={chatUsers} role='chatList'>
            <div className='chat-menu'>
                <h2>Select a chat</h2>
                <button onClick={createChat}>Start new chat</button>
            </div>
            
        {createNew ?
        <>
            <form onSubmit={checkNewUsername}>
            <label htmlFor='new-user' hidden={errorMessage ? false : true}> {errorMessage} </label>
            <input name='new-user' type="text" value={newUsername} onChange={handleNewUsername} />
            <input type="submit" value="submit" />
            </form>
        </> :
        null}

        {chatList.map((user) => <ChatOption username={user[0]} onClick={getChatLog}/>)}    
        </div> :
        <h1>HELLO {username ? username : "WHY AREN'T YOU LOGGED IN"}</h1>    
        }

        {chatLog ?
        <>
            <button className='go-back-btn' onClick={() => {
                chatUsers.current.style.display = 'flex'
                setChatLog(null)
                socket.send(JSON.stringify({"type": "getList"}))}
            }> go back  
            </button>
            <Conversation chatlog={chatLog} username={username} target={target} sendMsg={sendMessage} />
        </> :
        null}             
    </div>
  );
};

export default ChatPage;
