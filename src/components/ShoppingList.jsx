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
                return {name: data.items[0].title, price: "", store: ""};
            }
            return null;
        }
        catch (err){
            return null;
        }
    };

    const handleScan = async (barcode) => {
        setScanning(false);
        const existing = products.find((p) => p.barcode === barcode);
        if(existing){
            alert(
                `Item already scanned!\nName: ${existing.name}\nPrice: ${existing.price}\nStore: ${existing.store}`
            );
            return;
        }

        const product = await fetchProduct(barcode);
        if(!product){
            const name = prompt("Product not found. ENter procut name:");
            if(!name) return;
            const price = prompt("Enter price:");
            const store = prompt("Enter store name:");
            setProducts((prev) => [...prev, {barcode, name, price, store}]);
        }
        else{
            setProducts((prev) => [...prev, {barcode, ...products}]);
        }
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
                {products.map((product, i) =>(
                    <ProductCard 
                    key={i} 
                    name={product.name}
                    price={product.price}
                    store={product.store}
                     />
                ))}
            </div>

            <AddButton onClick={handleAddItem}/>
        </div>
    );
}

export default ShoppingList;
