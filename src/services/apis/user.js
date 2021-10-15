import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
const API_HEADERS = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": "3yYlj28KnyN4",
};

export const getUserPsikologAssociate = async () => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
    query getUserPsikologAssociate {
        pptuii_v2_user(where: {_or: [{role: {_eq: "psikolog"}}, {role: {_eq: "associate"}}]}) {
          no_karyawan
          nama
          no_hp
          id
          email
          initial
          jenis_kelamin
          role
          username
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

export const getUserKlien = async () => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
      query getUserKlien {
          pptuii_v2_user(where: {role: {_eq: "klien"}}) {
            no_karyawan
            nama
            no_hp
            id
            email
            initial
            jenis_kelamin
            role
            username
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
