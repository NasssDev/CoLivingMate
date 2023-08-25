import {InputForm} from "../Components/InputForm.jsx";
import {ButtonForm} from "../Components/ButtonForm.jsx";
import {useContext, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {ErrorPop} from "../Components/Popup/ErrorPop.jsx";
import {SuccessPop} from "../Components/Popup/SuccessPop.jsx";
import {MessageStateContext} from "../Utils/Context.jsx";

export const Signup = () => {

    const {successPop, setSuccessPop, errorPop, setErrorPop, errorMessage,setErrorMessage,setSuccessMessage,successMessage} = useContext(MessageStateContext);


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

        fetch("http://localhost:1200/signup", {
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
                }
            )
    }

    const handleChange = (e) => {
        setFormData(current => ({...current, [e.target.name]: e.target.value}));
    }

    const closePopup = () => {
        setSuccessPop(false);
        setErrorPop(false);
    }

    return (
        <>
            {!!errorPop &&
                <div onClick={closePopup} className={"inset-0 flex items-end justify-center fixed mb-2 "}>
                    <ErrorPop setErrorPop={setErrorPop} message={errorMessage}/>
                </div>}
            {!!successPop &&
                <div onClick={closePopup} className={"inset-0 flex items-end justify-center fixed mb-2"}>
                    <SuccessPop setSuccessPop={setSuccessPop} message={successMessage}/>
                </div>}

            <h1 className="text-3xl text-indigo-500">Sign up</h1>
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