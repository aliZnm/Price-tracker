import TopBar from "./TopBar";
import AddButton from "./AddButton";
import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import ProductCard from "./productCard";

function ShoppingList({user, onLogout}){
    const [products, setProducts] = useState([]);
    const [scanning, setScanning] = useState(false);

    const fetchProduct = async (barcode) =>{
        try{
            const res = await fetch(
                `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`
            );
            const data = await res.json();
            if(data.items && data.items.length >0){
                return data.items[0].title;
            }
            return "Unknown Product";
        }
        catch (err){
            return "Error fetching product";
        }
    };

    const handleScan = async (barcode) => {
        const name = await fetchProduct(barcode);
        setProducts((prev) => [...prev, {barcode, name}]);
        setScanning(false);
    };
    
    const handleAddItem = () =>{
        setScanning(true);
    };




    return(

        <div className="page-container">
            <TopBar onLogout={onLogout} onSettings={() => console.log("Settings clicked")}/>

            <h2 className="page-title">Shopping List</h2>

            {scanning && (
                <div style={{marginTop: "10px"}}>
                    <BarcodeScanner
                    onUpdate={(err, result)=>{
                        if(result) handleScan(result.text);
                    }}
                    width={400}
                    />
                    </div>
            )}


            <div className="items-container">
                {products.map((products, i) =>(
                    <ProductCard key={i} name={products.name} />
                ))}
            </div>
            
            <AddButton onClick={handleAddItem}/>
        </div>
    );
}

export default ShoppingList;
