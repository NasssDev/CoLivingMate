import React, {useEffect, useState} from "react";
import {MyFlatsharesCard} from "../Components/MyFlatsharesCard.jsx";
import {Link} from "react-router-dom";

export const MyFlatshares = () => {

    const [userId] = useState(sessionStorage.userId);

    const [myFlatshares, setMyFlatshares] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:1200/select_roommate_flatshares?id_roommate=${userId}`)
            .then(res => res.json())
            .then(data => {
                    setMyFlatshares(data.data);
                }
            )
    }, []);

    return (
        <div className="h-full min-h-screen bg-white">
            <div className={"relative flex items-center justify-between"}>
                <h1 className="text-3xl text-indigo-500">My Flat shares</h1>
                <div className="group flex relative w-fit">
                    <Link to={"create"}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className={"rounded-md border-2 border-indigo-500 text-indigo-500 bg-white transition ease-in-out hover:text-white hover:bg-indigo-500 hover:cursor-pointer"}>
                            <path d="M5 12h14"/>
                            <path d="M12 5v14"/>
                        </svg>
                    </Link>
                    <span
                        className="group-hover:opacity-100 transition-opacity bg-gray-100 px-1 text-sm text-indigo-700 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 -mt-1 mx-auto">
                        Create flatshare
                    </span>
                </div>
            </div>
            <div className="flex flex-col flex-wrap gap-4 items-center">
                {myFlatshares.length !== 0 ? myFlatshares.map(flatshare => {
                        return <MyFlatsharesCard key={flatshare.id} flatshare={flatshare}/>
                    })
                    :
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl text-gray-600">You are not in any flatshare !</h1>
                        <a href="/myflatsharedetails/create" className="text-indigo-500 underline">Create one</a>
                    </div>
                }
            </div>
        </div>
    )
}