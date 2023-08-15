export const ButtonForm = ({buttonName}) => {
    return (
        <button type="submit" className="w-full py-2 mt-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40">{buttonName}</button>
    )
}