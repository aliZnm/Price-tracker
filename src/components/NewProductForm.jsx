import { useEffect, useState, useRef } from "react";

function NewProductForm({barcode, scannedImage, onSubmit, onCancel, initialData, isEditing}){
    const [name, setName] = useState(initialData?.name || "");
    const [price, setPrice] = useState(initialData?.price || "$0.00");
    const [store, setStore] = useState(initialData?.store || "");
    const [image, setImage] = useState("");
    const nameInputRef = useRef(null);

    useEffect(() =>{
        nameInputRef.current?.focus();
    }, []);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);



    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!name) return;
        onSubmit({
            barcode, 
            name, 
            price, 
            store, 
            image: image || scannedImage || "",
        });
    };

    const handlePriceChange = (e) =>{
        let val = e.target.value;

        val = val.replace(/\D/g, "");
        val = (parseInt(val || "0", 10)/100).toFixed(2);
        setPrice(`$${val}`);
    };


    return (
        <>
            <div className="modal-overlay"
                onClick={onCancel}>

             </div>

            <div  className="modal-box">
                <button className="modal-close" onClick={onCancel}>×</button>

                <h3 className="modal-title" style={{ textAlign: "center", marginBottom: "15px" }}>Add Item</h3>

                <form onSubmit={handleSubmit} className="modal-form">
                    
                    {(image || scannedImage) && (
                        <img 
                        src={image || scannedImage}
                        alt="Product Preview"
                        className="product-img"
                        />
                    )}
                    
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="$0.00"
                        value={price}
                        onChange={handlePriceChange}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Store Name"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        required
                    />

                    <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if(file){
                            const reader = new FileReader();
                            reader.onloadend = () => setImage(reader.result);
                            reader.readAsDataURL(file);
                        }
                    }} />

                    <button type="submit" className="submit-btn">
                        {isEditing ? "Edit" : "Add"}
                        </button>
                </form>
            </div>
        </>
    );
}

export default NewProductForm;