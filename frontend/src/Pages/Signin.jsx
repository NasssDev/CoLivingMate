import {useEffect, useState} from "react";
import {ButtonForm} from "../Components/ButtonForm.jsx";
import {InputForm} from "../Components/InputForm.jsx";

export const Signin = () => {

    const [formData, setFormData] = useState({username: "", password: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:1200/login",{
            method: 'POST',
            headers: new Headers({
                "Content-type":  "application/x-www-form-urlencoded"
            }),
            body: JSON.stringify(formData),})
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
            <div className="flex justify-center items-center">
            <form  onSubmit={handleSubmit} className={` w-64 py-6`}>
                <label htmlFor="username">Username</label>
                <InputForm inputType="text" inputName="username" inputId="username" onChange={handleChange} value={formData.username} className="w-full py-2 pl-2 pr-4 text-gray-700 bg-white border rounded-lg  focus:border-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-300"
                />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} className="w-full py-2 pl-2 pr-4 text-gray-700 bg-white border rounded-lg  focus:border-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-300"
                />
                <ButtonForm buttonName={"Sign in"}></ButtonForm>
            </form>
            </div>
        </div>
    )
}