import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MerchantConfirm() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect back to the merchant page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/merchant');
    }, 3000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <style>
        {`
          .merchant-confirm-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
            font-family: 'Arial', sans-serif;
            color: #333;
            text-align: center;
          }

          .merchant-confirm-container h1 {
            font-size: 2.5rem;
            margin: 0;
            padding: 1rem 2rem;
            color: #ffffff;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .merchant-confirm-container p {
            font-size: 1.1rem;
            color: #ffffff;
            margin-top: 1rem;
            opacity: 0.9;
          }
        `}
      </style>
      <div className="merchant-confirm-container">
        <h1>Verification Successful</h1>
        <p>Thank you for confirming your order! </p>
        <p>Redirecting back to the merchant page...</p>
      </div>
    </>
  );
}

export default MerchantConfirm;
