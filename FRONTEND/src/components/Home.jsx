import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonalNavbar from './PersonalNavbar';
import ClickableCard from './ClickableCard';
import MoneySlider from './MoneySlider';


export default function Home() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate()
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
      if (error.response?.statusCode >= 500 || error.stack) {
        navigate("/500")
      }
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "An unexpected error occurred");
    }
  }
  useEffect(() => {
    fetchUser();
  }, [])

  function handleOption(url){
    setIsDialogOpen(true)
  }

  return (
    <div>
      <MoneySlider isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>
      {
        user &&
        (<div className='bg-gradient-to-br from-gray-900 via-teal-800 to-gray-900'>
          <PersonalNavbar userImage={user.avatar} />
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
            <ClickableCard type={"Add Money"} icon={"/currency.png"} onClick={handleOption} url={"/add-money"}/>
            <ClickableCard type={"Fund Transfer"} icon={"/mobile-transfer.png"} onClick={handleOption} url={"/add-money"}/>
            <ClickableCard type={"Transaction History"} icon={"/passbook.png"} onClick={handleOption} url={"/add-money"}/>
            <ClickableCard type={"Show all Benificary"} icon={"/customer.png"} onClick={handleOption} url={"/add-money"}/>
            <ClickableCard type={"Show all Transaction"} icon={"/passbook.png"} onClick={handleOption} url={"/add-money"}/>
            <ClickableCard type={"Notificaion"} icon={"/notifications.png"} onClick={handleOption} url={"/add-money"}/>
          </div>
        </div>)
      }
    </div>
  )
}
