import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BasketComponent() {
    const navigate = useNavigate();
    const [baskets, setBaskets] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);

    const getAll = async () => {
        let user = JSON.parse(localStorage.getItem('user'));
        let model = { userId: user._id };

        const response = await axios.post('http://localhost:3001/baskets/getAll', model);
        setBaskets(response.data);
        let totalP = 0;
        for (let i = 0; i < response.data.length; i++) {
           totalP += response.data[i].products[0].price
        }
        setTotalPrice(totalP);
    }

    const removeItem = async(_id)=>{
        let confirm = window.confirm("Are you sure you want to delete this product from your cart?");
        if(confirm){
            const model = {_id : _id};
            await axios.post('http://localhost:3001/baskets/remove', model);
            getAll();
        }
    }

    const payment = async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        let model = {userId: user._id}
        await axios.post('http://localhost:3001/orders/add', model);
        navigate("/order")        
    }

    useEffect(() => {
        getAll();
    }, [totalPrice]);

    return (
        <>
            <div className='container mt-5'>
                <div className='card'>
                    <div className='card-header'>
                        <h1 className='text-center'>Items in The Basket</h1>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <table className='table table-bordered table-hover'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product Name</th>
                                            <th>Product Image</th>
                                            <th>Amount</th>
                                            <th>Price</th>
                                            <th>Transactions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            baskets.map((basket, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{basket.products[0].name}</td>
                                                    <td>
                                                        <img alt="resim" src={"http://localhost:3001/" + basket.products[0].imageUrl} width="75" />
                                                    </td>
                                                    <td>1</td>
                                                    <td>{basket.products[0].price}</td>
                                                    <td>
                                                        <button onClick={()=>removeItem(basket._id)} className='btn btn-outline-danger btn-sm'>Remove</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-md-4'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h4 className='text-center'>Cart Total</h4>
                                        <hr />
                                        <h5 className='text-center'>Total Number of Products: {baskets.length}</h5>
                                        <h5 className='text-center'>Total amount: {totalPrice}</h5>
                                        <hr />
                                        <button onClick={payment} type='button' className='btn btn-outline-danger w-100'>Payment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BasketComponent;