import {Routes, Route} from "react-router-dom";
import {Home} from "./Pages/Home";
import {Navbar} from "./Layouts/Navbar.jsx";
import {Signin} from "./Pages/Signin.jsx";
import {Signup} from "./Pages/Signup.jsx";
function App() {

    return (
        <>
            <Navbar/>
            <div className={` px-8 py-4 `} >
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signin" element={<Signin/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
