import {useContext, useEffect, useState} from "react";
import {FormModifyProfile} from "../Components/Forms/FormModifyProfile.jsx";
import {FormModifyPassword} from "../Components/Forms/FormModifyPassword.jsx";
import {MessageStateContext} from "../Utils/Context.jsx";

export const Profile = () => {

    const {setSuccessPop, setErrorPop, setErrorMessage, setSuccessMessage} = useContext(MessageStateContext)


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

    const handleDeleteAccount = () => {
        fetch(`http://localhost:1200/delete_account?id_roommate=${sessionStorage.userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status !== 200) {
                    setErrorPop(true);
                    setErrorMessage(data.data[0]);
                    return;
                }
                setSuccessPop(true);
                setSuccessMessage(`You successfully deleted your account !`);
                sessionStorage.clear();
                window.location.reload();
            })
    }


    const handleChange = (e) => {

        if (e.target.name === "conf_pwd" || e.target.name === "new_pwd" || e.target.name === "old_pwd") {
            setPwdFormData(current => ({...current, [e.target.name]: e.target.value}));
            return;
        }
        setFormData(current => ({...current, [e.target.name]: e.target.value}));
    }

    return (<>
        <div className="h-full min-h-screen bg-white">
            <div>
                <h1 className="text-3xl text-indigo-500">Profile</h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className=" justify-center w-full p-4 md:py-4 md:px-16 ">
                    <FormModifyProfile formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
                </div>
                <div className="flex flex-col w-full p-4 md:py-4 md:px-16 ">
                    <FormModifyPassword pwdFormData={pwdFormData} handleChange={handleChange}
                                        handleSubmitPwd={handleSubmitPwd}/>
                    <div className={"w-full h-full p-4 mt-12 rounded-xl shadow-lg"}>
                        <h1 className={"pb-4 text-xl text-red-600 text-center sm:pb-0"} >Danger Zone</h1>
                        <div className={"h-full flex justify-center items-center"}>
                            <button onClick={handleDeleteAccount}
                                className={"p-3 font-semibold bg-red-600 text-white rounded-lg hover:bg-red-500"} type={"button"}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}