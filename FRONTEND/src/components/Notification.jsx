import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { loadingState, notificatonState } from '../stateManagement/userState'
import { useToast } from './ToastContext'
import axios from 'axios'
import PersonalNavbar from './PersonalNavbar'

function Notificaion() {
    const [notificaion, setNotificaion] = useRecoilState(notificatonState)
    const [loading, setLoading] = useRecoilState(loadingState);
    const { showToast } = useToast();
    const fetchNotificaion = async () => {
        setLoading(false)
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get("http://localhost:5000/api/v1/users/get-notification", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setNotificaion(response.data.data || [])
            console.log(response.data.data)
        } catch (error) {
            if (error.response) {
                if (error.response.status >= 400 && error.response.status < 500) {
                    showToast(error.response?.data?.message, "error")
                }
                if (error.response.status >= 500) {
                    navigate("/500")
                }
            } else if (error.request) {
                showToast(error.request, "error")

            } else {
                showToast(error.message, "error")
            }
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchNotificaion();
    }, []);
    return (
        <div>
            <PersonalNavbar isHome={true}/>
            <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6'>
            {
                notificaion.length > 0 ? <div className='flex  items-center justify-center flex-col gap-5'>
                    {
                        
                        notificaion.map((notifi, index) => {
                            return <div>
                                <div className="p-5 text-white bg-slate-600" key={index}><p>{notifi.message}</p></div>
                            </div>
                        })
                    }
                </div> : <div className='flex justify-center items-center'>
                    <p className='text-red-950'>You have no notificaion</p>
                </div>
                
            }
        </div>
        </div>
        
    )
}

export default Notificaion