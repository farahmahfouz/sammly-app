import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { sendResetPasswordEmail } from '../utils/api/password';
import { toast } from 'react-hot-toast';

import ErrorIcon from '../icons/ErrorIcon';
import PageTitle from '../components/PageTitle';
import { IoIosLock } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";
import ArrowLeft from '../icons/ArrowLeft';

export default function ForgetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await sendResetPasswordEmail(data.email);
            toast.success("Check your email");
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Invalid email");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto border border-borderLight my-16 rounded-xl shadow-cardShadow">
            <PageTitle title="Forgot Password" />

            {/* Image Section */}
            <div className="md:order-1 flex justify-center items-center rounded-xl">
                <img
                    src="/forgetpassw.png"
                    alt="Sign Up"
                    className="w-full object-contain"
                />
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="md:order-2 p-5 rounded-xl flex flex-col justify-evenly gap-8.5">
                <div className='flex flex-col items-start'>
                    <span className='block bg-surfacePurple/50 rounded-full text-primary p-4'>
                        <IoIosLock className='size-6' />
                    </span>
                    <h1 className="text-center sm:text-start text-3xl text-textPrimary/90 font-bold">Forget Password</h1>
                    <p className='text-textSecondary tracking-tighter text-sm max-w-80'>No worries! Enter your email address and we’ll send you a link to reset your password.</p>
                </div>

                <div className="">

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-textPrimary">Email address</label>
                        <div className="relative">
                            <input
                                {...register("email", {
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                })}
                                type="email"
                                id="email"
                                className={`mt-1 block w-full px-3 py-2 border-b ${errors.email ? 'border-b-red-500' : 'border-b-gray-300'} rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-primary sm:text-sm hover:border-b-primaryDark`}
                                placeholder="Enter email"
                            />
                            {errors.email && <ErrorIcon />}
                        </div>
                        {errors.email?.type === "required" && <span className="text-red-500 text-sm">Email is required</span>}
                        {errors.email?.type === "pattern" && <span className="text-red-500 text-sm">Invalid email address</span>}
                        {errors.email?.type === "manual" && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>


                    <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-full shadow-cardShadow text-sm text-white bg-primary hover:bg-primaryDark hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        disabled={isLoading}
                    >
                        <BsFillSendFill />
                        {isLoading ? (
                            <span className="loading loading-ring loading-md"></span>
                        ) : (
                            "Send Email"
                        )}
                    </button>
                    <div className='flex gap-1 items-center pt-4 cursor-pointer' onClick={() => navigate(-1)}>
                        <ArrowLeft className='size-4 text-textSecondary' />
                        <p className='text-sm text-textMuted'>Back to login</p>
                    </div>
                </div>

            </form>
        </div>
    );
}