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
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (user) => {
  try {
    const url = BASE_URL + "/users" + `/${user.email}`;
    const result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const url = BASE_URL + "/users/login";
    const result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
