import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Footer from './../components/Layout/Footer';
import { useMutation } from 'react-query';
import { loginUser } from './../helper/api';

const Login = () => {

  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const navigate = useNavigate()

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      window.location.href = "/"+data.username
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  }

  return (
    <>
      <div className=" w-full h-[80vh] px-4 pt-16">

        <form onSubmit={handleSubmit} className="flex mx-auto font-details flex-col justify-center items-center space-y-4 w-[400px] [&>input]:border-gray-500 ">
          <h1 className="text-xl font-title theme-text font-semibold">Log in to your account</h1>

          <input onChange={handleChange} name='email' value={formData.email} required autoComplete="email"
            className="w-full px-4 py-1  rounded theme-bg-gray theme-text outline-2" type="text" placeholder="Enter your email" />

          <input onChange={handleChange} name='password' value={formData.password} required autoComplete="current-password"
            className="w-full px-4 py-1  rounded theme-bg-gray theme-text outline-2" type="password" placeholder="Enter your password" />

          <button type="submit" className="w-full px-4 py-1 text-base font-bold theme-i theme-bg rounded hover:scale-x-[102%] transition-transform duration-200">Login</button>

          <div className="flex justify-center items-center theme-text  space-x-3">
            <p>New here?</p>
            <p className="text-blue-600 hover:underline"><Link to="/register">create account</Link></p>
          </div>

          {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
        </form>
      </div>
      <Footer />
    </>

  )
}

export default Login