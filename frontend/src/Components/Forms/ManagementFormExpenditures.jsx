export const ManagementFormExpenditures = ({roommates, setRoommates, setSuccessPop}) => {

            const [monthlyFee, setMonthlyFee] = useState([]);

            const [expenditure, setExpenditure] = useState([]);

            const [newFee, setNewFee] = useState({
                id: null,
                id_roommate: null,
                amount: null,
                date: null
            });

            const [newExpenditure, setNewExpenditure] = useState({
                id: null,
                id_roommate: null,
                amount: null,
                date: null
            });

            const [newRoommate, setNewRoommate] = useState({
                id: null,
                firstname: null,
                lastname: null,
                email: null,
                phone: null,
                id_flatshare: null,
                monthly_fees: null,
                expenditures: null
            });

            const [newRoommateFee, setNewRoommateFee] = useState({
                id: null,
                id_roommate: null,
                amount: null,
                date: null
            });
}