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

export const MyFlatsharesDetailsContext = createContext(null);

export const MyFlatsharesDetailsProvider = ({children}) => {

        const [infosModified, setInfosModified] = useState(false);

        return (
            <MyFlatsharesDetailsContext.Provider value={{infosModified, setInfosModified}}>
                {children}
            </MyFlatsharesDetailsContext.Provider>
        )
}

export const ImageLoaderContext = createContext(null);

export const ImageLoaderProvider = ({children}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    }
    const initLoader = (imageUrl) => {
        const preloadedImage = new Image();
        preloadedImage.onload = handleImageLoad;
        preloadedImage.src = imageUrl;
    }

    return (
        <ImageLoaderContext.Provider value={{imageLoaded, initLoader}}>
            {children}
        </ImageLoaderContext.Provider>
    )

}

