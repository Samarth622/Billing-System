import axios from "axios";

export const createRazorpayOrder = async (data) => {
  return await axios.post(
    "http://localhost:8081/api/v1.0/payments/create-order",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const verifyPayment = async (verifyData) => {
  return await axios.post(
    "http://localhost:8081/api/v1.0/payments/verify",
    verifyData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
