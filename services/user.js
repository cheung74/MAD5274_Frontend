const BASE_URL = "http://localhost:3000";

export const createUser = async (user) => {
  try {
    const url = BASE_URL + "/users";
    const result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await result.json();
    console.log(res)
    return res; 
  } catch (error) {
    console.log(error.message);
  }
};
