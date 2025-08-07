import { useEffect, useState } from "react";
import "./Dashboard.css";
import { dashboardData } from "../../services/Dashboard.js";
import toast from "react-hot-toast";
import { MdCurrencyRupee } from "react-icons/md";
import { BsCartCheck, BsClockHistory } from "react-icons/bs";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await dashboardData();
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  if (!data) {
    return <div className="error">Failed to load the dashboard data ...</div>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <MdCurrencyRupee />
            </div>
            <div className="stat-content">
              <h3>Today's Saled</h3>
              <p>&#8377;{data.todaySales.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <BsCartCheck />
            </div>
            <div className="stat-content">
              <h3>Today's Order</h3>
              <p>{data.todayOrderCount}</p>
            </div>
          </div>
        </div>

        <div className="recent-orders-card">
          <h3 className="recent-orders-title">
            <BsClockHistory />
            Recent Orders
          </h3>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId.substring(0, 8)}...</td>
                    <td>{order.customerName}</td>
                    <td>&#8377;{order.grandTotal.toFixed(2)}</td>
                    <td>
                      <span
                        className={`payment-method ${order.paymentMethod.toLowerCase()}`}
                      >
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${order.paymentDetails.status.toLowerCase()}`}
                      >
                        {order.paymentDetails.status}
                      </span>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
