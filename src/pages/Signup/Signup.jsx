import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { userAuthStore } from '../../store/userAuthStore'
import { Eye, EyeOff } from 'lucide-react'

function Signup() {

    // Toggle password
    const [showPassword, setShowPassword] = useState(false)

    const { signup, isSigningUp } = userAuthStore()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const validateForm = () => {
        // Check for empty fields
        const { firstName, email, password } = formData // destructuring

        if (!firstName) {
            return toast.error("First name is required")
        }
        if (!email) {
            return toast.error("Email is required")
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return toast.error("Invalid email address")
        }
        if (!password) {
            return toast.error("Password is required")
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters")
        }

        return true
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const success = validateForm()
        if (success === true) {
            signup(formData, navigate)
        }
    }

    return (
        <div className="w-full h-screen overflow-hidden bg-base-200 flex flex-col">
            <div className="hero h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold font-[poppins]">Signup</h1>
                        <p className="py-6 font-[roboto]">
                            Get started with your free account!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="label font-[roboto]"><span className='text-red-500'>*</span>First Name</label>
                                <input type="text" className="input" placeholder="First Name" name='firstName' value={formData.firstName} onChange={handleChange} />
                                <label className="label font-[roboto]">Last Name</label>
                                <input type="text" className="input" placeholder="Last Name" name='lastName' value={formData.lastName} onChange={handleChange} />
                                <label className="label font-[roboto]"><span className='text-red-500'>*</span>Email</label>
                                <input type="email" className="input" placeholder="Email" name='email' value={formData.email} onChange={handleChange} />
                                <label className="label font-[roboto]"><span className='text-red-500'>*</span>Password</label>
                                <label className="input">
                                    <input type={showPassword ? "text" : "password"} placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                                    <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {/* toggle eye icon */}
                                        {showPassword ? (
                                            <Eye className='size-5' />
                                        ) : (
                                            <EyeOff className='size-5' />
                                        )}
                                    </span>
                                </label>
                                <div><a className="link link-hover font-[roboto]">Forgot password?</a></div>
                                <button className="btn btn-primary btn-sm md:btn-md font-[roboto]" onClick={handleSubmit} disabled={isSigningUp}>
                                    {
                                        isSigningUp ? (
                                            <span className='animate-pulse font-[roboto]'>Signing Up</span>
                                        ) : (
                                            "Signup"
                                        )
                                    }
                                </button>
                                <p className='mt-4 font-[roboto]'>
                                    Already have an account? <Link to={"/login"} className='link font-[roboto]'>Login</Link>
                                </p>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
