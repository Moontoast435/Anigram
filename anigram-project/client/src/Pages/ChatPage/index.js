import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux'
import ChatOption from '../../components/chatOption';
import Conversation from '../../components/conversation';
import './style.css'

const ChatPage = () => {

    const username = useSelector(state => state.profile.username);
    console.log("username is", username)

    const [socket, setSocket] = useState(null)
    const [chatList, setChatList] = useState(null)
    const [chatLog, setChatLog] = useState()
    const [target, setTarget] = useState(null)
    const chatUsers = useRef(null)
    const [createNew, setCreateNew] = useState(null)
    const [newUsername, setNewUsername] = useState(null)
    const endpoint = "ws://127.0.0.1:8000/ws/ac/"
    useEffect(() => {
        try{
        let newSocket = new WebSocket("ws://127.0.0.1:8000/ws/ac/");
        newSocket.onmessage = (data) => {
            console.log(data.data)
            let response = JSON.parse(data.data)
            handleResponse(response)
        }    
        newSocket.onopen = () => {
            newSocket.send(JSON.stringify({"type": "online", "username": username}))
            newSocket.send(JSON.stringify({"type": "getList"}))
        }    
        setSocket(newSocket)
        } catch(error){
        console.log("Error setting socket")
        }
        

    }, []);

    

    const orderMessages = (data) => {
        console.log(data)
        data = data.map(chat => {
            return {
                ...chat,
                date : new Date(chat.date)
            }
        })
        data.sort((a, b) => (a.date > b.date ? 1 : -1))
        console.log(data)
        return data
    }
    function handleResponse(data){
        console.log("and the data is...", data)
        try{
            switch (data.type) {
                case "set_list":
                    setChatList(data.data)
                    break;
                case "set_log":
                    console.log(data.data)
                    let orderedMessages = orderMessages(data.data) 
                    setChatLog(orderedMessages)
                    console.log(chatLog)
                    chatUsers.current.style.display = 'none'
                    break;
                default:
                    break;
            }
        }catch(error){
            console.log("Error handling response")
        }
    }

    let data2 = {message: "woo", type: "online"}
    
    const send_msg = {
        "type": "sendMsg",
        "recipient" : "marina",
        "message": "I love you",
    }

    const get_list = {
        "type": "getList",  
    }
    
    const sendTest = (e) => {
        e.preventDefault()
        socket.send(JSON.stringify(send_msg))
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
    const sendOnline = (e) => {
        const online_msg = {
            "username" : username,
            "type" : "online"
        }
        e.preventDefault()
        socket.send(JSON.stringify(online_msg))
    }

    const getList = (e) => {
        e.preventDefault()
        socket.send(JSON.stringify(get_list))
    }

    const getChatLog = (targetUser) => {
        setTarget(targetUser)
        console.log("AND THE TARGET IS", targetUser)
        const get_log = {
            "type": "getLog",  
            "recipient" : targetUser,
        }
        
        socket.send(JSON.stringify(get_log))
    }

    const createChat = () => {
        setCreateNew(true)
    }

    const handleNewUsername = (e) => {
        e.preventDefault()
        //setCreateNew(true)
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
            <div className='chat-list' ref={chatUsers}>
                <div className='chat-menu'>
                    <h2>Select a chat</h2>
                    <button onClick={createChat}>Start new chat</button>
                </div>
                
            {createNew ?
            <>
             <form>
                <input type="text" value={newUsername} onChange={handleNewUsername} />
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
                    setChatLog(null)}
                }> go back  
                </button>
                <Conversation chatlog={chatLog} username={username} target={target} sendMsg={sendMessage} />
            </> :
            null}             


        </div>
    );
}

export default ChatPage;
