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

    return (
        <>
        <div className="container">
            <div className="row">
                {
                    products.map((product, index) => (
                        <div className="col-md-3 mt-4">
                            <div key={index} className="card">
                                <div className="card-header"><h4>{product.name}</h4></div>
                                <div className="card-body">
                                    <img className="mx-auto d-block" style={{width: "180px", height: '150px',   left: "auto", right: "auto"}} src={"http://localhost:3001/" + product.imageUrl} />
                                    <h5 className='text-center mt-1' style={{border:"1px solid #ccc", padding: "10px"}}>Adet: {product.stock}</h5>
                                    <h5 className='text-center text-danger mt-1' style={{border:"1px solid #ccc", padding: "10px"}}>Fiyat: {product.price}</h5>
                                    <button className="btn btn-outline-success w-100">Add to Basket</button>
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