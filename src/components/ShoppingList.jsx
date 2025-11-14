import TopBar from "./TopBar";
import AddButton from "./AddButton";

function ShoppingList({user, onLogout}){

    const handleSettings = () =>{
        console.log("Settings clicked");
    };
    const handleAddItem = () =>{
        console.log("Add item clicked");
    };



    return(

        <div className="page-container">
            <TopBar
                onLogout={onLogout}
                onSettings={handleSettings}
            />

            <h2 className="page-title">Shopping List</h2>


            <AddButton onClick={handleAddItem}/>
        </div>
    );
}

export default ShoppingList;
