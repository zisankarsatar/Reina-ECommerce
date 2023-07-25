import { useEffect, useState } from 'react';
import axios from 'axios';

function OrderComponent() {
    const [orders, setOrders] = useState([]);

    const getAll = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        let model = { userId: user._id };
        let response = await axios.post('http://localhost:3001/orders', model);
        setOrders(response.data);
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <>
            <div className='container mt-4'>
                <div className='card'>
                    <div className='card-header'>
                        <h1 className='text-center'>Order Lists</h1>
                    </div>
                    <div className='card-body'>
                        <table className='table table-bordered table-horver'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Product Amount</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{order.products[0].name}</td>
                                        <td>1</td>
                                        <td>{order.products[0].price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderComponent;