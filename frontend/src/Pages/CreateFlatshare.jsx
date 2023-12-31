import {useContext, useState} from "react";
import {InputForm} from "../Components/InputForm.jsx";
import {ButtonForm} from "../Components/ButtonForm.jsx";
import {MessageStateContext} from "../Utils/Context.jsx";
import {useNavigate} from "react-router-dom";
import {API_URL} from "../Constants/Constants.jsx";

export const CreateFlatshare = () => {

    const { setSuccessPop, setErrorPop, setErrorMessage,setSuccessMessage} = useContext(MessageStateContext)

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        start_date: "",
        end_date: "",
        city: "",
        zip_code: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}create_flatshare`, {
            method: 'POST',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded"
            }),
            credentials: "include",
            body: new URLSearchParams({
                ...formData,
                id_creator: sessionStorage.userId
            })
        })
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        setErrorMessage(data.message);
                        setErrorPop(true);
                        return;
                    }
                    setSuccessMessage("Your flatshare has been successfully created, you can now invite people !");
                    setSuccessPop(true);
                    navigate(`myflatsharedetails/${data.data.id}`);
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
            <h1 className="text-3xl text-indigo-500">Create Flatshare</h1>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className={` w-64 py-6`}>
                    <label htmlFor="name">Name</label>
                    <InputForm inputType="text" inputPlaceholder="The Best Coliving" inputName="name"
                              inputRequired={true} inputId="name"
                               inputOnChange={handleChange} inputValue={formData.name}/>
                    <label htmlFor="address">Address</label>
                    <InputForm inputType="text" inputPlaceholder="6 rue de la liberté" inputName="address"
                               inputRequired={true} inputId="address"
                               inputOnChange={handleChange} inputValue={formData.address}/>
                    <label htmlFor="city">City</label>
                    <InputForm inputType="text" inputPlaceholder="Niort" inputName="city" inputId="city"
                               inputRequired={true} inputOnChange={handleChange} inputValue={formData.city}/>
                    <label htmlFor="zip_code">Zip Code</label>
                    <InputForm inputType="text" inputPlaceholder={"79000"} inputName="zip_code"
                               inputRequired={true} inputId="zip_code"
                               inputOnChange={handleChange} inputValue={formData.zip_code}/>
                    <label htmlFor="start_date">Start Date</label>
                    <InputForm inputType="date" inputName="start_date" inputId="start_date"
                               inputRequired={true} inputOnChange={handleChange} inputValue={formData.start_date}/>
                    <label htmlFor="end_date">End Date (optional)</label>
                    <InputForm inputType="date" inputPlaceholder="" inputName="end_date" inputId="end_date"
                               inputRequired={true} inputOnChange={handleChange} inputValue={formData.end_date}/>
                    <ButtonForm buttonName={"Create"}></ButtonForm>
                </form>
            </div>
        </>
    )
}