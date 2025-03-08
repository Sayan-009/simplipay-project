import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonalNavbar from './PersonalNavbar';
import ClickableCard from './ClickableCard';
import MoneySlider from './MoneySlider';
import { userState } from '../stateManagement/userState';
import { useRecoilState } from 'recoil';
import TransferMoneyComponent from './TransferMoneyComponent';



export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMoneyTransferDialogOpen, setIsMoneyTransferDialogOpen] = useState(false);
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get("http://localhost:5000/api/v1/users/home",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data)
      setError("")
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          showToast(error.response?.data?.message, "error")
        }
        if (error.response.status >= 500) {
          navigate("/500")
        }
        console.error("Error:", error.response?.data || error.message);
      } else if (error.request) {
        showToast(error.request)

      } else {
        showToast(error.message, "error")
      }
    }
  }
  useEffect(() => {
    fetchUser();
  }, [])

  function handleTransaction(url) {
    setIsDialogOpen(true)
  }

  function handleMoneyTransfer(url){
    setIsMoneyTransferDialogOpen(true)
  }

  function handleUrl(url) {
    navigate(`${url}`)
  }

  return (
    <div>
      <MoneySlider isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      <TransferMoneyComponent isMoneyTransferDialogOpen={isMoneyTransferDialogOpen} setIsMoneyTransferDialogOpen={setIsMoneyTransferDialogOpen} />
      {
        user &&
        (<div className='bg-gradient-to-br from-gray-900 via-teal-800 to-gray-900'>
          <PersonalNavbar isHome={false} />
          <div className="p-5 flex flex-col gap-y-3 bg-gradient-to-br from-gray-900 via-cyan-700 to-gray-900 rounded-bl-3xl rounded-br-3xl">
            <div className='pb-5'>
              <p className="text-blue-400 text-3xl font-bold">Hello, {user.fullName}</p>
            </div>
            <div className='flex flex-col gap-y-3 sm:flex-row sm:gap-x-10 sm: justify-center'>
              <div className="flex p-8 flex-col gap-y-2 justify-center items-center rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl">
                <p className="text-blue-500 text-xl font-bold">Current Balance</p>
                <p className="text-fuchsia-500 text-xl">₹ {user.balance}</p>
              </div>
              <div className="flex p-8 flex-col gap-y-2 justify-center items-center rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl
">
                <p className="text-blue-500 text-xl font-bold">Your UPI Id</p>
                <p className="text-orange-400 text-xl">{user.upiId}</p>
              </div>
            </div>
          </div>
          {/* option */}
          <div className='flex flex-col gap-y-3 p-8 sm:flex-row sm:gap-x-10 sm:justify-center sm:flex-wrap '>
            <ClickableCard type={"Add Money"} icon={"/currency.png"} onClick={handleTransaction} url={"/add-money"} />
            <ClickableCard type={"Fund Transfer"} icon={"/mobile-transfer.png"} onClick={handleMoneyTransfer} url={"/transfer-money"} />
            <ClickableCard type={"Transaction History"} icon={"/passbook.png"} onClick={handleUrl} url={"/add-money"} />
            <ClickableCard type={"Show all Benificary"} icon={"/customer.png"} onClick={handleUrl} url={"/add-money"} />
            <ClickableCard type={"Show all Transaction"} icon={"/passbook.png"} onClick={handleUrl} url={"/add-money"} />
            <ClickableCard type={"Notificaion"} icon={"/notifications.png"} onClick={handleUrl} url={"/notification"} />
          </div>
        </div>)
      }
    </div>
  )
}
