import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {RoomImageGallery} from "../Components/RoomImageGallery.jsx";
import {FlatshareInfosCard} from "../Components/FlatshareInfosCard.jsx";
import {API_URL} from "../Constants/Constants.jsx";

export const FlatshareDetails = () => {

    const {id_flatshare} = useParams();

    const [currentFlatshare, setCurrentFlatshare] = useState({});

    const [roommates, setRoommates] = useState([]);

    const [emailOwner, setEmailOwner] = useState("");

    const images = [
        `https://source.unsplash.com/600x300/?house,${currentFlatshare.flat_share_name}`,
        `https://source.unsplash.com/600x300/?bedroom,${currentFlatshare.flat_share_name}`,
        `https://source.unsplash.com/600x300/?big kitchen,${currentFlatshare.flat_share_name}`,
        `https://source.unsplash.com/600x300/?full living room,${currentFlatshare.flat_share_name}`,
        `https://source.unsplash.com/600x300/?luxury bathroom,${currentFlatshare.flat_share_name}`
    ];

    const [selectedImage, setSelectedImage] = useState(`https://source.unsplash.com/600x300/?house,${currentFlatshare.flat_share_name}`);

    const [dataLoaded, setDataLoaded] = useState(false);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        fetch(`${API_URL}select_infos?id_flatshare=${id_flatshare}`)
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        console.error('Error :', data.data[0]);
                        return;
                    }
                    setCurrentFlatshare(data.data[0]);
                    setRoommates(JSON.parse(data.data[0].roommates));
                    setDataLoaded(true);
                }
            )
    }, [])


    useEffect(() => {
        const emailOfOwner = roommates.find(roommate => roommate.roommate_role === 1)?.roommate_email;
        setEmailOwner(emailOfOwner);
        setSelectedImage(images[0]);
    }, [roommates])

    return (
        !!dataLoaded && (
            <div className="h-full min-h-screen bg-white">
                <h1 className="text-3xl text-indigo-500">Flat Share Details</h1>
                <div className="mt-4">
                    <h1 className="font-semibold text-xl tracking-wide">{currentFlatshare.flat_share_name}</h1>
                    <RoomImageGallery images={images} selectedImage={selectedImage}
                                      handleImageClick={handleImageClick}/>
                    <FlatshareInfosCard currentFlatshare={currentFlatshare} roommates={roommates}/>
                    <div>
                        <a href={`mailto:${emailOwner}`}
                           className="bg-indigo-500 text-lg text-white px-6 py-2 rounded-lg mt-4  hover:bg-indigo-600 transition duration-300">Send
                            a message</a>
                    </div>
                </div>
            </div>
        )
    )
}