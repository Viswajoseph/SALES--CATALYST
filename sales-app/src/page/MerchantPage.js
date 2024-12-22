import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/MerchantPage.css';
function MerchantPage() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [dummyOrder, setDummyOrder] = useState({
    id: 1,
    shopName: 'Jai home needs',
    salesOfficer: 'Manoj',
  });


  useEffect(() => {
    // Load the external script
    const script = document.createElement('script');
    script.src = "https://www.phone.email/sign_in_button_v1.js";
    script.async = true;
    document.querySelector('.pe_signin_button').appendChild(script);
    
    window.phoneEmailListener = function (userObj) {
      // Redirect to the "/merchant/success" page
      navigate("/merchant/success");
    };

    return () => {
        // Cleanup the listener function when the component unmounts
        window.phoneEmailListener = null;
    };
}, []);

 

  return (
    <div className="merchant-container">
      <h2>Merchant Orders</h2>
      <div className="order-card">
        <p><strong>Order ID:</strong> {dummyOrder.id}</p>
        <p><strong>Shop:</strong> {dummyOrder.shopName}</p>
        <p><strong>Sales Officer:</strong> {dummyOrder.salesOfficer}</p>
        <div class="pe_signin_button" data-client-id="17940480044921272009"></div>

       
      </div>
    </div>
  );
}

export default MerchantPage;
