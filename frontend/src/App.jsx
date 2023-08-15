import {Routes, Route} from "react-router-dom";
import {Home} from "./Pages/Home";
import {Navbar} from "./Layouts/Navbar.jsx";
import {Signin} from "./Pages/Signin.jsx";

function App() {

    return (
        <>
            <Navbar/>
            <div className={` px-8 py-4 `} >
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signin" element={<Signin/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
