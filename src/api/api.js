const URL = "https://api.webpos.kupz.wazzhop.com/api/";
// const URL = "http://localhost:8000/api/";

export const register = async (
  name,
  email,
  password,
  password_confirmation
) => {
  const res = await fetch(`${URL}register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation,
    }),
  });
  //   console.log(await res.json());
  return await res.json();
};

export const login = async (name, password) => {
  const res = await fetch(`${URL}login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
    }),
  });
  return await res.json();
};

export const getUserInfo = async (token) => {
  const res = await fetch(`${URL}userInfo`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const logoutAccount = async (token) => {
  const res = await fetch(`${URL}logout?_method=DELETE`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const addProduct = async (token, productData) => {
  const res = await fetch(`${URL}products`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: productData,
  });
  return await res.json();
};

export const getProduct = async (token) => {
  const res = await fetch(`${URL}products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const updateProduct = async (token, productData, productID) => {
  const res = await fetch(`${URL}products/${productID}?_method=PATCH`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: productData,
  });
  return await res.json();
};

export const addTransaction = async (token, transactionData) => {
  const res = await fetch(`${URL}transactions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transactionData),
  });
  return await res.json();
};

export const getTransaction = async (token) => {
  const res = await fetch(`${URL}transactions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const voidTransaction = async (token, id) => {
  const res = await fetch(`${URL}transactions/${id}?_method=DELETE`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const getTopFive = async (token) => {
  const res = await fetch(`${URL}products/reports/sales/price`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const getTopFiveQty = async (token) => {
  const res = await fetch(`${URL}products/reports/sales/quantity`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};


export const getDailySales = async (token) => {
  const res = await fetch(`${URL}products/reports/sales/dailysales`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
