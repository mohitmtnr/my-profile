export const fetchAsyncData = async (tableName) => {
  try {
    const response = await fetch(
      `http://localhost:5000/profile/${tableName}`,

      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Fetching failed!");
    } else {
      const jsonData = await response.json();
      return jsonData;
    }
  } catch (error) {
    console.log("Server down, please try again later...");
  }
};
