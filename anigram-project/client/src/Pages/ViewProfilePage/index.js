import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { update_profile } from '../../actions/profile';
import axios  from 'axios'

const ViewProfilePage = () => {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        city: ''
    })
    
    const [users, setUsers] = useState()
    const [rawUsers, setRawUsers] = useState()

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
    }


    useEffect(() => {
        getUsers()
    }, []);

    const handleSearch = (e) => {
        e.preventDefault()
        filterUsers(e.target.elements['query'].value)
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
                <p>{user.username}</p>
                <Link to=''></Link>
                </div>
                })}
                    </div>: null}
            
        </div>


)
}

export default ViewProfilePage

