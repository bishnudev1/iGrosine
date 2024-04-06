import React, {useEffect, useState} from 'react'
import axios from "axios";
import { backendURL } from '../App.js';

const Home = () => {


    const dummyData = [
        {
            id: "1",
            image: "dettol.webp",
            name: "Grocery",
            desc: "This is product 1"
        },
        {
            id: "2",
            name: "Medicine",
            desc: "This is product 2"
        },
        {
            id: "3",
            name: "Product 3",
            desc: "This is product 3"
        },
        {
            id: "4",
            name: "Product 4",
            desc: "This is product 4"
        },
    ];

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

    <div className='cart'>
        {
            dummyData.map((item,index) => {
                return <div className='product' key={index}>
                    <p>{item.id ?? "Loading"}</p>
                    <h1>{item.name ?? "Loading"}</h1>
                    <h2>{item.desc ?? "Loading"}</h2>
                </div>
            })
        }
    </div>
  )
}

export default Home