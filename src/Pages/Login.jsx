import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFetch from "../customHook/useFetch";
import signinStyles from '../styles/signin.module.css';
import Nav from "../components/Nav";

const tokenUrl = 'https://api.themoviedb.org/3/authentication/token/new?api_key=019085ae8fd360fcd800ae1d44592de2';
const loginUrl = 'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=019085ae8fd360fcd800ae1d44592de2';

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" }); //form data state
    const [token, setToken] = useState(''); //state to store user token 
    const [errors, setErrors] = useState({ username: "", password: "" });  //validation state
    const navigate = useNavigate();
    let { data } = useFetch(tokenUrl); //custom hook to fetch token 
    useEffect(() => {
        setToken(data.request_token);
    }, [data]);

    //function to validate the form data
    const validate = (name, value) => {
        if (value.length < 3 && value.length > 0) {
            return `${name} must be at least 3 characters long`;
        }
        return "";
    };

    //input handler function 
    const handleChange = ({ target: { value, name } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    };

    //submit function for the form
    const handleSubmit = async () => {
        const newErrors = {
            username: formData.username ? validate('username', formData.username) : 'Username is required',
            password: formData.password ? validate('password', formData.password) : 'Password is required',
        };
        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) return;

        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, request_token: token })
            });
            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem('token', data.request_token);
                navigate('/movies');
                toast('Login Successful');
            } else {
                toast.warning(data.status_message);
            }
        } catch (error) {
            toast.error('Login error:', error);
        }
    };

    return (
        <div >
            <Nav />
            <div className={signinStyles.signincontainer}>
                <div className={signinStyles.signinform}>
                    <div className={signinStyles.signinbox} >
                        <h2 className={signinStyles.signintext}>Sign in</h2>
                        <p className={signinStyles.signinpara}>Sign in to your Self Service Portal</p>
                        <div className={signinStyles.input}>
                            <input
                                type="text"
                                name="username"
                                placeholder='Username'
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <span>{errors.username}</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span>{errors.password}</span>
                        </div>
                        <div className={signinStyles.button}>
                            <button className={signinStyles.signinbtn} onClick={handleSubmit}>LOG IN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}