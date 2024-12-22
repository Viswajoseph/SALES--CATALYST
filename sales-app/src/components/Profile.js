import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProfile } from '../services/api';

function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile(userId);
      setUserData(response.data.user);
      setRoutes(response.data.routes);
    };
    fetchProfile();
  }, [userId]);

  return (
    <div>
      <h2>Profile</h2>
      <p>User ID: {userData.id}</p>
      <p>Name: {userData.name}</p>
      <p>Phone: {userData.phone}</p>
      <h3>Routes</h3>
      <ul>
        {routes.map(route => (
          <li key={route.id}>
            <Link to={`/shops/${route.id}`}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
