export const ExpendituresList = ({ roommates, listClassName }) => {
    return (
        <ul className={`${listClassName} w-fit p-2 rounded-md mx-auto lg:w-fit md:w-fit sm:w-fit mt-2`}>
            {roommates?.map((roommate) => {
                return roommate?.expenditures !== null && <li
                    className={` font-semibold p-1 border-b border-b-gray-500 text-center last:border-b-0`}
                    key={roommate.roommate_id}>{roommate?.roommate_firstname + " " + roommate?.roommate_lastname + " : "}
                    {roommate?.expenditures.map(expenditure => {
                        return <p key={expenditure.expenditure_id}
                            className={`font-normal text-sm text-gray-700`}>{expenditure.expenditure_name + " : " + expenditure.expenditure_amount + " €"}</p>
                    })}
                </li>
            })}
        </ul>
    )
}