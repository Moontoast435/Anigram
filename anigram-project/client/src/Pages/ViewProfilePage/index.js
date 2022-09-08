import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { update_profile } from '../../actions/profile';
import axios  from 'axios'
import { setChatUser} from '../../actions/selected';

const ViewProfilePage = () => {
    const [userData, setUserData] = useState()
    const [currentUser, setCurrentUser] = useState(null)
    const chosenUser = useSelector(state => state.selected.profileUser)
    const dispatch = useDispatch()
    const [users, setUsers] = useState()
    const [rawUsers, setRawUsers] = useState()
    const navigate = useNavigate()
    const getUsers = async () => {
        let response = await axios.get('http://127.0.0.1:8000/accounts/get_users')
        setRawUsers(response.data)
        setUsers(response.data)
        console.log(response.data) //array of users
    }

    const filterUsers =  (query=null) => {
        if (query){
            let userList = rawUsers
            let result = userList.filter(user => user.username.includes(query))
            setUsers(result)
        }
        setUsers(rawUsers)
    }


    useEffect(async () => {
        await getUsers()
        if (chosenUser != ''){
            loadProfile(chosenUser)
        }
        
    }, []);

    const handleSearch = (e) => {
        e.preventDefault()
        filterUsers(e.target.elements['query'].value)
    }

    const loadProfile = async (user) => {
        let data = await axios(`http://127.0.0.1:8000/profile/user/${user}`)
        let response = await JSON.parse(data.data.profile)
        console.log(response)
        setUserData(response)
        setCurrentUser(data.data.username)
        setUsers(null)
    }

    const linkToChat = (username) => {
        dispatch(setChatUser(username))
        navigate('../chats')
    }

    return (
        <div className="user-page">
            <h1> Welcome to the user search</h1>
            <form onSubmit={handleSearch}>
                <input name='query' type="text" />
                <input type="submit" value="submit"/>
            </form>

            {users ? <div>
                {users.map(user => {return <div className="user-option"> 
                <p onClick={() => loadProfile(user.username)}>{user.username}</p>
                </div>
                })}
                    </div>: null}

            {userData? <div>
                
                <p>Pet Name: {userData.pet_name}</p>
                <p>Owner: {userData.owner_name}</p>
                <p>Contact Number: {userData.phone}</p>
                <p>City: {userData.city}</p>
                <p>Credentials: {userData.credentials}</p>
                <button onClick={() => {
                    setUserData(null)
                    filterUsers()
                }}>Go back</button>
                <button onClick={() => linkToChat(currentUser)}>Start a chat with {userData.owner_name}</button>
            </div> : null
            }
        </div>


)
}

export default ViewProfilePage

