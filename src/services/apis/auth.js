import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
const API_HEADERS = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": "3yYlj28KnyN4",
};

export const fetchUserOrEmail = async (payload) => {
  const API_QUERY = `
      query getUsernameOrEmail {
        pptuii_v2_user(where: {_or: [{email: {_eq: "${payload}"}}, {username: {_eq: "${payload}"}}]}) {
          id
        }
      }`;
  try {
    const data = await axios.post(
      API_URL,
      { query: API_QUERY },
      { headers: API_HEADERS }
    );
    return data.data.data.pptuii_v2_user;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const authUsertoPassword = async (payload) => {
  const API_QUERY = `
  query verifyUser {
    pptuii_v2_user(where: {_and: [{id: {_eq: "${payload.id}"}}, {password: {_eq: "${payload.password}"}}]}) {
      email
      initial
      nama
      no_hp
      password
      role
      session
      username
      id
    }
  }
  `;
  try {
    const data = await axios.post(
      API_URL,
      { query: API_QUERY },
      { headers: API_HEADERS }
    );
    return data.data.data.pptuii_v2_user;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const setSession = async (payload) => {
  const API_QUERY = `
  mutation setSession {
    update_pptuii_v2_user(where: {id: {_eq: "${payload.id}"}}, _set: {session: "${payload.sessionId}"}) {
      affected_rows
    }
  }  
  `;
  try {
    const data = await axios.post(
      API_URL,
      { query: API_QUERY },
      { headers: API_HEADERS }
    );
    return data.data.data.pptuii_v2_user;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const verifySession = async (payload) => {
  const API_QUERY = `
  query getSessionByUser {
    pptuii_v2_user(where: {_and: [{id: {_eq: "${payload.id}"}}, {session: {_eq: "${payload.session}"}}]}) {
      email
      initial
      nama
      no_hp
      password
      role
      session
      username
      id
    }
  }
  `;
  try {
    const data = await axios.post(
      API_URL,
      { query: API_QUERY },
      { headers: API_HEADERS }
    );
    return data.data.data.pptuii_v2_user;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};
