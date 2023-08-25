export const FormModifyRoommates = ({roommates}) => {
    return (<>
            <div className=" flex flex-col items-start gap-1">
                {roommates.map((roommate, index) => {
                    return (<div key={index+"div"} className="w-full flex flex-row justify-between items-center">
                        <span key={index}>{`${roommate.roommate_firstname} ${roommate.roommate_lastname}`}</span>
                        <svg key={index+"svg"}
                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="rounded-md p-0.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <line x1="17" x2="22" y1="8" y2="13"/>
                            <line x1="22" x2="17" y1="8" y2="13"/>
                        </svg>
                    </div>)
                })}
            </div>
        </>
    )
}