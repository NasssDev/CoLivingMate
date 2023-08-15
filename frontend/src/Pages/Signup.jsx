import {InputForm} from "../Components/InputForm.jsx";
import {ButtonForm} from "../Components/ButtonForm.jsx";
import {useState} from "react";

export const Signup = () => {

    const [formData, setFormData] = useState({firstname: "", lastname: "", email: "", birthdate: "", username: "", pwd: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:1200/signup",{
            method: 'POST',
            headers: new Headers({
                "Content-type":  "application/x-www-form-urlencoded"
            }),
            credentials: "include",
            body: new URLSearchParams({
                ...formData
            })})
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
            <h1 className="text-3xl text-indigo-500">Sign up</h1>
            <div className="flex justify-center items-center">
                <form  onSubmit={handleSubmit} className={` w-64 py-6`}>
                    <label htmlFor="firstname">Firstname</label>
                    <InputForm inputType="text" inputPlaceholder="Jean-coloc" inputName="firstname" inputId="firstname" inputOnChange={handleChange} inputValue={formData.firstname} />
                    <label htmlFor="lastname">Lastname</label>
                    <InputForm inputType="text" inputPlaceholder="Le mate" inputName="lastname" inputId="lastname" inputOnChange={handleChange} inputValue={formData.lastname} />
                    <label htmlFor="email">Email</label>
                    <InputForm inputType="email" inputPlaceholder="coliving@email.com" inputName="email" inputId="email" inputOnChange={handleChange} inputValue={formData.email} />
                    <label htmlFor="birthdate">Birth date</label>
                    <InputForm inputType="date" inputPlaceholder="" inputName="birthdate" inputId="birthdate" inputOnChange={handleChange} inputValue={formData.birthdate} />
                    <label htmlFor="username">Username</label>
                    <InputForm inputType="text" inputPlaceholder="Colocator79" inputName="username" inputId="username" inputOnChange={handleChange} inputValue={formData.username} />
                    <label htmlFor="password">Password</label>
                    <InputForm inputType="password" inputName="pwd" inputId="pwd" inputOnChange={handleChange} inputValue={formData.pwd} />
                    <label htmlFor="confpassword">Confirm Password</label>
                    <InputForm inputType="password" inputName="confpwd" inputId="confpwd" inputOnChange={handleChange} />
                    <ButtonForm buttonName={"Sign up"}></ButtonForm>
                </form>
            </div>
        </div>
    )
}