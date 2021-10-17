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
          status
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
            status
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

export const getUserAdmin = async () => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
      query getUserAdmin {
          pptuii_v2_user(where: {role: {_eq: "admin"}}) {
            no_karyawan
            nama
            no_hp
            id
            email
            initial
            jenis_kelamin
            role
            status
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

export const updateNewPassword = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
    mutation updateNewPassword {
      update_pptuii_v2_user(_set: {password: "${payload.password}"}, where: {id: {_eq: "${payload.id}"}}) {
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
    return data.data.data.update_pptuii_v2_user.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const updateNewStatus = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
    mutation updateNewStatus {
      update_pptuii_v2_user(_set: {status: "${payload.status}"}, where: {id: {_eq: "${payload.id}"}}) {
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
    return data.data.data.update_pptuii_v2_user.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const addNewAdmin = async (payload) => {
  const API_QUERY = `
      mutation addNewAdmin {
    insert_pptuii_v2_user(objects: {email: "${payload.email}", initial: "${payload.inisial_nama}", jenis_kelamin: "${payload.jenis_kelamin}", nama: "${payload.nama}", no_karyawan: "${payload.no_karyawan}", no_hp: "${payload.no_hp}", password: "${payload.password}", role: "admin", username: "${payload.username}", status: true}) {
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
    return data.data.data.insert_pptuii_v2_user.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const addNewPA = async (payload) => {
  const API_QUERY = `
      mutation addNewPA {
    insert_pptuii_v2_user(objects: {email: "${payload.email}", initial: "${payload.inisial_nama}", jenis_kelamin: "${payload.jenis_kelamin}", nama: "${payload.nama}", no_karyawan: "${payload.no_karyawan}", no_hp: "${payload.no_hp}", password: "${payload.password}", role: "${payload.role}", username: "${payload.username}", status: true}) {
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
    return data.data.data.insert_pptuii_v2_user.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};
