import {useEffect, useState} from "react";

export const FlatshareDetails = ({flatshares}) => {

    const id = window.location.pathname.split("/")[2];
    const [currentFlatshare, setCurrentFlatshare] = useState(flatshares.find(flatshare => Number(flatshare.id) === Number(id)));

    const [selectedImage, setSelectedImage] = useState(`https://source.unsplash.com/600x300/?house,${currentFlatshare.name}`);

    const images = [
        `https://source.unsplash.com/600x300/?house,${currentFlatshare.name}`,
        `https://source.unsplash.com/600x300/?bedroom,${currentFlatshare.name}`,
        `https://source.unsplash.com/600x300/?big kitchen,${currentFlatshare.name}`,
        `https://source.unsplash.com/600x300/?full living room,${currentFlatshare.name}`,
        `https://source.unsplash.com/600x300/?luxury bathroom,${currentFlatshare.name}`
    ];

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };


    return (
        <div className="h-full min-h-screen bg-white">
            <h1 className="text-3xl text-indigo-500">Flatshare Details</h1>
            <div className="mt-4">
                <h1 className="font-semibold text-xl tracking-wide">{currentFlatshare.name}</h1>
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
                    <svg fill="#8b5cf6" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 395.71 395.71" xml:space="preserve"
                         stroke="#8b5cf6" className={"float-left"} width="20" height="20"><path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/></svg>
                    <span
                        className="text-gray-500 ml-2">{currentFlatshare.address + " - " + currentFlatshare.city + " - " + currentFlatshare.zip_code} </span>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <span className="text-gray-700">From: </span>
                            <span className="text-gray-500">{currentFlatshare.start_date}</span>
                        </div>
                        <div>
                            <img src="/img/roommate.svg" alt="roommate"
                                 className="w-10 h-10 rounded-full float-left mr-2"/>
                            <span className="text-gray-400 text-2xl">{Math.floor(Math.random() * 5) + 1}</span>
                            <span className="text-gray-600 text-2xl">/6</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}