import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            let model = {email: email, password: password};
            let response = await axios.post('http://localhost:3001/auth/login', model);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/");
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <div className="col-md-5">
                    <div className="card text-left">
                        <div className="card-header">
                            <h1>Login</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={login} method="post">
                                <div className="form-group mt-2">
                                    <label htmlFor="email">Email address</label>
                                    <input value={email} name="email" onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" id="email" placeholder="Enter email"/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">Password</label>
                                    <input value={password} name="password" onChange={(e) => setPassword(e.target.value)}type="password" className="form-control" id="password" placeholder="Password"/>
                                </div>
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-primary w-100">Submit</button> 
                                    <br/>
                                    <Link to='/register' className="mt-2" style={{float: "right"}} >Register</Link>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginComponent;