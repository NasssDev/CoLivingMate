import {useEffect, useState} from "react";
import {RoommatesList} from "../Components/RoommatesList.jsx";
import {FeesList} from "../Components/FeesList.jsx";
import {ExpendituresList} from "../Components/ExpendituresList.jsx";

export const MyFlatshareDetails = () => {

    const id_flatshare = window.location.pathname.split("/")[2];

    const [myFlatshare, setMyFlatshare] = useState([]);

    const [selectedImage, setSelectedImage] = useState(`https://source.unsplash.com/600x300/?house,${myFlatshare[0]?.flat_share_name || "house"}`);

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [roommateNumber, setRoommateNumber] = useState(0);

    const images = [
        `https://source.unsplash.com/600x300/?house,${myFlatshare[0]?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?bedroom,${myFlatshare[0]?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?big kitchen,${myFlatshare[0]?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?full living room,${myFlatshare[0]?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?luxury bathroom,${myFlatshare[0]?.flat_share_name}`
    ];

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        fetch(`http://localhost:1200/select_infos?id_flatshare=${id_flatshare}`)
            .then(res => res.json())
            .then(data => {
                setMyFlatshare(data.data);
                fetch(`http://localhost:1200/count_roommate?id_flatshare=${id_flatshare}`)
                    .then(res => res.json())
                    .then(data2 => {
                        setRoommateNumber(data2.data);
                    })
                }
            )
    }, []);

    const handleCollapse = () => {
        setIsCollapsed(current => !current);
        console.log("COLLAPSE", isCollapsed);
    }


    return (
        <div className="h-full min-h-screen bg-white">
            <h1 className="text-3xl text-indigo-500">My Flat Share Details</h1>
            <div className="mt-4">
                <h1 className="font-semibold text-xl tracking-wide">{myFlatshare[0]?.flat_share_name}</h1>
                <div className="flex flex-col md:flex-row items-end mt-4">
                    <img src={selectedImage} alt="house"
                         className="w-full rounded-md border border-gray-300 md:w-1/2 mx-auto md:mx-0 md:mr-4 mb-4 md:mb-0"/>
                    <div className="flex flex-wrap justify-center">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`thumbnail-${index}`}
                                className={`w-20 h-20 object-cover border-2 cursor-pointer m-1 ${selectedImage === image ? 'border-indigo-500' : ''}`}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                </div>
                <div className={"py-4"}>
                    <img src="/img/localisation.svg" alt="localisation" className={`float-left`}/>
                    <span
                        className="text-gray-500 ml-2">{myFlatshare[0]?.flat_share_address + " - " + myFlatshare[0]?.flat_share_city + " - " + myFlatshare[0]?.flat_share_zip_code} </span>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <span className="text-gray-700">Joined: </span>
                            <span className="text-gray-500">{myFlatshare[0]?.flat_share_start_date}</span>
                        </div>
                        <div>
                            <img src="/img/roommate.svg" alt="roommate"
                                 className="w-10 h-10 rounded-full float-left mr-2"/>
                            <span className="text-gray-400 text-2xl">{roommateNumber}</span>
                            <span className="text-gray-600 text-2xl">/6</span>
                        </div>
                    </div>
                </div>
                <hr className=" border-2 border-indigo-300 rounded-r-lg rounded-l-lg"/>
                <div className="py-4">
                    <div className="flex flex-row flex-wrap">
                        <div className="h-full w-full flex flex-col">
                            <div className={`grid sm:grid-cols-3 lg:grid-cols-4`}>
                                <div className={`flex flex-col items-center`}>
                                    <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Roommates list :</h1>
                                    <RoommatesList ListClassName={''} myFlatshare={myFlatshare}/>
                                </div>
                                <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
                                <div className={`flex flex-col sm:border-l-2 sm:border-l-gray-700 items-center`}>
                                    <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Monthly fees :</h1>
                                    <FeesList ListClassName={'text-center'} myFlatshare={myFlatshare}/>
                                </div>
                                <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
                                <div className={`flex flex-col sm:border-l-2 sm:border-l-gray-700  items-center`}>
                                    <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Expenditures :</h1>
                                    <ExpendituresList ListClassName={'text-center'} myFlatshare={myFlatshare}/>
                                </div>
                            </div>
                        </div>
                        <div className="h-full w-full flex flex-col">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}