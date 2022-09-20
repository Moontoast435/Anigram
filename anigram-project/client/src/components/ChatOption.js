import React from 'react';

const ChatOption = ({username, onClick}) => {
    const handleClick = () => {
        console.log(`handling the click for user ${username}`)
        onClick(username)
    }
    return (
        <div className='chat-option' onClick={handleClick}>
            <p>{username}</p>
        </div>
    );
}

export default ChatOption;
