import { useEffect, useState } from "react";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/SignupForm";
import ShoppingList from "./components/ShoppingList";
import './App.css';
import Navbar from "./components/Navbar";
const devMode = true;

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
   
useEffect(() =>{
  if(devMode){
    setUser({displayName: "Developer"});
  }
}, []);
  return(
    <>

        <div className="app-container">
          <Navbar user={user} onLogout={()=> setUser(null)} />
          {user ? (
            <ShoppingList user={user} onLogout={()=> setUser(null)} />
          ) : showLogin ? (
            <LoginForm setUser={setUser} toggleForm={() => setShowLogin(false)} />
          ) : (
            <SignupForm setUser={setUser} toggleForm={()=> setShowLogin(true)} />
          )}
        </div>
    </>
  );
}

export default App
