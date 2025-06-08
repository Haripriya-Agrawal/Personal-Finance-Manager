// import axios from "axios";

// const API_URL = "http://localhost:5000/api/savings";

// export const addSavingsGoal = async (goalData) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No authentication token found. Please log in again.");

//     const { _id, ...newGoalData } = goalData; 

//     const response = await axios.post(API_URL, newGoalData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error adding savings goal:", error);
//     throw error.response?.data || { message: "Something went wrong!" };
//   }
// };

// export const updateSavingsGoal = async (goalId, updatedData) => {
//   console.log("Updating Goal ID:", goalId);
//   console.log("Data Sent:", updatedData);
//   const { _id, __v, createdAt, updatedAt, ...filteredData } = updatedData;

//   try {
//     const response = await fetch(`${API_URL}/${goalId}`, {
//           method: "PUT",
//           headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(filteredData),
//       });

//       console.log("Raw Response:", response);

//       if (!response.ok) {
//           const errorText = await response.text();  // Read error message
//           console.error("API Error Response:", errorText);
//           throw new Error(errorText || "Failed to update goal");
//       }

//       const responseData = response.headers.get("Content-Type")?.includes("application/json")
//           ? await response.json()
//           : null;

//       console.log("Parsed Response:", responseData);
//       return responseData;
//   } catch (error) {
//       console.error("API Update Error:", error);
//       throw error;
//   }
// };


// export const fetchSavings = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No authentication token found. Please log in again.");

//     const res = await axios.get(API_URL, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return res.data;
//   } catch (error) {
//     console.error("Error fetching savings:", error);
//     return []; // Return an empty array to prevent frontend crashes
//   }
// };


import axios from "axios";

const API_URL = "http://localhost:5000/api/savings";

// ✅ Add new savings goal
export const addSavingsGoal = async (goalData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found. Please log in again.");

    const { _id, ...newGoalData } = goalData; // Remove unwanted fields

    const response = await axios.post(API_URL, newGoalData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding savings goal:", error);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};

export const updateSavingsGoal = async (goalId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found. Please log in again.");

    // Remove MongoDB metadata AND userId from the payload
    const { _id, __v, createdAt, updatedAt, userId, ...cleanData } = updatedData;

    console.log("Updating Savings Goal:", goalId);
    console.log("Payload to backend:", cleanData);

    const response = await axios.put(`${API_URL}/${goalId}`, cleanData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating savings goal:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to update goal" };
  }
};




// ✅ Fetch all savings goals for logged-in user
export const fetchSavings = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found. Please log in again.");

    const response = await axios.get(API_URL, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching savings:", error);
    return []; // Prevent crashes by returning an empty array
  }
};
