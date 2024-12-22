import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Addorder() {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios.get(`/api/shop/${shopId}/products`).then(response => setProducts(response.data));
  }, [shopId]);

  const handleOrder = () => {
    axios.post(`/api/order`, { shopId, order })
      .then(() => alert('Order placed!'))
      .catch(err => alert('Error placing order'));
  };

  return (
    <div>
      <h2>Add Order</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <input
              type="number"
              value={order[product.id] || 0}
              onChange={(e) => setOrder({ ...order, [product.id]: e.target.value })}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}

export default Addorder;