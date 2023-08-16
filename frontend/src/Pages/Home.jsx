import {useEffect, useState} from "react";
import {FlatshareCard} from "../Components/FlatshareCard.jsx";

export const Home = ({flatshares,setFlatshares}) => {

    return (
        <div className="h-full min-h-screen bg-white">
            <h1 className="text-3xl text-indigo-500">Home</h1>
            <div className="flex flex-row flex-wrap gap-4">
                {flatshares.map(flatshare => {
                    return <FlatshareCard key={flatshare.id} flatshare={flatshare}/>
                })}
            </div>
        </div>
    )
}