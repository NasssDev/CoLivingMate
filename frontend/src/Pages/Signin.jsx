import {useEffect, useState} from "react";
import {ButtonForm} from "../Components/ButtonForm.jsx";
import {InputForm} from "../Components/InputForm.jsx";
import {Link} from "react-router-dom";

export const Signin = () => {

    const [formData, setFormData] = useState({username: "", pwd: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:1200/login", {
            method: 'POST',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded"
            }),
            credentials: "include",
            body: new URLSearchParams({
                ...formData
            })
        })
            .then(res => res.json())
            .then(data => {
                    console.log(data);
                }
            )
    }

    const handleChange = (e) => {
        setFormData(current => ({...current, [e.target.name]: e.target.value}));
    }

    return (
        <div className="h-full min-h-screen bg-white">
            <h1 className="text-3xl text-indigo-500">Signin</h1>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-indigo-800">Happy to see you, welcome !</h3>
                <form onSubmit={handleSubmit} className={` w-64 py-6`}>
                    <label htmlFor="username">Username</label>
                    <InputForm inputType="text" inputPlaceholder="Colocator79" inputName="username" inputId="username"
                               inputOnChange={handleChange} inputValue={formData.username}/>
                    <label htmlFor="password">Password</label>
                    <InputForm inputType="password" inputName="pwd" inputId="pwd" inputOnChange={handleChange}
                               inputValue={formData.pwd}/>
                    <span>Not account yet ? </span><Link to="/signup" className="text-indigo-500 underline">Sign
                    up</Link>
                    <ButtonForm buttonName={"Sign in"}></ButtonForm>
                </form>
            </div>
        </div>
    )
}