import axios from "axios";

export const dashboardData = async () => {
  return await axios.get("http://localhost:8081/api/v1.0/dashboard", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
