import {InputForm} from "../Components/InputForm.jsx";
import {ButtonForm} from "../Components/ButtonForm.jsx";
import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {MessageStateContext} from "../Utils/Context.jsx";
import {API_URL} from "../Constants/Constants.jsx";

export const Signup = () => {

    const {
        setSuccessPop,
        setErrorPop,
        setErrorMessage,
        setSuccessMessage,
    } = useContext(MessageStateContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        username: "",
        pwd: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.new_pwd !== formData.conf_pwd) {
            setErrorMessage("Password and Confirm Password are not the same !");
            setErrorPop(true);
            return;
        }

        fetch(`${API_URL}signup`, {
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
                    if (data.status !== 200) {
                        setErrorMessage(data.data[0]);
                        setErrorPop(true);
                        return;
                    }
                    setSuccessMessage("Your account has been successfully created, you can now sign in !");
                    setSuccessPop(true);
                    navigate("/signin");
                }
            )
    }

    const handleChange = (e) => {
        setFormData(current => ({...current, [e.target.name]: e.target.value}));
    }

    return (
        <>
            <h1 className="text-3xl text-indigo-500 pb-5">Sign up</h1>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className={` w-64 py-6`}>
                    <label htmlFor="firstname">Firstname</label>
                    <InputForm inputType="text" inputPlaceholder="Jean-coloc" inputName="firstname" inputId="firstname"
                               inputOnChange={handleChange} inputValue={formData.firstname}/>
                    <label htmlFor="lastname">Lastname</label>
                    <InputForm inputType="text" inputPlaceholder="Le mate" inputName="lastname" inputId="lastname"
                               inputOnChange={handleChange} inputValue={formData.lastname}/>
                    <label htmlFor="email">Email</label>
                    <InputForm inputType="email" inputPlaceholder="coliving@email.com" inputName="email" inputId="email"
                               inputOnChange={handleChange} inputValue={formData.email}/>
                    <label htmlFor="birthdate">Birth date</label>
                    <InputForm inputType="date" inputPlaceholder="" inputName="birthdate" inputId="birthdate"
                               inputOnChange={handleChange} inputValue={formData.birthdate}/>
                    <label htmlFor="username">Username</label>
                    <InputForm inputType="text" inputPlaceholder="Colocator79" inputName="username" inputId="username"
                               inputOnChange={handleChange} inputValue={formData.username}/>
                    <label htmlFor="password">Password</label>
                    <InputForm inputType="password" inputPlaceholder={"********"} inputName="pwd" inputId="pwd"
                               inputOnChange={handleChange} inputValue={formData.pwd}/>
                    <label htmlFor="confpassword">Confirm Password</label>
                    <InputForm inputType="password" inputPlaceholder={"********"} inputName="confpwd" inputId="confpwd"
                               inputOnChange={handleChange}/>
                    <span>Already have an account ? </span><Link to="/signin" className="text-indigo-500 underline">Sign
                    in</Link>
                    <ButtonForm buttonName={"Sign up"}></ButtonForm>
                </form>
            </div>
        </>
    )
}