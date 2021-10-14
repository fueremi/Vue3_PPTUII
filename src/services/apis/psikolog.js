import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
const API_HEADERS = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": "3yYlj28KnyN4",
};

export const getJadwalPsikologById = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
  query getJadwalPraktekById {
    pptuii_v2_jadwal_praktek(where: {id_psikolog: {_eq: "${payload}"}}) {
      id
      hari
      jam_mulai
      jam_selesai
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

export const addNewJadwalPraktek = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
  mutation addNewJadwalPraktek {
    insert_pptuii_v2_jadwal_praktek(objects: {hari: "${payload.hari}", id_psikolog: "${payload.id_psikolog}", jam_mulai: "${payload.jam_mulai}", jam_selesai: "${payload.jam_selesai}"}) {
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
    return data.data.data.insert_pptuii_v2_jadwal_praktek;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};
