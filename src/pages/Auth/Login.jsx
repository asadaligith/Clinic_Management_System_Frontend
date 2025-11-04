import React from 'react'
import Input from '../../input/Input'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error , setError] = useState(null);

    const handleLogin = async (e)=>{
        e.preventDefault();
        if(!validateEmail(email)){
            setError("Please Enter a Valid Email");
            return;
        }
        if (!password){
            setError("Enter a Password");
            return;
        }
        setError("");
    }


// Login API Call here


  return (
    <div>
        
        <div>
            <form onSubmit={handleLogin} >
                <Input value={email} onChange={(e)=>setEmail(e.target.email)} label="email" placeholder="example@gmail.com" />
                <Input value={password} onChange={(e)=>setPassword(e.target.password)} label="password" placeholder="Min 8 Character" />
                <button className="btn-cls" type='submit'>Login</button>
            </form>
        </div>

    </div>
  )
}

export default Login