import { User, Check, CircleX } from 'lucide-react'
import React, { use } from 'react'
import { userAuthStore } from '../../store/userAuthStore'
import { userFriendRequestStore } from '../../store/userFriendRequestStore'

function UserProfile() {

    const { user } = userAuthStore()
    const { isLoading, getReceivedRequests, receivedRequests, getSentRequests, sentRequests, respondToFriendRequest, cancelFriendRequest } = userFriendRequestStore()

    return (
        <>
            <div className='w-full h-screen'>
                <div className='pt-[100px] pl-10 pr-10'>
                    {/* top card - user info */}
                    <div className='w-full bg-red-300 p-4 rounded-md'>
                        <div className='flex justify-center items-center'>
                            <User />
                            <h1>Profile</h1>
                        </div>
                        <div className='flex justify-center items-center text-center'>
                            <h3>{user?.userName} | {user?.firstName} {user?.lastName} | {user?.email}</h3>
                        </div>
                    </div>

                    {/* received requests */}
                    <button className='btn btn-primary' onClick={() => getReceivedRequests()}>Req: Received</button>
                    {
                        isLoading ? (
                            <div className='w-full flex justify-center mt-10'>
                                <span className="loading loading-spinner text-primary"></span>
                            </div>
                        ) : receivedRequests.length === 0 ? (
                            <div className='w-full flex justify-center mt-10'>
                                <p className='font-roboto text-sm opacity-60'>No profile found!</p>
                            </div>
                        ) : receivedRequests.map((profile) => (
                            <>
                                <div key={profile?._id} className='w-full flex justify-center p-2'>
                                    <div className='flex p-4 bg-base-200 rounded-box w-full max-w-md justify-between items-center shadow-md'>
                                        <div>
                                            <h1 className='font-bold text-sm font-roboto lowercase'>{profile?.from.userName}</h1>
                                            <div className='flex flex-col sm:flex-row mt-2'>
                                                <p className='font-medium text-xs font-roboto sm:mr-2 capitalize'>{profile?.from?.firstName} {profile?.from?.lastName}</p>
                                                <p className='font-medium text-xs font-roboto sm:ml-2 lowercase'>{profile?.from?.email}</p>
                                            </div>
                                        </div>
                                        <button className="btn btn-sm btn-soft btn-success" aria-label="Accept User" onClick={() => respondToFriendRequest(profile?.from?._id, "accept")}>
                                            <Check size={15} />
                                        </button>
                                        <button className="btn btn-sm btn-soft btn-error" aria-label="Cancel User" onClick={() => respondToFriendRequest(profile?.from?._id, "reject")}>
                                            <CircleX size={15} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))
                    }

                    {/* Sent request */}
                    <button className='btn btn-primary' onClick={() => getSentRequests()}>Req: Sent</button>
                    {
                        isLoading ? (
                            <div className='w-full flex justify-center mt-10'>
                                <span className="loading loading-spinner text-primary"></span>
                            </div>
                        ) : sentRequests.length === 0 ? (
                            <div className='w-full flex justify-center mt-10'>
                                <p className='font-roboto text-sm opacity-60'>No profile found!</p>
                            </div>
                        ) : sentRequests.map((profile) => (
                            <>
                                <div key={profile?._id} className='w-full flex justify-center p-2'>
                                    <div className='flex p-4 bg-base-200 rounded-box w-full max-w-md justify-between items-center shadow-md'>
                                        <div>
                                            <h1 className='font-bold text-sm font-roboto lowercase'>{profile?.to?.userName}</h1>
                                            <div className='flex flex-col sm:flex-row mt-2'>
                                                <p className='font-medium text-xs font-roboto sm:mr-2 capitalize'>{profile?.to?.firstName} {profile?.to?.lastName}</p>
                                                <p className='font-medium text-xs font-roboto sm:ml-2 lowercase'>{profile?.to?.email}</p>
                                            </div>
                                        </div>
                                        <button className="btn btn-sm btn-soft btn-error" aria-label="Cancel User" onClick={() => cancelFriendRequest(profile?.to?._id)}>
                                            <CircleX size={15} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default UserProfile