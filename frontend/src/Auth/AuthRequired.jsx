import {Navigate} from "react-router-dom";

export default function AuthRequired(props) {
    if (sessionStorage.token) {
        return props.children
    } else {
        return <Navigate to={"/login"}/>
    }
}