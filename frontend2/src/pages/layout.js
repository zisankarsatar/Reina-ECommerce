import { useEffect } from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';

function LayoutComponent() {
    const navigation = useNavigate();
    let isAdmin = false;

    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigation('/login');
    }

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigation('/login')
        }
    });
    
    const isCheckAdmin = () =>{
        const user = JSON.parse(localStorage.getItem("user"));
        isAdmin = user.isAdmin;
    }
    isCheckAdmin();


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/'>Home Page</Link>
                            </li>
                            {
                                isAdmin &&
                                <li className="nav-item mx-2">
                                <Link to='/product'>Our Products</Link>
                            </li>
                            }
                            <li className="nav-item mx-2">
                                <Link to='/order'>Order</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to='/basket'>Basket</Link>
                            </li>
                        </ul>
                        <button onClick={logout} className="btn btn-outline-danger" type="submit">Logout</button>
                    </div>
                </div>
            </nav>

            <Outlet/>
        </>
    )
}

export default LayoutComponent;