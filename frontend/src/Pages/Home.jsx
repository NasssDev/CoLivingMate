import {useEffect, useState} from "react";
import {FlatshareCard} from "../Components/FlatshareCard.jsx";

export const Home = () => {

    const [flatshares, setFlatshares] = useState([]);

    useEffect(() => {
        fetch("http://localhost:1200/select_all")
            .then(res => res.json())
            .then(data => {
                    console.log(data)
                    setFlatshares(data.data);
                    setFlatshares(current => {
                        console.log("STATE ",current);
                        return current;
                    })
                }
            )
    }, [])

    return (
        <div className="h-full min-h-screen bg-white">
            <h1 className="text-3xl text-indigo-500">Home</h1>
            {flatshares.map(flatshare => { return <FlatshareCard key={flatshare.id} flatshare={flatshare}/>  })}
        </div>
    )
}