export const RoommatesList = ({myFlatshare, listClassName}) => {
    return (
        <ul className={` ${listClassName} mt-2 w-fit p-2 rounded-md mx-auto `}>
            {myFlatshare?.map((flatshare) => {
                return <li
                    className={`font-semibold p-1 border-b border-b-gray-500 text-center last:border-b-0`}
                    key={flatshare.roommate_id}>{flatshare?.roommate_firstname + " " + flatshare?.roommate_lastname+ " : "}
                    <p className={"font-normal text-sm text-gray-700"}>
                        {"email : "+flatshare?.roommate_email}
                        <br/>
                        {"birth date : "+flatshare?.roommate_birthdate}
                        <br/>
                        {"Joined : "+flatshare?.roommate_joindate}
                    </p>
                </li>
            })}
        </ul>
    )
}