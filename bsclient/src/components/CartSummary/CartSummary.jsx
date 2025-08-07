import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup.jsx";
import { createOrder, deleteOrder } from "../../services/OrderService.js";
import toast from "react-hot-toast";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../../services/PaymentService.js";
import { AppConstant } from "../../utils/Constant.js";

const CartSummary = ({
  customerName,
  setCustomerName,
  customerMobile,
  setCustomerMobile,
}) => {
  const { cartItems, clearCart } = useContext(AppContext);

  const [isProcessing, setIsProcessing] = useState(false);

  const [orderDetails, setOrderDetails] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  console.log(orderDetails);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalAmount * 0.01;

  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerName("");
    setCustomerMobile("");
    clearCart();
  };

  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !customerMobile) {
      toast.error("Please enter customer details");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      customerName,
      customerMobile,
      cartItems,
      subTotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };

    setIsProcessing(true);

    try {
      const response = await createOrder(orderData);
      const savedData = response.data;
      if (response.status === 201 && paymentMode === "cash") {
        toast.success("Cash received");
        setOrderDetails(savedData);
      } else if (response.status === 201 && paymentMode === "upi") {
        const razorpayloaded = await loadRazorpayScript();
        if (!razorpayloaded) {
          toast.error("Unable to load razorpay");
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }
        const razorpayOrderResponse = await createRazorpayOrder({
          amount: grandTotal,
          currency: "INR",
        });
        const options = {
          key: AppConstant.RAZORPAY_KEY_ID,
          amount: razorpayOrderResponse.data.amount,
          currency: razorpayOrderResponse.data.currency,
          order_id: razorpayOrderResponse.data.id,
          name: "My Retail Shop",
          description: "For Online payments",
          handler: async (response) => {
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerName,
            mobile: customerMobile,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment cancelled");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async (response) => {
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment failed");
          console.error(response.error.description);
        });
        rzp.open();
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (respone, savedData) => {
    const paymentData = {
      razorpayOrderId: respone.razorpay_order_id,
      razorpayPaymentId: respone.razorpay_payment_id,
      razorpaySignature: respone.razorpay_signature,
      orderId: savedData.orderId,
    };

    try {
      const paymentResponse = await verifyPayment(paymentData);
      if (paymentResponse.status === 200) {
        toast.success("Payment successful");
        setOrderDetails({
          ...savedData,
          paymentDetails: {
            razorpayOrderId: respone.razorpay_order_id,
            razorpayPaymentId: respone.razorpay_payment_id,
            razorpaySignature: respone.razorpay_signature,
          },
        });
      } else {
        toast.error("Payment processing failed");
      }
    } catch (error) {
      console.log(error.description);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Item: </span>
          <span className="text-light">&#8377;{totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Tax (1%): </span>
          <span className="text-light">&#8377;{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span className="text-light">Total: </span>
          <span className="text-light">&#8377;{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button
          className="btn btn-success flex-grow-1"
          onClick={() => completePayment("cash")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button
          className="btn btn-primary flex-grow-1"
          onClick={() => completePayment("upi")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "UPI"}
        </button>
      </div>

      {/* <ReceiptPopup /> */}
      <div className="d-flex gap-3 mt-3">
        <button
          className="btn btn-warning flex-grow-1"
          onClick={() => placeOrder()}
          disabled={isProcessing || !orderDetails}
        >
          Place Order
        </button>
      </div>
      {showPopup && (
        <ReceiptPopup
          orderDetails={{
            ...orderDetails,
            razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
            razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,
          }}
          onClose={() => setShowPopup(false)}
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default CartSummary;
