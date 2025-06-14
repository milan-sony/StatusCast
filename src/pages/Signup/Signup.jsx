import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { userAuthStore } from '../../store/userAuthStore'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

function Signup() {

    // Toggle password
    const [showPassword, setShowPassword] = useState(false)

    const { signup, isSigningUp } = userAuthStore()

    const [formData, setFormData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const validateForm = () => {
        const { userName, firstName, email, password } = formData;

        const usernameRegex = /^(?!.*\.\.)(?!.*\.$)(?!^\.)[a-z0-9._]{1,30}$/;

        if (!userName) {
            toast.error("Username is required");
            return false;
        }

        if (userName.length > 30) {
            toast.error("Username must be at most 30 characters");
            return false;
        }

        if (!/^[a-z0-9._]*$/.test(userName)) {
            toast.error("Only lowercase letters, numbers, dots, and underscores are allowed");
            return false;
        }

        if (userName.includes('..')) {
            toast.error("Username cannot contain consecutive dots.");
            return false;
        }

        if (userName.startsWith('.') || userName.endsWith('.')) {
            toast.error("Username cannot start or end with a dot.");
            return false;
        }

        if (!usernameRegex.test(userName)) {
            toast.error("Invalid username format");
            return false;
        }

        if (!/[a-z0-9]/.test(userName)) {
            toast.error("Username must contain at least one letter or number");
            return false;
        }

        if (/^\d+$/.test(userName)) {
            toast.error("Username cannot be only numbers");
            return false;
        }

        if (!firstName) {
            toast.error("First name is required");
            return false;
        }

        if (!/^[A-Za-z]+$/.test(firstName)) {
            toast.error("First name must contain only letters");
            return false;
        }

        if (formData.lastName && !/^[A-Za-z]+$/.test(formData.lastName)) {
            toast.error("Last name must contain only letters");
            return false;
        }

        if (!email) {
            toast.error("Email is required");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Invalid email address");
            return false;
        }

        if (!password) {
            toast.error("Password is required");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        return true;
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const isFormValid = validateForm()
        if (isFormValid === true) {
            signup(formData, navigate)
            console.log("Signup formData: ", formData)
        }
    }

    return (
        <div className="w-full h-screen bg-base-200">
            <div className="hero h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold font-[poppins]">Signup</h1>
                        <p className="py-6 font-[roboto]">
                            Get started with your free account!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body overflow-y-auto max-h-[300px] sm:max-h-[500px]">
                            <fieldset className="fieldset">
                                <label className="label font-[roboto]"><span className='text-red-500'>*</span>User Name</label>
                                <input type="text" className="input" placeholder="User Name" name='userName' value={formData.userName} onChange={handleChange} />
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
                                            <Loader2 className='animate-spin' />) : (
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
