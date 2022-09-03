import React, { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: ''
    })

    const { username, password, re_password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
return (
    <>
    </>
);
};

export default Register