import {useContext, useState} from "react";
import {ButtonForm} from "../Components/ButtonForm.jsx";
import {InputForm} from "../Components/InputForm.jsx";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {MessageStateContext} from "../Utils/Context.jsx";
import {API_URL} from "../Constants/Constants.jsx";
export const Signin = ({ setIsLogged }) => {

    const { setErrorPop,setErrorMessage} = useContext(MessageStateContext);

    const [formData, setFormData] = useState({username: "", pwd: ""});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}login`, {
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
                    if(data?.data[0]?.id) {
                        setIsLogged(true);
                        // je créer un faux token, pas le temps de faire un jwt pour ce projet repris rapidement
                        sessionStorage.setItem("token", data.data[0].id + data.data[0].username + data.data[0].email);
                        sessionStorage.setItem("userId", data.data[0].id);
                        navigate("/");
                        return;
                    }
                    setErrorMessage("Problem to fetch data from the server, please try again later !");
                    setErrorPop(true);
                }
            )
    }

    const handleChange = (e) => {
        setFormData(current => ({...current, [e.target.name]: e.target.value}));
    }

    return (<>
        <div className="h-full min-h-screen bg-white">
            <h1 className="text-3xl text-indigo-500 pb-5">Signin</h1>
            <p className="text-gray-600">
                To test the app signin with:
                <ul>
                    <li>Username : nass79</li>
                    <li>Password : nass</li>
                </ul>
            </p>
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