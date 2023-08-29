export const RoomImageGallery = ({images,selectedImage,handleImageClick}) => {

        return (
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
        )
}