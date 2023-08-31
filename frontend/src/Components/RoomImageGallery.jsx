import {useContext} from "react";
import {ImageLoaderContext} from "../Utils/Context.jsx";

export const RoomImageGallery = ({images, selectedImage, handleImageClick}) => {

    const {imageLoaded, initLoader} = useContext(ImageLoaderContext);

    initLoader(`https://source.unsplash.com/400x200/?house,room`);

    return (
        <div className="flex flex-col md:flex-row items-end mt-4">
            {!!imageLoaded ? <img src={selectedImage} alt="house"
                                  className="w-full rounded-md border border-gray-300 md:w-1/2 mx-auto md:mx-0 md:mr-4 mb-4 md:mb-0"/>
                :
                <div
                    className="w-full h-40 sm:h-80 animate-pulse bg-gray-300 rounded-md border border-gray-300 md:w-1/2 mx-auto md:mx-0 md:mr-4 mb-4 md:mb-0"></div>
            }
            <div className="flex flex-wrap justify-center">
                {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`thumbnail-${index}`}
                            className={`w-20 h-20 ${!imageLoaded && "animate-pulse bg-gray-300"} object-cover border-2 cursor-pointer m-1 ${selectedImage === image ? 'border-indigo-500' : ''}`}
                            onClick={() => handleImageClick(image)}
                        />
                    )
                )}
            </div>
        </div>
    )
}