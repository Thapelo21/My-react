// src/components/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import UserManagementList from './UserManagementList';
import './App.css';

function App() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [editingUserIndex, setEditingUserIndex] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser && users.some(user => user.username === storedUser)) {
      setCurrentUser(storedUser);
    } else {
      localStorage.removeItem('currentUser');
    }

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('products', JSON.stringify(products));
    updateLowStockItems();
  }, [users, products]);

  const updateLowStockItems = () => {
    const lowStock = products.filter((product) => product.quantity <= 5);
    setLowStockItems(lowStock);
  };

  const handleRegister = (username, password) => {
    if (users.some((u) => u.username === username)) {
      alert('Username already exists!');
    } else {
      setUsers([...users, { username, password }]);
      alert('Registration successful! You can now log in.');
    }
  };

  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(username);
      localStorage.setItem('currentUser', username);
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
  };

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleUpdateProduct = (index, updatedProduct) => {
    const newProducts = [...products];
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
    setEditingProductIndex(null);
  };

  const handleDeleteProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleSellProduct = (index) => {
    const newProducts = [...products];
    if (newProducts[index].quantity > 0) {
      newProducts[index].quantity -= 1;
      setProducts(newProducts);
    } else {
      alert('Product is out of stock!');
    }
  };

  const handleEditProduct = (index) => {
    setEditingProductIndex(index);
  };

  const handleDeleteUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  const handleEditUser = (index) => {
    setEditingUserIndex(index);
  };

  const handleUpdateUser = (index, updatedUser) => {
    const newUsers = [...users];
    newUsers[index] = updatedUser;
    setUsers(newUsers);
    setEditingUserIndex(null);
  };

  return (
    <Router>
      <div className="container">
        <h1>Wings Cafe Inventory System</h1>
        <nav>
          {currentUser ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/products">Product Management</Link>
              <Link to="/users">User Management</Link>
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <Navigate to="/" />
          )}
        </nav>

        <Routes>
          {!currentUser ? (
            <Route 
              path="/" 
              element={<UserManagement onRegister={handleRegister} onLogin={handleLogin} />} 
            />
          ) : (
            <>
              <Route 
                path="/dashboard" 
                element={
                  <Dashboard 
                    lowStockItems={lowStockItems} 
                    products={products} 
                    onEditProduct={handleEditProduct} 
                    onSellProduct={handleSellProduct} 
                    onDeleteProduct={handleDeleteProduct} 
                  />
                } 
              />
              <Route 
                path="/products" 
                element={
                  <ProductManagement
                    products={products}
                    onAddProduct={handleAddProduct}
                    onEditProduct={handleEditProduct}
                    onDeleteProduct={handleDeleteProduct}
                    onSellProduct={handleSellProduct}
                    onUpdateProduct={handleUpdateProduct}
                    editingProductIndex={editingProductIndex}
                    setEditingProductIndex={setEditingProductIndex}
                  />
                } 
              />
              <Route 
                path="/users" 
                element={
                  <UserManagementList
                    users={users}
                    onDeleteUser={handleDeleteUser}
                    onEditUser={handleEditUser}
                    onUpdateUser={handleUpdateUser}
                    editingUserIndex={editingUserIndex}
                    setEditingUserIndex={setEditingUserIndex}
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
