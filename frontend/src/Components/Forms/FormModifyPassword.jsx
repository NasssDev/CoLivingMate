import {InputForm} from "../InputForm.jsx";
import {ButtonForm} from "../ButtonForm.jsx";

export const FormModifyPassword = ({pwdFormData, handleChange, handleSubmitPwd}) => {
    return (
        <form method={"post"} onSubmit={handleSubmitPwd}
              className="flex flex-col gap-4 max-w-md mx-auto p-4 rounded-xl shadow-lg">
            <h1 className={"font-semibold text-lg"}>Change your Password</h1>
            <label htmlFor="oldpassword">Old Password</label>
            <InputForm inputType="password" inputName="old_pwd" inputId="old_pwd" inputRequired={true}
                       inputPlaceholder={"********"} inputOnChange={handleChange} inputValue={pwdFormData.old_pwd}/>
            <label htmlFor="password">New Password</label>
            <InputForm inputType="password" inputName="new_pwd" inputId="new_pwd" inputRequired={true}
                       inputPlaceholder={"********"} inputOnChange={handleChange} inputValue={pwdFormData.new_pwd}/>
            <label htmlFor="confpassword">Confirm Password</label>
            <InputForm inputType="password" inputName="conf_pwd" inputId="confpwd" inputRequired={true}
                     inputPlaceholder={"********"}  inputOnChange={handleChange} inputValue={pwdFormData.conf_pwd}/>
            <ButtonForm buttonName={"Modify"}></ButtonForm>
        </form>
    )
}