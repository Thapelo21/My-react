import React from 'react';

function Dashboard({ lowStockItems, products, onEditProduct, onSellProduct, onDeleteProduct }) {
  return (
    <div>
      <h2>Dashboard</h2>

      <div id="stockOverview">
        <h3>Low Stock Items</h3>
        {lowStockItems.length > 0 ? (
          lowStockItems.map((item, index) => (
            <p key={index}>{item.name}: {item.quantity}</p>
          ))
        ) : (
          <p>No low stock items.</p>
        )}
      </div>

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => onEditProduct(index)}>Edit</button>
                <button onClick={() => onSellProduct(index)}>Sell</button>
                <button onClick={() => onDeleteProduct(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;