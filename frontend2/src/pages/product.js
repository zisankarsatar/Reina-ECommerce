import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductComponent() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const getAll = async () => {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data)
    }

    useEffect(() => {
        getAll();
    }, []);

    const remove = async (_id) => {
        let confirm = window.confirm("Do you want to remove this products?");
        if (confirm) {
            let model = { _id: _id };
            let response = await axios.post("http://localhost:3001/products/remove", model);
            alert(response.data.message);
            await getAll();
        }
    }

    const add = async (e) => {
        e.preventDefault();
        var input = document.querySelector("input[type='file']");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("categoryName", categoryName);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("imageUrl", input.files[0], input.files[0].name);

        var response = await axios.post("http://localhost:3001/products/add", formData);

        alert(response.data.message);

        getAll();

        let element = document.getElementById("addModalCloseBtn");
        element.click();

        setName('');
        setCategoryName('');
        setPrice(0);
        setStock(0);
        input.value = "";
    }

    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h1>Products List</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <button data-bs-toggle="modal" data-bs-target="#addModal" className='btn btn-outline-primary'>
                                Add Product
                            </button>
                            <table className="table table-bordered table-hover mt-2">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Category Name</th>
                                        <th>Amount</th>
                                        <th>Price</th>
                                        <th>Transactions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img alt={product.name} style={{ width: "50px" }} src={'http://localhost:3001/' + product.imageUrl} /></td>
                                            <td>{product.name}</td>
                                            <td>{product.categoryName}</td>
                                            <td>{product.stock}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button onClick={() => remove(product._id)} className='btn btn-outline-danger btn-sm'>Sil</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addModalLabel">Ürün Ekle</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="addModalCloseBtn" aria-label="Close"></button>
                        </div>
                        <form onSubmit={add}>
                            <div className='modal-body'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Product Name</label>
                                    <input className='form-control' value={name} onChange={(e)=>setName(e.target.value)} id="name" name="name"/>
                                </div>
                                <div className='form-group mt-2'>
                                    <label htmlFor='categoryName'>Product Category</label>
                                    <select className='form-control' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} id="categoryName" name="categoryName">
                                        <option value="0">Please select..</option>
                                        <option>Food</option>
                                        <option>Clothes</option>
                                        <option>Technology</option>
                                        <option>Home stuff</option>
                                        <option>Education</option>
                                    </select>
                                </div>
                                <div className='form-group mt-2'>
                                    <label htmlFor='stock'>Stock</label>
                                    <input className='form-control' value={stock} onChange={(e)=>setStock(e.target.value)} id="stock" name="stock"/>
                                </div>
                                <div className='form-group mt-2'>
                                    <label htmlFor='price'>Price</label>
                                    <input className='form-control' value={price} onChange={(e)=>setPrice(e.target.value)} id="price" name="price"/>
                                </div>
                                <div className='form-group mt-2'>
                                    <label htmlFor='name'>Product Image</label>
                                    <input type='file' className='form-control' id="image" name="image"/>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type="button" className='btn btn-secondary' data-bs-dismiss="modal">Close</button>
                                <button type="submit" className='btn btn-primary'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;