import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { update_profile } from '../../actions/profile';

const Dashboard = ({
    update_profile,
    first_name_global,
    last_name_global,
    phone_global,
    city_global
}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        city: ''
    })
    
    const navigate = useNavigate();

    const { first_name, last_name, phone, city } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        update_profile(first_name, last_name, phone, city);
     };

    return (
        <div className="container">
            <h1> Welcome to the user dashboard</h1>
            <p> Update your user profile below:</p>
            <form onSubmit={e=> onSubmit(e)}>
                <div className="form-group">
                    <label></label>
                </div>
                <button className="btn btn-primary mt-3" type="submit">Update Profile</button>
            </form>
        </div>


)
}


const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_global: state.profile.phone,
    city_global: state.profile.city,
   
})
export default connect(mapStateToProps, { update_profile })(Dashboard);

