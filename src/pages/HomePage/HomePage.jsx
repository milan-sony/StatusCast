import { useEffect } from 'react'
import { userAuthStore } from '../../store/userAuthStore'
import { Link } from 'react-router-dom'
import { userStatusStore } from '../../store/userStatusStore'
import { Edit2, Trash2 } from 'lucide-react'

function HomePage() {

    const { user } = userAuthStore()
    const { getStatus, userStatus } = userStatusStore()

    useEffect(() => {
        getStatus(user._id)
    }, [])

    console.log("user:, ", user)

    return (
        <>
            <div className="w-full h-screen overflow-hidden">
                <div className='h-screen pt-[100px] pl-10 pr-10'>
                    <div className='flex flex-col justify-center items-center sm:flex-row sm:justify-between text-center'>
                        <div>
                            <h1 className='text-xl sm:text-4xl font-bold font-[poppins] capitalize'>Hello, {user?.firstName} {user.lastName} <span className='badge badge-soft badge-success badge-xs'>Active</span></h1>
                        </div>
                        <div className='mt-3'>
                            <Link to={"/find-profile"} className='btn btn-primary btn-sm md:btn-md font-[roboto] mr-2'>Find Profile</Link>
                            <Link to={"/set-status"} className='btn btn-primary btn-sm md:btn-md font-[roboto]  ml-2'>Set Status</Link>
                        </div>
                    </div>

                    {/* Current status */}
                    <div className='mt-10'>

                        <h1 className='font-bold text-md mb-2 font-[roboto]'>Your current status</h1>
                        {
                            userStatus ? (

                                <div className='flex flex-col justify-center items-center text-center p-4 bg-base-100 rounded-box sm:w-md sm:flex-row sm:justify-between sm:text-left sm:items-center'>
                                    <div className='flex justify-center'>
                                        <img className="size-15 sm:size-10" src={userStatus.emoji} alt="emoji" />
                                    </div>
                                    <div className='mt-2'>
                                        <h1 className='font-bold text-sm font-roboto'>{userStatus?.status}</h1>
                                        <div className='flex flex-col sm:flex-row mt-2'>
                                            <p className='font-medium text-xs font-roboto sm:mr-2'>Start's from: {userStatus.startTime}</p>
                                            <p className='font-medium text-xs font-roboto sm:ml-2'>End's at: {userStatus.endTime}</p>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <button className="btn btn-sm btn-soft btn-info mr-2"><Edit2 size={15} /></button>
                                        <button className="btn btn-sm btn-soft btn-error ml-2"><Trash2 size={15} /></button>
                                    </div>
                                </div>

                            ) : (

                                <div className='flex flex-col justify-center items-center text-center p-4 bg-base-100 rounded-box sm:w-md sm:flex-row sm:justify-between sm:text-left sm:items-center'>
                                    <div className='flex justify-center'>
                                        <p className='font-roboto text-sm'>You haven't set any status!</p>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
