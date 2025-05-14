import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { userAuthStore } from '../../store/authStore'

function HomePage() {

    const { user } = userAuthStore()

    console.log("user:, ", user)

    return (
        <>
            <div className="w-full h-screen overflow-hidden bg-base-200 ">
                <div className='h-screen pt-[120px] pl-10 pr-10'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='text-4xl font-bold font-[poppins]'>Hello, {user?.firstName} {user.lastName} <span className='badge badge-soft badge-success'>Active</span></h1>
                        </div>

                        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_5').showModal()} >Set Status</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>


                    </div>
                    {/* Current status */}
                    <div className='mt-20'>
                        <h1 className='font-bold text-sm font-[roboto]'>Your current status</h1>

                        <ul className="list bg-base-100 rounded-box shadow-md w-md mt-5">

                            <li className="list-row">
                                <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                                <div>
                                    <div>Dio Lupa</div>
                                    <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
                                </div>
                                <button className="btn btn-soft btn-info">Edit</button>

                            </li>

                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
