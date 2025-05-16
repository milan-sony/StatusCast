import { Smile } from 'lucide-react'
import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import toast from 'react-hot-toast'
import { userStatusStore } from '../../store/userStatusStore'
import { userAuthStore } from '../../store/userAuthStore'
import { useNavigate } from 'react-router-dom'

function SetStatusPage() {

    const { setStatus } = userStatusStore()
    const { user } = userAuthStore()

    const [isPickerVisible, setPickerVisible] = useState(false)
    const [chosenEmoji, setChosenEmoji] = useState(null)

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject)
        setPickerVisible(false)
    }

    const [formData, setFormData] = useState({
        status: "",
        startTime: "",
        endTime: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateForm = () => {
        const { status, startTime, endTime } = formData

        if (!status) {
            return toast.error("Status is required")
        }
        if (!startTime) {
            return toast.error("Start time is required")
        }
        if (!endTime) {
            return toast.error("End time is required")
        }

        if (!chosenEmoji) {
            return toast.error("Please set your mood")
        }

        return true
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const isFormValidate = validateForm()

        if (isFormValidate === true) {

            const statusData = {
                userId: user._id,
                emoji: chosenEmoji.target.src,
                status: formData.status,
                startTime: formData.startTime,
                endTime: formData.endTime
            }

            setStatus(statusData, navigate)
        }
    }

    const handleEmoji = () => {
        setPickerVisible(false)
    }

    const clearStatus = () => {
        setFormData({
            status: "",
            startTime: "",
            endTime: ""
        })
        setChosenEmoji(null)
        setPickerVisible(false)
    }

    return (
        <>
            <div className='w-full h-dvh overflow-hidden'>
                <div className='mt-20 pl-10 pr-10'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='p-10 rounded-md shadow-2xl'>
                            <h1 className='text-2xl font-bold font-[poppins] mb-5'>Set Your Status</h1>

                            <div className='mt-2'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Set your mood</legend>
                                    <button
                                        className="btn btn-soft btn-warning btn-block"
                                        onClick={() => setPickerVisible(!isPickerVisible)}
                                        aria-label="Select emoji"
                                    >
                                        {
                                            chosenEmoji ? (
                                                <img
                                                    style={{ width: "25px", height: "25px" }}
                                                    src={chosenEmoji.target.src}
                                                />
                                            ) :
                                                (
                                                    <Smile />
                                                )
                                        }
                                    </button>
                                </fieldset>
                            </div>

                            {isPickerVisible && (
                                <div>
                                    <EmojiPicker onEmojiClick={onEmojiClick} theme='auto' lazyLoadEmojis="false" width="400px" height="400px" />
                                </div>
                            )}

                            <div className='mt-2'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Status</legend>
                                    <input
                                        type="text"
                                        className="input sm:w-sm"
                                        placeholder="What's your status?"
                                        name='status'
                                        value={formData.status}
                                        onChange={handleChange}
                                        onClick={handleEmoji}
                                    />
                                </fieldset>
                            </div>

                            <div className='mt-2'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Start time</legend>
                                    <input
                                        type="time"
                                        className="input sm:w-sm"
                                        name='startTime'
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        onClick={handleEmoji}
                                    />
                                </fieldset>
                            </div>

                            <div className='mt-2'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">End time</legend>
                                    <input
                                        type="time"
                                        className="input sm:w-sm"
                                        name='endTime'
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        onClick={handleEmoji}
                                    />
                                </fieldset>
                            </div>

                            <div className='flex justify-between'>
                                <div className='mt-5'>
                                    <button className="btn btn-primary" onClick={handleSubmit}>Set Status</button>
                                </div>
                                <div className='mt-5'>
                                    <button className="btn btn-soft btn-primary" onClick={clearStatus}>Clear Status</button>
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
