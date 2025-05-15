import { Smile } from 'lucide-react'
import React from 'react'

function SetStatusPage() {
    return (
        <>
            <div className='w-full h-screen overflow-hidden'>
                <div className='mt-20 pl-10 pr-10'>

                    <div className='flex flex-col justify-center items-center'>

                        <div className='p-10 rounded-md shadow-2xl'>

                            <h1 className='text-2xl font-bold font-[poppins] mb-5'>Set Your Status</h1>

                            <div className='mt-2'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Set your mood</legend>
                                    <button className="btn btn-soft btn-warning btn-block"><Smile /></button>
                                </fieldset>
                            </div>

                            <div className='mt-2'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Status</legend>
                                    <input type="text" className="input sm:w-sm" placeholder="What's your status?" />
                                </fieldset>
                            </div>

                            <div className='mt-2'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Start time</legend>
                                    <input type="time" className="input sm:w-sm" />
                                </fieldset>
                            </div>

                            <div className='mt-2'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">End time</legend>
                                    <input type="time" className="input sm:w-sm" />
                                </fieldset>
                            </div>

                            <div className='flex justify-between'>
                                <div className='mt-5'>
                                    <button className="btn btn-primary">Set Status</button>
                                </div>
                                <div className='mt-5'>
                                    <button className="btn btn-soft btn-primary">Clear Status</button>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default SetStatusPage
