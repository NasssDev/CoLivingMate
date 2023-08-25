import {createContext, useState} from "react";

export const MessageStateContext = createContext(null);

export const MessageStateProvider = ({children}) => {

    const [errorMessage, setErrorMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [successPop, setSuccessPop] = useState(false);

    const [errorPop, setErrorPop] = useState(false);

    const closePopup = () => {
        setSuccessPop(false);
        setErrorPop(false);
    }

    return (
        <MessageStateContext.Provider value={{closePopup, errorMessage, setErrorMessage, successMessage,setSuccessMessage,successPop,setSuccessPop,errorPop,setErrorPop}}>
            {children}
        </MessageStateContext.Provider>
    )
}


