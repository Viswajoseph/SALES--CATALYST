import axios from 'axios';

// Configure Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust the base URL as needed
});

// Generic error handler
const handleResponse = (promise) =>
  promise.then((response) => response.data).catch((error) => {
    console.error('API call failed:', error);
    throw error.response ? error.response.data : { error: 'Network Error' };
  });

// Auth Services
export const login = (data) => handleResponse(api.post('/login', data));
export const getProfile = (userId) => handleResponse(api.get(`/profile/${userId}`));

// Routes Services
export const getRoutes = () => handleResponse(api.get('/routes'));
export const getShopsByRoute = (routeId) => handleResponse(api.get(`/routes/${routeId}`));

// Shop & Product Services
export const getProductsByShop = (shopId) => handleResponse(api.get(`/shop/${shopId}/products`));

// Order Services
export const placeOrder = (orderData) => handleResponse(api.post('/order', orderData));
export const getMerchantOrders = () => handleResponse(api.get('/merchant/orders'));
export const confirmOrder = (orderId, otp) => 
  handleResponse(api.post('/merchant/confirm', { orderId, otp }));

export default api;
