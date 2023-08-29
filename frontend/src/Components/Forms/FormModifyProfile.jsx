import {InputForm} from "../InputForm.jsx";
import {ButtonForm} from "../ButtonForm.jsx";

export const FormModifyProfile = ({formData, handleChange, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-md p-4 rounded-xl shadow-lg">
            <h1 className={"font-semibold text-lg"}>Modify your information</h1>
            <label htmlFor="firstname">Firstname</label>
            <InputForm inputRequired={true} inputType="text" inputPlaceholder="Jean-coloc"
                       inputName="firstname" inputId="firstname" inputOnChange={handleChange}
                       inputValue={formData.firstname}/>
            <label htmlFor="lastname">Lastname</label>
            <InputForm inputRequired={true} inputType="text" inputPlaceholder="Le mate" inputName="lastname"
                       inputId="lastname" inputOnChange={handleChange} inputValue={formData.lastname}/>
            <label htmlFor="email">Email</label>
            <InputForm inputRequired={true} inputType="email" inputPlaceholder="coliving@email.com"
                       inputName="email" inputId="email" inputOnChange={handleChange}
                       inputValue={formData.email}/>
            <label htmlFor="birthdate">Birth date</label>
            <InputForm inputRequired={true} inputType="date" inputPlaceholder="" inputName="birthdate"
                       inputId="birthdate" inputOnChange={handleChange} inputValue={formData.birthdate}/>
            <label htmlFor="username">Username</label>
            <InputForm inputRequired={true} inputType="text" inputPlaceholder="Colocator79"
                       inputName="username" inputId="username" inputOnChange={handleChange}
                       inputValue={formData.username}/>
            <ButtonForm buttonName={"Modify"}></ButtonForm>
        </form>
    )
}