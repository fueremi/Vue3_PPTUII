import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
const API_HEADERS = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": "3yYlj28KnyN4",
};

export const addNewPelayanan = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
  mutation addNewPelayanan {
    insert_pptuii_v2_pelayanan(objects: {id_jadwal_praktek: "${payload.id_jadwal_praktek}", id_klien: "${payload.id_klien}", id_psikologi: "${payload.id_psikolog}", status: "request_kta", id_layanan: "${payload.id_layanan}"}) {
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
    return data.data.data.insert_pptuii_v2_pelayanan.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};
