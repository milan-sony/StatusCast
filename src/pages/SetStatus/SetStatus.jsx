import { Loader2, Smile } from 'lucide-react'
import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import toast from 'react-hot-toast'
import { userStatusStore } from '../../store/userStatusStore'
import { useNavigate } from 'react-router-dom'

function SetStatus() {
    const { setStatus, isStatusSet } = userStatusStore()
    const navigate = useNavigate()

    const [isPickerVisible, setPickerVisible] = useState(false)
    const [chosenEmoji, setChosenEmoji] = useState(null)

    const [isCurrentTimeChecked, setIsCurrentTimeChecked] = useState(false)


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
        if (!status) return toast.error("Status is required")
        if (!startTime) return toast.error("Start time is required")
        if (!endTime) return toast.error("End time is required")
        if (!chosenEmoji) return toast.error("Please set your mood")
        if (startTime === endTime) return toast.error("Start and end times must be different")
        return true
    }

    const formatTime = (timeValue) => {
        const [hour, minute] = timeValue.split(':')
        let hourInt = parseInt(hour, 10)
        let period = 'AM'

        if (hourInt >= 12) {
            period = 'PM'
            if (hourInt > 12) hourInt -= 12
        } else if (hourInt === 0) {
            hourInt = 12
        }

        const formattedHour = hourInt < 10 ? `0${hourInt}` : hourInt
        return `${formattedHour}:${minute} ${period}`
    }

    const getCurrentTime = () => {
        const now = new Date()
        const hours = now.getHours().toString().padStart(2, '0') // padStart() ensures two-digit formatting.
        const minutes = now.getMinutes().toString().padStart(2, '0')
        const currentTime = `${hours}:${minutes}`

        setFormData(prev => ({
            ...prev,
            startTime: currentTime
        }))

        /*
            prev => ({ ...prev, startTime: currentTime })
            This is a function passed to setFormData, where: prev represents the previous state (i.e., the old formData). { ...prev } is object spread syntax, which copies all the existing properties (status, startTime, endTime) into a new object. Then, startTime: currentTime overwrites the startTime property with the new value (currentTime).
        */
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isFormValid = validateForm()

        if (isFormValid === true) {
            const statusData = {
                emoji: chosenEmoji.target.src,
                status: formData.status,
                startTime: formatTime(formData.startTime),
                endTime: formatTime(formData.endTime)
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
        setIsCurrentTimeChecked(false)
    }

    return (
        <div className='w-full h-screen'>
            <div className='pl-10 pr-10 pt-[100px]'>
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
                                                alt="emoji"
                                            />
                                        ) : (
                                            <Smile />
                                        )
                                    }
                                </button>
                            </fieldset>
                        </div>

                        {isPickerVisible && (
                            <div>
                                <EmojiPicker onEmojiClick={onEmojiClick} theme='auto' lazyLoadEmojis={false} width="400px" height="400px" />
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
                                <label className="label mt-1">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-xs"
                                        checked={isCurrentTimeChecked}
                                        onChange={(e) => {
                                            setIsCurrentTimeChecked(e.target.checked)
                                            if (e.target.checked) getCurrentTime()
                                        }}
                                    />
                                    Current time
                                </label>
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
                                <button className="btn btn-primary" onClick={handleSubmit} disabled={isStatusSet}>
                                    {isStatusSet ? <Loader2 className='animate-spin' /> : "Set status"}
                                </button>
                            </div>
                            <div className='mt-5'>
                                <button className="btn btn-soft btn-primary" onClick={clearStatus}>Clear Status</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetStatus
