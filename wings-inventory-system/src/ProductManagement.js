// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';

function ProductManagement({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onSellProduct,
  editingProductIndex,
  setEditingProductIndex,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (editingProductIndex !== null) {
      const product = products[editingProductIndex];
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setQuantity(product.quantity);
    } else {
      resetForm();
    }
  }, [editingProductIndex, products]);

  const handleAddOrEditProduct = (e) => {
    e.preventDefault();
    const newProduct = { name, description, category, price, quantity };

    if (editingProductIndex !== null) {
      onEditProduct(editingProductIndex, newProduct);
    } else {
      onAddProduct(newProduct);
    }
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory('');
    setPrice(0);
    setQuantity(0);
    setEditingProductIndex(null);
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={handleAddOrEditProduct}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <button type="submit">{editingProductIndex !== null ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default ProductManagement;
