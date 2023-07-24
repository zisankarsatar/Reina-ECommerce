import axios from "axios";
import { useEffect, useState } from 'react';

function HomeComponent(){
    const [products, setProducts] = useState([]);

    const getAll = async () => {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
    }

    useEffect(() => {
        getAll();
    }, []);

    const addBasket = async (productId) =>{
        let user = JSON.parse(localStorage.getItem("user"));
        let model = {productId: productId, userId: user._id};
        const response = await axios.post('http://localhost:3001/baskets/add', model);

        alert(response.data.message);

        getAll();
    }

    return (
        <>
        <div className="container">
            <div className="row">
                {
                    products.map((product, index) => (
                        <div className="col-md-3 mt-4" key={index}>
                            <div className="card">
                                <div className="card-header"><h4>{product.name}</h4></div>
                                <div className="card-body">
                                    <img className="mx-auto d-block" style={{width: "180px", height: '150px',   left: "auto", right: "auto"}} src={"http://localhost:3001/" + product.imageUrl} />
                                    <h5 className='text-center mt-1' style={{border:"1px solid #ccc", padding: "10px"}}>Adet: {product.stock}</h5>
                                    <h5 className='text-center text-danger mt-1' style={{border:"1px solid #ccc", padding: "10px"}}>Fiyat: {product.price}</h5>
                                    {
                                        product.stock > 0 ? 
                                        <button className="btn btn-outline-success w-100" onClick={()=>addBasket(product._id)}>Add to Basket</button> :
                                        <button className="btn btn-secondary w-100">Out of Stock</button>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default HomeComponent;