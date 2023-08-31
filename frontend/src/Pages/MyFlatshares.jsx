import React, {useContext, useEffect, useState} from "react";
import {MyFlatsharesCard} from "../Components/MyFlatsharesCard.jsx";
import {Link} from "react-router-dom";
import {MessageStateContext} from "../Utils/Context.jsx";
import {API_URL} from "../Constants/Constants.jsx";

export const MyFlatshares = () => {

    const {setErrorMessage, setErrorPop} = useContext(MessageStateContext);

    const [dataLoaded, setDataLoaded] = useState(false);

    const [userId] = useState(sessionStorage.userId);

    const [myFlatshares, setMyFlatshares] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}select_roommate_flatshares?id_roommate=${userId}`)
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        setErrorMessage("Problem to fetch data from the server, please try again later !");
                        setErrorPop(true);
                        return;
                    }
                    setMyFlatshares(data.data);
                    setDataLoaded(true);
                }
            )
    }, []);

    return (
        !!dataLoaded && (
            <div className="h-full min-h-screen bg-white">
                <div className={"relative flex items-center justify-between"}>
                    <h1 className="text-3xl text-indigo-500">My Flat shares</h1>
                    <div className="group flex relative w-fit">
                        <Link to={"create"}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className={"rounded-md border-2 shadow-md border-amber-600 text-amber-600 bg-white transition ease-in-out hover:text-white hover:bg-amber-600 hover:cursor-pointer"}>
                                <path d="M5 12h14"/>
                                <path d="M12 5v14"/>
                            </svg>
                        </Link>
                        <span
                            className="group-hover:block transition-opacity bg-gray-100 px-1 text-sm text-amber-700 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full hidden -mt-1 mx-auto hover:hidden">
                        Create flatshare
                    </span>
                    </div>
                </div>
                {myFlatshares.length !== 0 ?
                    <div className="flex flex-col flex-wrap gap-4 items-center">
                        {myFlatshares.map(flatshare => {
                            return <MyFlatsharesCard key={flatshare.id} flatshare={flatshare}/>
                        })
                        }
                    </div>
                    :
                    <div className="h-80 flex items-center">

                        <h1 className="m-auto text-xl md:text-3xl text-gray-600 text-center">You are not in any flatshare
                            ! <br/><Link className={"text-amber-500 underline hover:text-amber-400"}
                                         to={"/myflatshares/create"}>Create one</Link> <strong>or</strong> <Link
                                className={"text-amber-500 underline hover:text-amber-400"} to={"/"}>Join one</Link> 😁</h1>
                    </div>
                }
            </div>
        ))
}