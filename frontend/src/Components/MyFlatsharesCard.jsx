import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {API_URL} from "../Constants/Constants.jsx";


export const MyFlatsharesCard = ({flatshare}) => {

    const [roommates, setRoommates] = useState([]);

    const [expenditure, setExpenditure] = useState([]);

    const [monthlyFee, setMonthlyFee] = useState([]);

    useEffect(() => {
    fetch(`${API_URL}select_all_roommate?id_flatshare=${flatshare.id}`)
            .then(res => res.json())
            .then(data => {
                    setRoommates(data.data);
                }
            )

        fetch(`${API_URL}get_month_fee?id_flatshare=${flatshare.id}`)
            .then(res => res.json())
            .then(data => {
                    setMonthlyFee(data.data);
                }
            )
    }, []);

    return (
        <div
            className="w-full max-w-sm md:max-w-full flex flex-col md:flex-row lg:flex-row flex-wrap bg-white rounded-lg shadow-lg my-4">
            <div className={"lg:w-1/3 md:w-1/3"}>
                <img src={`https://source.unsplash.com/400x200/?house,${flatshare.name}`} alt="house"
                     className="h-full rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"/>
            </div>
            <div className={"lg:w-2/3 md:w-2/3 flex flex-col md:flex-row lg:flex-row"}>
                <div className={"w-full p-4"}>
                    <p className={"text-xl text-gray-600 mb-6"}>Informations:</p>
                    <h3 className="font-semibold text-lg tracking-wide">{flatshare.name}</h3>
                    <p className="text-gray-500">{flatshare.address + " - " + flatshare.city + " - " + flatshare.zip_code} </p>
                    <div className="mt-4">
                        <span className="text-gray-700">Joined : </span>
                        <span className="text-gray-500">{flatshare.start_date}</span>
                    </div>
                </div>
                <div
                    className={"w-full p-4 border-t-2 border-t-indigo-200 md:border-l-2 md:border-t-0 md:border-l-indigo-200 lg:border-l-2 lg:border-t-0 lg:border-l-indigo-200"}>
                    <p className={"text-xl text-gray-600 mb-6"}>Roommates:</p>
                    <ul>
                        {roommates.map((roommate, index) => {
                            return <li key={index}>{roommate.firstname + " " + roommate.lastname}</li>
                        })}
                    </ul>
                </div>
                <div
                    className={"w-full p-4 border-t-2 border-t-indigo-200 md:border-l-2 md:border-t-0 md:border-l-indigo-200 lg:border-l-2 lg:border-t-0 lg:border-l-indigo-200"}>
                    <div>
                        <div className={"w-full flex flex-row justify-between"}>
                        <p className={"text-xl text-gray-600 mb-6"}>Monthly fee:</p><Link to={`/myflatsharedetails/${flatshare.id}`}
                                                                                          className=" text-indigo-500 underline hover:text-indigo-800">Details</Link>
                    </div>

                        <ul>
                            {monthlyFee.map((fee, index) => {
                                return <li key={index}>{fee.fee_name + " : " + fee.fee_amount + " €"}</li>
                            })
                            }
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}