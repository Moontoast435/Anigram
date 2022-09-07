import React, {useState} from 'react';

const Conversation = ({chatlog, username, target, sendMsg}) => {

    const [input, setInput] = useState()

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // do something
        setInput('')
        e.target.elements['msg-input'].value = ''
        sendMsg(input, target)
        
    }

    return (
        <div className="chatlog" role="chatLog">
            <h2>Conversation with {target}</h2>
            {chatlog.map(chat => <>
                    <div className={`chat-single ${username == chat.sender ? "from-user" : "from-target"}`}>
                        <p>{chat.message}</p>
                        
                    </div>
                </>
            )}
            <form onSubmit={handleSubmit}>
                <input name="msg-input" type="text" value={input} onChange={handleInput} placeholder={`send a message`}/>
                <input type="submit" value="Send"/>
            </form>
        </div>
    );
}

export default Conversation;
