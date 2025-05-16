import { useEffect } from 'react'
import { userAuthStore } from '../../store/userAuthStore'
import { Link } from 'react-router-dom'
import { userStatusStore } from '../../store/userStatusStore'

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
                <div className='h-screen pt-[120px] pl-10 pr-10'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='text-4xl font-bold font-[poppins]'>Hello, {user?.firstName} {user.lastName} <span className='badge badge-soft badge-success'>Active</span></h1>
                        </div>
                        <Link to={"/set-status"} className='btn btn-primary font-[roboto]'>Set Status</Link>
                    </div>

                    {/* Current status */}
                    <div className='mt-20'>
                        <h1 className='font-bold text-sm font-[roboto]'>Your current status</h1>

                        {
                            userStatus ? (
                                <ul className="list bg-base-100 rounded-box shadow-md w-md mt-5">
                                    <li className="list-row">
                                        <div><img className="size-10 rounded-box" src={userStatus.emoji} /></div>
                                        <div>
                                            <div>{userStatus ? (userStatus?.status) : "No Status"}</div>
                                            <div className="text-xs capitalize font-semibold opacity-60">Start time: {userStatus.startTime} - End time: {userStatus.endTime}</div>
                                        </div>
                                        <button className="btn btn-soft btn-info">Edit</button>
                                    </li>
                                </ul>

                            ) : (
                                <ul className="list bg-base-100 rounded-box shadow-md w-md mt-5">
                                    <li className="list-row">
                                        <div>
                                            <div>You haven't set any status!</div>
                                        </div>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
