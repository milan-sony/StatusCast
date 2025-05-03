import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router'

function SignupPage() {
    return (
        <>
            <div className="w-full h-screen overflow-hidden bg-base-200 flex flex-col">
                <Navbar />
                <div className="hero h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold font-[poppins]">Signup</h1>
                            <p className="py-6 font-[roboto]">
                                Get started with your free account!
                            </p>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <fieldset className="fieldset">
                                    <label className="label font-[roboto]">Username</label>
                                    <input type="text" className="input" placeholder="Username" />
                                    <label className="label font-[roboto]">First Name</label>
                                    <input type="text" className="input" placeholder="First Name" />
                                    <label className="label font-[roboto]">Last Name</label>
                                    <input type="text" className="input" placeholder="Last Name" />
                                    <label className="label font-[roboto]">Email</label>
                                    <input type="email" className="input" placeholder="Email" />
                                    <label className="label font-[roboto]">Password</label>
                                    <input type="password" className="input" placeholder="Password" />
                                    <div><a className="link link-hover font-[roboto]">Forgot password?</a></div>
                                    <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md font-[roboto]">Login</button>
                                    <p className='mt-4 font-[roboto]'>
                                        Already have an account? <Link to={"/login"} className='link font-[roboto]'>Login</Link>
                                    </p>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage
