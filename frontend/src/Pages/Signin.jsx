import {useState} from "react";
import {ButtonForm} from "../Components/ButtonForm.jsx";
import {InputForm} from "../Components/InputForm.jsx";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {ErrorPop} from "../Components/Popup/ErrorPop.jsx";
export const Signin = (
    {
        setIsLogged,
        errorMessage,
        setErrorMesssage,
        errorPop,
        setErrorPop
    }) => {

    const [formData, setFormData] = useState({username: "", pwd: ""});

    const navigate = useNavigate();

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
                    if (data.status !== 200) {
                        setErrorMesssage(data.data[0]);
                        setErrorPop(true);
                        return;
                    }
                    if(data?.data[0]?.id) {
                        setIsLogged(true);
                        // je créer un faux token, pas le temps de faire un jwt pour ce projet repris rapidement
                        sessionStorage.setItem("token", data.data[0].id + data.data[0].username + data.data[0].email);
                        sessionStorage.setItem("userId", data.data[0].id);
                        navigate("/");
                        return;
                    }
                    setErrorPop("An error occured, please try again later");
                }
            )
    }

    const handleChange = (e) => {
        setFormData(current => ({...current, [e.target.name]: e.target.value}));
    }

    const closePopup = () => {
        setErrorPop(false);
    }

    return (<>
        {!!errorPop &&
            <div onClick={closePopup} className={"inset-0 flex items-end justify-center fixed mb-2 "}>
                <ErrorPop setErrorPop={setErrorPop} message={errorMessage}/>
            </div>}
        <div className="h-full min-h-screen bg-white">
            <h1 className="text-3xl text-indigo-500">Signin</h1>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-indigo-800">Happy to see you, welcome !</h3>
                <form method={"post"} onSubmit={handleSubmit} className={` w-64 py-6`}>
                    <label htmlFor="username">Username</label>
                    <InputForm  inputType="text" inputPlaceholder="Colocator79" inputName="username" inputId="username"
                              inputRequired={true} inputOnChange={handleChange} inputValue={formData.username}/>
                    <label htmlFor="password">Password</label>
                    <InputForm inputType="password" inputPlaceholder={"********"} inputName="pwd" inputId="pwd" inputOnChange={handleChange}
                              inputRequired={true} inputValue={formData.pwd}/>
                    <span>Not account yet ? </span><Link to="/signup" className="text-indigo-500 underline">Sign
                    up</Link>
                    <ButtonForm buttonName={"Sign in"}></ButtonForm>
                </form>
            </div>
        </div>
    </>)
}