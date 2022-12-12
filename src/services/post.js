const BASE_URL = "http://localhost:3000";

export const createPost = async (item) => {
  try {
    const url = BASE_URL + "/post";
    const result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.log(error.message);
    return false
  }
};

export const getPost = async () => {
  try {
    const url = BASE_URL + "/post";
    const result = await fetch(url, {
      method: "GET",
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.log(error.message);
    return false
  }
};

export const updatePost = async (item) => {
  try {
    const url = BASE_URL + "/post";
    const result = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.log(error.message);
    return false
  }
};