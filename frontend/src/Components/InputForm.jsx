export const InputForm = ({ inputName, inputType, inputPlaceholder, inputId, inputOnChange, inputValue, inputRequired=false }) => {
    return (
        <input required={inputRequired} type={inputType} placeholder={inputPlaceholder} id={inputId} name={inputName} onChange={inputOnChange} value={inputValue} className="w-full py-2 pl-2 pr-4 text-gray-700 bg-white border rounded-lg  focus:border-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-300" />
    )
}