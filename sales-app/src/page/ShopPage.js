import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShopsByRoute } from '../services/api';

function ShopPage() {
  const { routeId } = useParams();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const response = await getShopsByRoute(routeId);
      setShops(response.data.shops);
    };
    fetchShops();
  }, [routeId]);

  return (
    <div>
      <h2>Shops in this route</h2>
      <ul>
        {shops.map(shop => (
          <li key={shop.id}>
            <Link to={`/order/${shop.id}`}>{shop.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShopPage;
