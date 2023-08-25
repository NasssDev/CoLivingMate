export const FeesList = ({ roommates, listClassName }) => {
    return (
        <ul className={`${listClassName} w-fit p-2 rounded-md mx-auto lg:w-fit md:w-fit sm:w-fit mt-2`}>
            {roommates?.map((roommate) => {
                return <li
                    className={` font-semibold p-1 border-b border-b-gray-500 text-center last:border-b-0`}
                    key={roommate.roommate_id}>{roommate?.roommate_firstname + " " + roommate?.roommate_lastname + " : "}
                    {roommate?.monthly_fees.map(fee => {
                        return <p key={fee.fee_id}
                            className={`font-normal text-sm text-gray-700`}>{fee.fee_name + " : " + fee.fee_amount + " €"}</p>
                    })}
                </li>
            })}
        </ul>
    )
}