import { useState } from "react";

function NewProductForm({barcode, onSubmit, onCancel}){
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [store, setStore] = useState("");


    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!name)return;
        onSubmit({barcode, name, price, store});
    };


    return(
        <div className="new-product-form">
            <h3>Add Item</h3>
            <form onSubmit="handleSubmit">
                <input type="text" placeholder="Product Name" value={name} onChange={(e)=>setName(e.target.value)}  required/>
                <input type="text" placeholder="$" value={price} onChange={(e)=>setPrice(e.target.value)}  required/>               
                <input type="text" placeholder="Store Name" value={store} onChange={(e)=>setStore(e.target.value)}  required/>

                <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
                    <button type="submit">Add Product</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default NewProductForm;