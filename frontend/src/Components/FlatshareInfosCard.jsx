export const FlatshareInfosCard = ({currentFlatshare,roommates}) => {
    return (
        <div className={"py-4"}>
            <svg fill="#8b5cf6" version="1.1"
                 viewBox="0 0 395.71 395.71" xmlSpace="preserve"
                 stroke="#8b5cf6" className={"float-left"} width="20" height="20">
                <path
                    d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
            </svg>
            <span
                className="text-gray-500 ml-2">{currentFlatshare.flat_share_address + " - " + currentFlatshare.flat_share_city + " - " + currentFlatshare.flat_share_zip_code} </span>
            <div className="mt-4 flex justify-between">
                <div>
                    <span className="text-gray-700">From: </span>
                    <span className="text-gray-500">{currentFlatshare.flat_share_start_date}</span>
                </div>
                <div>
                    <img src="/img/roommate.svg" alt="roommate"
                         className="w-10 h-10 rounded-full float-left mr-2"/>
                    <span className="text-gray-400 text-2xl">{roommates.length}</span>
                    <span className="text-gray-600 text-2xl">/6</span>
                </div>
            </div>
        </div>
    )
}