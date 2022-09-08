import React from 'react';

const ChatOption = ({username, onClick}) => {
    const handleClick = () => {
        onClick(username)
    }
    return (
        <div className='chat-option' onClick={handleClick}>
            <p>{username}</p>
        </div>
    );
}

export default ChatOption;
