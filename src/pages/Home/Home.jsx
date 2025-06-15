import { useEffect } from 'react'
import { userAuthStore } from '../../store/userAuthStore'
import { Link } from 'react-router-dom'
import { userStatusStore } from '../../store/userStatusStore'
import { Trash2 } from 'lucide-react'

function Home() {

    const { user } = userAuthStore()
    const { getStatus, userStatus, deleteStatus, getAllUsersStatus, allUserStatus } = userStatusStore()

    useEffect(() => {
        getStatus()
        getAllUsersStatus()
    }, [])

    console.log("user: ", user)

    const statusDelete = () => {
        deleteStatus()
    }

    return (
        <>
            <div className="w-full h-screen sm:overflow-hidden">
                <div className='pt-[100px] pl-10 pr-10'>
                    <div className='flex flex-col justify-center items-center sm:flex-row sm:justify-between text-center'>
                        <div>
                            <h1 className='text-xl sm:text-4xl font-bold font-[poppins]'> <span className='capitalize'>Hi {user?.firstName} </span> | <span>{user?.userName}</span> <span className='badge badge-soft badge-success badge-xs'>Online</span></h1>
                        </div>
                        <div className='mt-3'>
                            <Link to={"/search-profile"} className='btn btn-primary btn-soft btn-sm md:btn-md font-[roboto] mr-2'>Find Profile</Link>
                            <Link to={"/set-status"} className='btn btn-primary btn-sm md:btn-md font-[roboto]  ml-2'>Set Status</Link>
                        </div>
                    </div>
                    {/* Current status */}
                    <div className='mt-10'>
                        <h1 className='font-bold text-md mb-2 font-[roboto]'>Your status</h1>
                        <div className='w-full flex justify-center'>
                            {
                                userStatus ? (
                                    <div className='flex flex-col justify-center items-center text-center p-4 bg-base-200 rounded-box sm:w-md sm:flex-row sm:justify-between sm:text-left sm:items-center shadow-md'>
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
                                            <button className="btn btn-sm btn-soft btn-error" onClick={statusDelete}><Trash2 size={15} /></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='w-full flex justify-center'>
                                        <p className='font-roboto text-sm opacity-60'>You haven't set any status!</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {/* Others status  */}
                    <div className='mt-10'>
                        <h1 className='font-bold text-md mb-2 font-[roboto]'>Other's status</h1>
                        {
                            allUserStatus.length === 0 ? (
                                <div className='w-full flex justify-center'>
                                    <p className='font-roboto text-sm opacity-60'>No one has set any status yet!</p>
                                </div>
                            ) : (
                                allUserStatus.map((status) => (
                                    <div className='w-full max-h-[200px] overflow-y-auto p-2 flex justify-center'>
                                        <div className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
                                            <div className='flex flex-col justify-center items-center text-center p-4 bg-base-200 rounded-box sm:justify-between sm:w-sm sm:flex-row sm:text-left shadow-md' key={status._id}>
                                                <div className='flex justify-center'>
                                                    <img className="size-15 sm:size-10" src={status.emoji} alt="emoji" />
                                                </div>
                                                <div className='mt-2'>
                                                    <h1 className='font-bold text-md font-roboto'>{status?.userId?.firstName} {status?.userId?.lastName}</h1>
                                                    <h1 className='text-sm font-roboto'>{status?.status}</h1>
                                                    <div className='flex flex-col sm:flex-row mt-2'>
                                                        <p className='font-medium text-xs font-roboto sm:mr-2'>Start's from: {status.startTime}</p>
                                                        <p className='font-medium text-xs font-roboto sm:ml-2'>End's at: {status.endTime}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
