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

export const getAllPelayanan = async () => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
    query getAllPelayanan {
      pptuii_v2_pelayanan(order_by: {status: desc}) {
        id
        id_jadwal_praktek
        id_klien
        id_layanan
        id_psikologi
        tanggal
        jam
        jadwal_praktek {
          hari
          jam_mulai
          jam_selesai
        }
        layanan {
          kategori
          nama
          deskripsi
        }
        status
        tanggal
        updated_at
        user {
          email
          initial
          jenis_kelamin
          nama
          no_hp
          role
        }
        userByIdPsikologi {
          email
          initial
          nama
          jenis_kelamin
          no_hp
          no_karyawan
          role
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
    return data.data.data.pptuii_v2_pelayanan;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const getPelayananById = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
  query MyQuery {
    pptuii_v2_pelayanan(where: {id: {_eq: "${payload}"}}) {
      id
      id_jadwal_praktek
      id_klien
      id_layanan
      id_psikologi
      tanggal
      jam
      hasil
      bukti_pembayaran
      jadwal_praktek {
        hari
        jam_mulai
        jam_selesai
      }
      layanan {
        kategori
        nama
        deskripsi
      }
      status
      tanggal
      updated_at
      user {
        email
        initial
        jenis_kelamin
        nama
        no_hp
        role
      }
      userByIdPsikologi {
        email
        initial
        nama
        jenis_kelamin
        no_hp
        no_karyawan
        role
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
    return data.data.data.pptuii_v2_pelayanan;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const getPelayananByIdKlien = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
    query getPelayananByIdKlien {
      pptuii_v2_pelayanan(where: {id_klien: {_eq: "${payload}"}}, order_by: {status: desc}){
        id
        id_jadwal_praktek
        id_klien
        id_layanan
        id_psikologi
        tanggal
        jam
        jadwal_praktek {
          hari
          jam_mulai
          jam_selesai
        }
        layanan {
          kategori
          nama
          deskripsi
        }
        status
        tanggal
        updated_at
        user {
          email
          initial
          jenis_kelamin
          nama
          no_hp
          role
        }
        userByIdPsikologi {
          email
          initial
          nama
          jenis_kelamin
          no_hp
          no_karyawan
          role
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
    return data.data.data.pptuii_v2_pelayanan;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const getPelayananByIdPsikolog = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
    query getPelayananByIdKlien {
      pptuii_v2_pelayanan(where: {id_psikologi: {_eq: "${payload}"}}, order_by: {status: desc}) {
        id
        id_jadwal_praktek
        id_klien
        id_layanan
        id_psikologi
        tanggal
        jam
        jadwal_praktek {
          hari
          jam_mulai
          jam_selesai
        }
        layanan {
          kategori
          nama
          deskripsi
        }
        status
        tanggal
        updated_at
        user {
          email
          initial
          jenis_kelamin
          nama
          no_hp
          role
        }
        userByIdPsikologi {
          email
          initial
          nama
          jenis_kelamin
          no_hp
          no_karyawan
          role
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
    return data.data.data.pptuii_v2_pelayanan;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const cancelPelayanan = async (payload) => {
  // pptuii_v2_layanan(where: {kategori: {_eq: "Layanan Organisasi"}}) {
  const API_QUERY = `
  mutation cancelPelayanan {
    update_pptuii_v2_pelayanan(where: {id: {_eq: "${payload}"}}, _set: {status: "canceled"}) {
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
    return data.data.data.update_pptuii_v2_pelayanan.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const updatePelayanan = async (payload) => {
  const API_QUERY = `
  mutation updatePelayanan {
    update_pptuii_v2_pelayanan(where: {id: {_eq: "${payload.id}"}}, _set: {id_jadwal_praktek: "${payload.idJadwalPraktek}", id_psikologi: "${payload.idPsikolog}"}) {
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
    return data.data.data.update_pptuii_v2_pelayanan.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const adminToPA = async (payload) => {
  const API_QUERY = `
  mutation adminToPA {
    update_pptuii_v2_pelayanan(where: {id: {_eq: "${payload.id}"}}, _set: {tanggal: "${payload.tanggal}",jam: "${payload.jam}", status: "request_atpa"}) {
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
    return data.data.data.update_pptuii_v2_pelayanan.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const PAToKlien = async (payload) => {
  const API_QUERY = `
  mutation PAToKlien {
    update_pptuii_v2_pelayanan(where: {id: {_eq: "${payload}"}}, _set: {status: "request_patk"}) {
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
    return data.data.data.update_pptuii_v2_pelayanan.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const approveByKlien = async (payload) => {
  const API_QUERY = `
  mutation approveByKlien {
    update_pptuii_v2_pelayanan(where: {id: {_eq: "${payload}"}}, _set: {status: "approve"}) {
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
    return data.data.data.update_pptuii_v2_pelayanan.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const uploadDokumen = async (payload) => {
  const API_QUERY = `
  mutation uploadDokumen {
    update_pptuii_v2_pelayanan(where: {id: {_eq: "${payload.id}"}}, _set: {hasil: "${payload.hasil}", status: "request_bp"}) {
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
    return data.data.data.update_pptuii_v2_pelayanan.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const uploadBuktiPembayaran = async (payload) => {
  const API_QUERY = `
  mutation uploadBuktiPembayaran {
    update_pptuii_v2_pelayanan(where: {id: {_eq: "${payload.id}"}}, _set: {bukti_pembayaran: "${payload.hasil}", status: "request_cbp"}) {
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
    return data.data.data.update_pptuii_v2_pelayanan.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};

export const setStatusDone = async (payload) => {
  const API_QUERY = `
  mutation done {
    update_pptuii_v2_pelayanan(where: {id: {_eq: "${payload}"}}, _set: {status: "done"}) {
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
    return data.data.data.update_pptuii_v2_pelayanan.affected_rows;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
    return;
  }
};
