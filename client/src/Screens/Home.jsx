import React, {useEffect, useState} from 'react'
import axios from "axios";
import { backendURL } from '../App.js';

const Home = () => {

    useEffect(() => {
        getUserData();
    },[]);

    const [data, setData] = useState({});

    const getUserData = async() => {
        const res = await axios.get(`${backendURL}/log`,
        {
            withCredentials: true
        });
        const user = res.data.data;
        setData(user);
        console.log(user);
    }

    console.log("hello");

    const logout = async() => {
        await axios.get('http://localhost:5000/auth/logout',
        {
            withCredentials: true
        }
        );
    }

  return (
    <>
        <h3>Name: {data.displayName ?? "Loading..."}</h3>
        <h3>Email: {data.email ?? "Loading..."}</h3>
        <h3>Google Login ID: {data.googleId ?? "Loading..."}</h3>
        <a href='http://localhost:5000/auth/logout'>Sign Out</a>
    </>
  )
}

export default Home