<template>
  <table
    class="table table-sm table-responsive table-hover table-bordered text-h3"
  >
    <thead class="text-center fw-bold">
      <tr class="table-primary">
        <th scope="col" rowspan="2">No</th>
        <th scope="col" rowspan="2">Status</th>
        <th
          scope="col"
          colspan="2"
          v-if="this.$store.state.session.role !== 'klien'"
        >
          Klien
        </th>
        <th scope="col" rowspan="2">Layanan</th>
        <th scope="col" rowspan="2">Jadwal Praktek</th>
        <th
          scope="col"
          colspan="2"
          v-if="
            this.$store.state.session.role !== 'psikolog' &&
              this.$store.state.session.role !== 'associate'
          "
        >
          Psikolog/Associate
        </th>
        <th scope="col" rowspan="2">Aksi</th>
      </tr>
      <tr class="table-primary">
        <td v-if="this.$store.state.session.role !== 'klien'" scope="col">
          Nama
        </td>
        <td v-if="this.$store.state.session.role !== 'klien'" scope="col">
          Kontak
        </td>
        <td
          scope="col"
          v-if="
            this.$store.state.session.role !== 'psikolog' &&
              this.$store.state.session.role !== 'associate'
          "
        >
          Nama
        </td>
        <td
          scope="col"
          v-if="
            this.$store.state.session.role !== 'psikolog' &&
              this.$store.state.session.role !== 'associate'
          "
        >
          Kontak
        </td>
      </tr>
    </thead>
    <tbody v-if="pelayanan.length > 0">
      <tr v-for="(data, index) in pelayanan" :key="data.id">
        <th scope="row" class="text-center">{{ index + 1 }}</th>
        <td class="text-center text-primary text-capitalize align-middle">
          <span
            class="badge rounded-pill bg-primary text-wrap"
            v-if="data.status === 'request_kta'"
            >Menunggu
          </span>
          <span
            class="badge rounded-pill bg-danger text-wrap"
            v-else-if="data.status === 'canceled'"
            >Batal
          </span>
          <span
            class="badge rounded-pill bg-primary text-wrap"
            v-else-if="data.status === 'request_atpa'"
            >Menunggu Konfirmasi Psikolog/ Associate
          </span>
          <span
            class="badge rounded-pill bg-primary text-wrap"
            v-else-if="data.status === 'request_patk'"
            >Menunggu Konfirmasi Klien
          </span>
          <span
            class="badge rounded-pill bg-success text-wrap"
            v-else-if="data.status === 'approve'"
            >Approved
          </span>
          <span
            class="badge rounded-pill bg-success text-wrap"
            v-else-if="data.status === 'request_bp'"
            >Menunggu Upload Bukti Pembayaran
          </span>
          <span
            class="badge rounded-pill bg-primary text-wrap"
            v-else-if="data.status === 'request_cbp'"
            >Pengecekan Bukti Pembayaran
          </span>
          <span
            class="badge rounded-pill bg-success text-wrap"
            v-else-if="data.status === 'done'"
            >Selesai
          </span>
        </td>
        <td
          class="text-capitalize"
          v-if="this.$store.state.session.role !== 'klien'"
        >
          {{ data.user.nama }}
        </td>
        <td v-if="this.$store.state.session.role !== 'klien'">
          {{ data.user.no_hp }}
        </td>
        <td class="text-capitalize">
          {{ data.layanan.kategori }} - {{ data.layanan.nama }}
        </td>
        <td class="text-capitalize">
          <span v-if="data.tanggal && data.jam"
            >{{ formattedDate(data.tanggal) }}, Jam: {{ data.jam }}</span
          >
          <span v-else>
            {{ data.jadwal_praktek.hari }},
            {{ data.jadwal_praktek.jam_mulai }} -
            {{ data.jadwal_praktek.jam_selesai }}
          </span>
        </td>
        <td
          class="text-capitalize"
          v-if="
            this.$store.state.session.role !== 'psikolog' &&
              this.$store.state.session.role !== 'associate'
          "
        >
          {{ data.userByIdPsikologi.role }} -
          {{ data.userByIdPsikologi.nama }}
        </td>
        <td
          v-if="
            this.$store.state.session.role !== 'psikolog' &&
              this.$store.state.session.role !== 'associate'
          "
        >
          {{ data.userByIdPsikologi.no_hp }}
        </td>
        <td
          class="text-center align-middle"
          v-if="this.$store.state.session.role === 'klien'"
        >
          <div v-if="data.status === 'request_bp' || data.status === 'done'">
            <router-link
              :to="{ name: 'DetailPelayananKlien', params: { id: data.id } }"
              class="badge rounded-pill bg-primary link"
              >Lihat Detail</router-link
            >
          </div>
          <div
            v-else-if="
              data.status === 'request_patk' && data.status !== 'request_bp'
            "
          >
            <span
              class="badge rounded-pill bg-primary link"
              @click="$emit('on-approve-by-klien', data.id)"
              >Approve</span
            >
          </div>
          <div
            v-else-if="
              data.status != 'approve' &&
                data.status !== 'canceled' &&
                data.status !== 'request_bp'
            "
          >
            <router-link
              :to="{
                name: 'TambahPemeriksaanKlien',
                params: {
                  id: data.id_layanan,
                  idpelayanan: data.id,
                },
              }"
              class="badge rounded-pill bg-primary me-1"
              ><i class="fas fa-edit"></i
            ></router-link>
            <span
              class="badge rounded-pill bg-primary"
              @click="$emit('on-click-cancel', data.id)"
              ><i class="fas fa-trash"></i
            ></span>
          </div>
          <div v-else>-</div>
        </td>
        <td
          class="text-center align-middle"
          v-else-if="this.$store.state.session.role === 'admin'"
        >
          <div
            v-if="
              (data.status !== 'canceled' && data.status === 'request_cbp') ||
                (data.status !== 'canceled' && data.status === 'done')
            "
          >
            <router-link
              :to="{ name: 'DetailPelayananKlien', params: { id: data.id } }"
              class="badge rounded-pill bg-primary me-1"
              >Lihat Detail</router-link
            >
          </div>
          <div
            v-else-if="
              data.status !== 'canceled' && data.status === 'request_kta'
            "
          >
            <router-link
              :to="{ name: 'AturJadwalAdmin', params: { id: data.id } }"
              class="badge rounded-pill bg-primary me-1"
              >Atur Jadwal</router-link
            >
          </div>
          <div v-else>-</div>
        </td>
        <td
          class="text-center align-middle"
          v-else-if="
            this.$store.state.session.role === 'psikolog' ||
              this.$store.state.session.role === 'associate'
          "
        >
          <div v-if="data.status === 'done' || data.status === 'request_cbp'">
            <router-link
              :to="{ name: 'DetailPelayananKlien', params: { id: data.id } }"
              class="badge rounded-pill bg-primary me-1"
              >Lihat Detail</router-link
            >
          </div>
          <div v-else-if="data.status !== 'canceled'">
            <span
              v-if="data.status === 'request_atpa'"
              @click="$emit('on-click-approve', data.id)"
              class="badge rounded-pill bg-primary me-1 link"
              >Approve</span
            >
            <router-link
              class="badge rounded-pill bg-primary link"
              v-if="data.status === 'approve'"
              :to="{ name: 'UploadHasilPsikolog', params: { id: data.id } }"
              >Upload Hasil</router-link
            >
          </div>
          <div v-else>-</div>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td
          colspan="9"
          class="text-center"
          v-if="this.$store.state.session.role === 'admin'"
        >
          Kamu belum memiliki
          <span class="text-primary">Jadwal Pelayanan</span>
        </td>
        <td colspan="7" class="text-center" v-else>
          Kamu belum memiliki
          <span class="text-primary">Jadwal Pelayanan</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from "moment";

export default {
  name: "TablePelayanan",
  props: ["pelayanan"],
  methods: {
    formattedDate(date) {
      return moment(date)
        .locale("id")
        .format("dddd, DD MMM YYYY");
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  &:hover {
    color: #fff;
  }
}

.link {
  cursor: pointer !important;
}

.badge {
  max-width: 120px;
}

.table {
  border-color: #555;

  thead,
  tbody {
    vertical-align: middle !important;
  }

  &-primary {
    border-color: #555;
  }
}
</style>
