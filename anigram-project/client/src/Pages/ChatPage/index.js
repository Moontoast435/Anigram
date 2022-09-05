import React, {useEffect, useState} from 'react';
import ChatOption from '../../components/chatOption';
const ChatPage = () => {


    const [socket, setSocket] = useState(null)
    const [chatList, setChatList] = useState(null)
    useEffect(() => {
        try{
        let newSocket = new WebSocket("ws://127.0.0.1:8000/ws/ac/");
        newSocket.onmessage = (data) => {
            console.log(data.data)
            let response = JSON.parse(data.data)
            handleResponse(response)
        }
        setSocket(newSocket)
        } catch(error){
        console.log("Error setting socket")
        }

    }, []);

    function handleResponse(data){
        console.log("and the data is...", data)
        try{
            switch (data.type) {
                case "set_list":
                    setChatList(data.data)
                    break;
                default:
                    break;
            }
        }catch(error){
            console.log("Error handling response")
        }
    }

    let data2 = {message: "woo", type: "online"}
    const online_msg = {
        "username" : "mattr",
        "type" : "online"
    }
    const send_msg = {
        "type": "sendMsg",
        "recipient" : "marina",
        "message": "Sorry, but who are you? Also, can I purchase your dog?",
    }

    const get_list = {
        "type": "getList",  
    }
    const sendMessage = (e) => {
        e.preventDefault()
        socket.send(JSON.stringify(send_msg))
    }
    const sendOnline = (e) => {
        e.preventDefault()
        socket.send(JSON.stringify(online_msg))
    }

    const getList = (e) => {
        e.preventDefault()
        socket.send(JSON.stringify(get_list))
    }

    return (
        <div className='chat-page'>
            <div id="delete-this-when-redux">
                <form onSubmit={sendOnline}>
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={sendMessage}>
                    <input type="submit" value="send msg" />
                </form>
                <form onSubmit={getList}>
                    <input type="submit" value="get list" />
                </form>
            </div>
            <div>
                {chatList ? 
                <>
                <h1>this is where the chat list goes</h1>
                {chatList.map((user) => <ChatOption username={user[0]}/>)}    
                </> :
                null                 
            }
            </div>

        </div>
    );
}

export default ChatPage;
