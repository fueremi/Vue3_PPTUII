import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
const API_HEADERS = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": "3yYlj28KnyN4",
};

export const getAllJadwal = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
    query getAllJadwal {
        pptuii_v2_jadwal_praktek(limit: ${payload.limit}, offset: ${payload.offset}) {
          user {
            nama
            role
            initial
          }
          hari
          jam_selesai
          jam_mulai
          id_psikolog
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
    return data.data.data.pptuii_v2_jadwal_praktek;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const getAllPsikologAssociate = async () => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
  query getAllJadwal {
    pptuii_v2_user(where: {_or: [{role: {_eq: "psikolog"}}, {role: {_eq: "associate"}}]}) {
      initial
      nama
      role
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

export const getLengthJadwalPraktek = async () => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
  query getLengthJadwalPraktek {
    pptuii_v2_jadwal_praktek_aggregate {
      aggregate {
        count
      }
    }
  }
  
    `;
  try {
    const data = await axios.post(
      API_URL,
      { query: API_QUERY },
      { headers: API_HEADERS }
    );
    return data.data.data.pptuii_v2_jadwal_praktek_aggregate.aggregate.count;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};
