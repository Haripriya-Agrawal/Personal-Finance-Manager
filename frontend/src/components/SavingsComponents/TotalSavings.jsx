import { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;
const TotalSavings = () => {
  const [totalSaved, setTotalSaved] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalSavings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("User token not found.");
          return;
        }

        const response = await axios.get(`${backendUrl}/api/savings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const total = response.data.reduce((sum, item) => sum + item.savedAmount, 0);
        setTotalSaved(total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching savings:", error);
        setLoading(false);
      }
    };

    fetchTotalSavings();
  }, []);

  if (loading) return <p>Loading total savings...</p>;

  return (
    <div>
      <p className="text-3xl font-bold mt-2">₹{totalSaved.toFixed(2)}</p>
    </div>
  );
};

export default TotalSavings;
