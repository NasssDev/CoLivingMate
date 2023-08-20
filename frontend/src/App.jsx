import {Routes, Route} from "react-router-dom";
import {Home} from "./Pages/Home";
import {Navbar} from "./Layouts/Navbar.jsx";
import {Signin} from "./Pages/Signin.jsx";
import {Signup} from "./Pages/Signup.jsx";
import {useEffect, useState} from "react";
import AuthRequired from "./Auth/AuthRequired.jsx";
import {FlatshareDetails} from "./Pages/FlatshareDetails.jsx";
import {MyFlatshares} from "./Pages/MyFlatshares.jsx";
import {MyFlatshareDetails} from "./Pages/MyFlatshareDetails.jsx";

function App() {

    const [isLogged, setIsLogged] = useState(!!sessionStorage.token);

    const [flatshares, setFlatshares] = useState([]);

    useEffect(() => {
        fetch("http://localhost:1200/select_all")
            .then(res => res.json())
            .then(data => {
                    console.log(data.data)
                    setFlatshares(data.data);
                }
            )
    }, [])

    return (
        <>
            {<Navbar isLogged={isLogged} setIsLogged={setIsLogged} />}
            <div className={` px-8 py-4 `}>
                <Routes>
                    <Route path="/" element={
                        <AuthRequired>
                            <Home flatshares={flatshares} />
                        </AuthRequired>
                    }/>
                    <Route path="/flatshare/:id" element={
                        <AuthRequired>
                            <FlatshareDetails flatshares={flatshares} />
                        </AuthRequired>
                    }/>
                    <Route path="/myflatshares" element={
                        <AuthRequired>
                            <MyFlatshares flatshares={flatshares} setFlatshares={setFlatshares} />
                        </AuthRequired>
                    }/>
                    <Route path="/myflatsharedetails/:id" element={
                        <AuthRequired>
                            <MyFlatshareDetails flatshares={flatshares} />
                        </AuthRequired>
                    }/>
                    <Route path="/signin" element={<Signin setIsLogged={setIsLogged}/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
