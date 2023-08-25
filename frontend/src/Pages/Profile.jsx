import {useContext, useEffect, useState} from "react";
import {SuccessPop} from "../Components/Popup/SuccessPop.jsx";
import {ErrorPop} from "../Components/Popup/ErrorPop.jsx";
import {FormModifyProfile} from "../Components/Forms/FormModifyProfile.jsx";
import {FormModifyPassword} from "../Components/Forms/FormModifyPassword.jsx";
import {MessageStateContext} from "../Utils/Context.jsx";

export const Profile = () => {

    const {successPop, setSuccessPop, errorPop, setErrorPop, errorMessage,setErrorMessage,setSuccessMessage,successMessage} = useContext(MessageStateContext)


    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        username: "",
    });

    const [pwdFormData, setPwdFormData] = useState({
        old_pwd: "",
        new_pwd: "",
        conf_pwd: ""
    });

    useEffect(() => {
        fetch(`http://localhost:1200/get_roommate?id_roommate=${sessionStorage.userId}`)
            .then(res => res.json())
            .then(data => {
                setFormData(() => ({...data.data}));
            })


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:1200/update_roommate", {
            method: 'POST',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded"
            }),
            credentials: "include",
            body: new URLSearchParams({
                ...formData,
                id_roommate: sessionStorage.userId
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status !== 200) {
                    setErrorMessage("ERROR => ", data.data);
                    setErrorPop(true);
                    return;
                }
                setSuccessMessage(data.data);
                setSuccessPop(true);
            })
    }

    const handleSubmitPwd = (e) => {
        e.preventDefault();
        if (pwdFormData.new_pwd !== pwdFormData.conf_pwd) {
            setErrorMessage("New Password and Confirm Password are not the same !");
            setErrorPop(true);
            return;
        }
        fetch("http://localhost:1200/change_pwd", {
            method: 'POST',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded"
            }),
            credentials: "include",
            body: new URLSearchParams({
                ...pwdFormData,
                id_roommate: sessionStorage.userId
            })
        })
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        setErrorMessage(data.data[0]);
                        setErrorPop(true);
                        return;
                    }
                    setSuccessPop(true);
                    setSuccessMessage(data.data[0]);
                    setPwdFormData({
                        old_pwd: "",
                        new_pwd: "",
                        conf_pwd: ""
                    });
                }
            )
    }


    const handleChange = (e) => {

        if (e.target.name === "conf_pwd" || e.target.name === "new_pwd" || e.target.name === "old_pwd") {
            setPwdFormData(current => ({...current, [e.target.name]: e.target.value}));
            return;
        }
        setFormData(current => ({...current, [e.target.name]: e.target.value}));
    }

    const closePopup = () => {
        setSuccessPop(false);
        setErrorPop(false);
    }

    return (<>
        {!!successPop &&
            <div onClick={closePopup} className={"inset-0 flex items-end justify-center fixed mb-2"}><SuccessPop
                setSuccessPop={setSuccessPop} message={successMessage}/></div>}
        {!!errorPop &&
            <div onClick={closePopup} className={"inset-0 flex items-end justify-center fixed mb-2 "}>
                <ErrorPop setSuccessPop={setErrorPop} message={errorMessage}/>
            </div>}

        <div className="h-full min-h-screen bg-white">
            <div>
                <h1 className="text-3xl text-indigo-500">Profile</h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className=" justify-center w-full p-4 md:w-1/2">
                    <FormModifyProfile formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
                </div>
                <div className="w-full p-4 md:w-1/2">
                    <FormModifyPassword pwdFormData={pwdFormData} handleChange={handleChange}
                                        handleSubmitPwd={handleSubmitPwd}/>
                </div>
            </div>
        </div>
    </>)
}