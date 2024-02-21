import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Cart from './Cart';
import Login from './Login';
import Home from './Home';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cart, setCart] = useState([]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const removeFromCart = (productId) => {
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
  };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
                <Route path="/" element={isLoggedIn ? <Home cart={cart} setCart={setCart}/> : <Navigate to="/login" />} />
                <Route exact path="/cart" element={isLoggedIn ? <Cart cart={cart} removeFromCart={removeFromCart}/> : <Navigate to="/login"/>} />
            </Routes>
        </Router>
    );
}

export default App;