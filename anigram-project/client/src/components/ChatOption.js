import React from 'react';

const ChatOption = ({username}) => {
    const handleClick = () => {
        console.log("handling the click")
    }
    return (
        <div onClick={handleClick}>
            <p>{username}</p>
        </div>
    );
}

export default ChatOption;
