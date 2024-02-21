import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({setCart, cart}) {
    const [products, setProducts] = useState([]);
    const [currentImageIndices, setCurrentImageIndices] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                const { products } = response.data;
                setProducts(products);
                
                const initialImageIndices = {};
                products.forEach(product => {
                    initialImageIndices[product.id] = 0;
                });
                setCurrentImageIndices(initialImageIndices);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleNextClick = (productId) => {
        setCurrentImageIndices(prevIndices => ({
            ...prevIndices,
            [productId]: (prevIndices[productId] + 1) % products.find(product => product.id === productId).images.length
        }));
    };

    const handlePreviousClick = (productId) => {
        setCurrentImageIndices(prevIndices => ({
            ...prevIndices,
            [productId]: (prevIndices[productId] - 1 + products.find(product => product.id === productId).images.length) % products.find(product => product.id === productId).images.length
        }));
    };

    const handleAddToCart = (productId) => {
      const selectedProduct = products.find(product => product.id === productId);
      setCart(prevCart => [...prevCart, selectedProduct]);
  };
  

    return (
        <div>
            <h2>Products</h2>
            <div className="cart-button">
                <Link to="/cart">Cart ({cart.length})</Link>
            </div>
            <div className="product-list">
                {products.map((product, index) => (
                    <div key={index} className="product">
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Description: {product.description}</p>
                        <img src={product.images[currentImageIndices[product.id]]} alt={product.title} />
                        <button onClick={() => handleNextClick(product.id)}>Next</button>
                        <button onClick={() => handlePreviousClick(product.id)}>Previous</button>
                        <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
