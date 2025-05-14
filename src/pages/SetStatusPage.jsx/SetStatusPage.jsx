import { Smile } from 'lucide-react'
import React from 'react'

function SetStatusPage() {
    return (
        <>
            <div className='w-full h-screen overflow-hidden'>
                <div className='mt-20 pl-10 pr-10'>

                    <div>
                        <h1 className='text-2xl font-bold font-[poppins] mb-5'>Set Your Status</h1>

                        <div className="join">
                            <div>
                                <span className="input join-item">
                                    <input type="text" className='text-gray-600' placeholder="Eg. Focusing" required />
                                </span>
                            </div>
                            <button className="btn btn-square">
                                <Smile/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SetStatusPage
