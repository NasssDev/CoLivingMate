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
import {Profile} from "./Pages/Profile.jsx";
import {Footer} from "./Components/Footer.jsx";
import {CreateFlatshare} from "./Pages/CreateFlatshare.jsx";
import {MessageStateProvider, MyFlatsharesDetailsProvider} from "./Utils/Context.jsx";

function App() {

    const [isLogged, setIsLogged] = useState(!!sessionStorage.token);

    const [flatshares, setFlatshares] = useState([]);

    useEffect(() => {
        fetch("http://localhost:1200/select_all")
            .then(res => res.json())
            .then(data => {
                    setFlatshares(data.data);
                }
            )
    }, [])

    return (
        <>
            <div className={"min-h-screen"}>
                {<Navbar isLogged={isLogged} setIsLogged={setIsLogged}/>}
                <div className={` px-8 py-4 `}>
                    <MessageStateProvider>
                        <Routes>
                            <Route path="/" element={
                                <AuthRequired>
                                    <Home flatshares={flatshares}/>
                                </AuthRequired>
                            }/>
                            <Route path="/flatshare/:id_flatshare" element={
                                <AuthRequired>
                                    <FlatshareDetails flatshares={flatshares}/>
                                </AuthRequired>
                            }/>
                            <Route path="/myflatshares" element={
                                <AuthRequired>
                                    <MyFlatshares flatshares={flatshares} setFlatshares={setFlatshares}/>
                                </AuthRequired>
                            }>
                            </Route>

                            <Route path="/myflatsharedetails/:id_flatshare" element={
                                <AuthRequired>
                                    <MyFlatsharesDetailsProvider>
                                        <MyFlatshareDetails flatshares={flatshares}/>
                                    </MyFlatsharesDetailsProvider>
                                </AuthRequired>
                            }>
                            </Route>


                            <Route path="myflatshares/create" element={
                                <AuthRequired>
                                    <CreateFlatshare/>
                                </AuthRequired>
                            }/>
                            />
                            <Route path="/profile" element={
                                <AuthRequired>
                                    <Profile/>
                                </AuthRequired>
                            }/>
                            <Route path="/signin"
                                   element={
                                       <Signin setIsLogged={setIsLogged}/>
                                   }
                            />
                            <Route path="/signup"
                                   element={
                                       <Signup/>
                                   }
                            />

                        </Routes>
                    </MessageStateProvider>
                </div>
            </div>
            <hr/>
            <Footer/>
        </>
    )
}

export default App
