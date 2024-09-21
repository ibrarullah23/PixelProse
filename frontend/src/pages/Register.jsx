import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import Footer from './../components/Layout/Footer';
import { useMutation } from "react-query";
import { registerUser } from "../helper/api";


const Register = () => {

  const [formData, setFormData] = useState({ email: '', username: '', password: '' });

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      console.log(data);
      window.location.href = "/"
      alert('setup Your Account')
    },
    onError: (error) => {
      console.log('Registration failed:', error);
      setErrors(error.response.data)
      console.log("ERRORS", errors.includes('Email'), errors.includes('Username'));
      setFormData({
        email: errors.includes('Email') ? '' : formData.email,
        username: errors.includes('Username') ? '' : formData.username,
        password: formData.password
      })
    }
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  }

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    
    setErrors([])
  }

  return (
    <>
      <div className=" w-full h-[80vh] px-4 pt-16">
        <form onSubmit={handleSubmit} className="flex mx-auto font-details flex-col justify-center items-center space-y-4 w-[400px] [&>input]:border-gray-500 ">

          <h1 className=" text-xl font-title theme-text font-semibold">Create an account</h1>
          <input onChange={handleChange} name='username' value={formData.username} required 
            className=" w-full px-4 py-1  rounded theme-bg-gray theme-text outline-2" type="text" placeholder="Enter your username" />
          <input onChange={handleChange} name='email' value={formData.email} required autoComplete="username"
            className=" w-full px-4 py-1  rounded theme-bg-gray theme-text outline-2" type="text" placeholder="Enter your email" />
          <input onChange={handleChange} name='password' value={formData.password} required
            className="w-full px-4 py-1  rounded theme-bg-gray theme-text outline-2" type="password" placeholder="Enter your password" />

          <button type="submit" className="w-full px-4 py-1 text-base font-bold theme-i theme-bg rounded hover:scale-x-[102%] transition-transform duration-200">Register</button>

          <div className="flex justify-center items-center theme-text space-x-3">
            <p>Already have an account?</p>
            <p className="text-blue-600 hover:underline"><Link to="/login">Login</Link></p>
          </div>
          {(errors.length > 0) && <h3 className="text-red-500 text-sm ">⚠ {errors.length > 1 ? "Username and Email" : errors} already exist! </h3>}

        </form>
      </div>
      <Footer />
    </>

  )
}

export default Register