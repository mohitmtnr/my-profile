export const fetchAsyncData = async (tableName) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/${tableName}`,

      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          authToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMmRjZDk3YmVmODYwODNlOGRkNGY4In0sImlhdCI6MTY5NDg3ODUxNCwiZXhwIjoxNjk0OTY0OTE0fQ.civLncQtZAXdqSlDZr9j2wU7jPU5tu5OmGQjVzQnd0w",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Fetching failed!");
    } else {
      console.log("i am inside fetch");
      const jsonData = await response.json();
      return jsonData;
    }
  } catch (error) {
    console.log(error);
  }
};
