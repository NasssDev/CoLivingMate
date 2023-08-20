import {useEffect, useState} from "react";
import {MyFlatsharesCard} from "../Components/MyFlatsharesCard.jsx";

export const MyFlatshares = () => {

    const [userId] = useState(sessionStorage.userId);

    const [myFlatshares, setMyFlatshares] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:1200/select_roommate_flatshares?id_roommate=${userId}`)
            .then(res => res.json())
            .then(data => {
                    console.log("MY flatshares",data.data)
                    setMyFlatshares(data.data);
                }
            )
    }, []);

    return (
        <div className="h-full min-h-screen bg-white">
            <div>
                <h1 className="text-3xl text-indigo-500">My Flat shares</h1>
            </div>
            <div className="flex flex-col flex-wrap gap-4">
                {myFlatshares.map(flatshare => {
                    return <MyFlatsharesCard key={flatshare.id} flatshare={flatshare}/>
                })}
            </div>
        </div>
    )
}