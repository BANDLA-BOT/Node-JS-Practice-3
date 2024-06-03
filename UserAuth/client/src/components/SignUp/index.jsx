import { useState } from 'react'
import styles from  './styles.module.css'
import axios from 'axios'
import {Link, useNavigate }from 'react-router-dom'

const SignUp = () => {
    const [error, setError] = useState("");
    const [data, setData] = useState({
        fistName:"",
        lastName:"",
        email:"",
        password:"",
    })
    const navigate = useNavigate()

    const handleChange = ({currentTarget:input})=>{
            setData({...data,[input.name]:input.value})
    }
    const handleSubmit =async (e)=>{
        e.preventDefault()
        try{
            const url = 'http://localhost:8080/api/users';
            const {data:res} = await axios.post(url,data)
            navigate('/login')
            console.log(res.message)
        }catch(error){
            if(error.response && error.response.status >=400 && error.response.status<=500){
                setError(error.response.data.message)
            }
        }

    }




  return (
    <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
            <div className={styles.top}>
                <h1>Welcome Back</h1>
                <Link to='/login'>
                    <button type='button' className={styles.white_btn}>
                        Sign in 
                    </button>
                </Link>
            </div>
            <div className={styles.bottom}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input
                    name='firstName'
                    value={data.fistName}
                    onChange={handleChange}
                     type="text" 
                     required
                     className={styles.input}
                     placeholder='Fist name'
                     />

                     <input
                    name='lastName'
                    value={data.lastName}
                    onChange={handleChange}
                     type="text" 
                     required
                     className={styles.input}
                     placeholder='Last name'
                     />

                     <input
                     name='email'
                     value={data.email}
                     onChange={handleChange}
                      type="text" 
                      required
                      className={styles.input}
                      placeholder='email'
                      />

                      <input
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                     type="password" 
                     required
                     className={styles.input}
                     placeholder='password'
                     />
                     {error && <div className={styles.error_msg}>{error}</div>}
                     <button type='submit' className={styles.green.btn}>Sign Up</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp