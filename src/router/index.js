import { createRouter, createWebHistory } from "vue-router";
import { verifySession, getUserInfoFromSession } from "@/services/apis/auth";
import store from "../store";
import Swal from "sweetalert2";

import Login from "@/views/auth/Login";
import Daftar from "@/views/auth/Daftar";

// ? Pasien
import HomeKlien from "@/views/klien/Home";
import LayananKlien from "@/views/klien/Layanan";
import TambahPemeriksaanKlien from "@/views/klien/Pemeriksaan";

// ? Psikolog
import HomePsikolog from "@/views/psikolog/Home";
import PraktekPsikolog from "@/views/psikolog/Praktek";

// ? Admin
import HomeAdmin from "@/views/admin/Home";
import MasterPsikologAdmin from "@/views/admin/Psikolog";
import MasterKlien from "@/views/admin/Klien";
import MasterAdmin from "@/views/admin/Admin";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/daftar",
    name: "Daftar",
    component: Daftar,
  },
  {
    path: "/klien",
    name: "HomeKlien",
    component: HomeKlien,
  },
  {
    path: "/layanan",
    name: "LayananKlien",
    component: LayananKlien,
  },
  {
    path: "/layanan/:id/:idpelayanan?",
    name: "TambahPemeriksaanKlien",
    component: TambahPemeriksaanKlien,
  },
  {
    path: "/psikolog",
    name: "HomePsikolog",
    component: HomePsikolog,
  },
  {
    path: "/praktek",
    name: "PraktekPsikolog",
    component: PraktekPsikolog,
  },
  {
    path: "/admin",
    name: "HomeAdmin",
    component: HomeAdmin,
  },
  {
    path: "/admin/master-psikolog",
    name: "MasterPsikologAdmin",
    component: MasterPsikologAdmin,
  },
  {
    path: "/admin/master-klien",
    name: "MasterKlien",
    component: MasterKlien,
  },
  {
    path: "/admin/master-admin",
    name: "MasterAdmin",
    component: MasterAdmin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem("session")) {
    const localSession = JSON.parse(localStorage.getItem("session"));
    const sessionInfo = await verifySession(localSession);
    if (sessionInfo.length > 0) {
      await store.dispatch("setSession", sessionInfo[0]);
      if (to.name === "Login" || to.name === "Daftar") {
        Swal.fire({
          icon: "error",
          title: "Akses dilarang...",
          html: `Kamu sudah <span class="text-primary">Login</span> <hr> <small>Mengarahkan kamu ke <span class="text-primary">Halaman Home</span></small>`,
        });
        next({ name: "HomePasien" });
      } else {
        next();
      }
    } else {
      if (to.name === "Login" || to.name === "Daftar") {
        next();
      } else {
        Swal.fire({
          icon: "error",
          title: "Akses dilarang...",
          html: `Sesi <span class="text-primary">Login</span> kamu habis. Silahkan <span class="text-primary">Login</span> dahulu!<hr> <small>Mengarahkan kamu ke <span class="text-primary">Halaman Login</span></small>`,
        });
        next({ name: "Login" });
      }
    }
  } else {
    if (to.name === "Login" || to.name === "Daftar") {
      next();
    } else {
      Swal.fire({
        icon: "error",
        title: "Akses dilarang...",
        html: `Kamu belum <span class="text-primary">Login</span>. Silahkan <span class="text-primary">Login</span> dahulu!<hr> <small>Mengarahkan kamu ke <span class="text-primary">Halaman Login</span></small>`,
      });
      next({ name: "Login" });
    }
  }
});

// if (localStorage.getItem("session")) {
//   // Todo session ada
//   const session_info = JSON.parse(localStorage.getItem("session"));

//   // ? Validasi session di browser sesuai dengan di database
//   const verifyingSession = async () => {
//     return await verifySession(session_info);
//   };

//   router.beforeEach(async (to, from, next) => {
//     const data = await verifyingSession();
//     console.log(data);
//     if (data.length > 0) {
//       const userInfo = await getUserInfoFromSession(session_info);
//       await store.dispatch("setSession", userInfo);

//       // ? Validasi akses halaman login & register
//       if (to.name === "Login" || to.name === "Daftar") {
//         Swal.fire({
//           icon: "info",
//           title: "Oops...",
//           html: `Kamu sudah <span class="text-primary">Login</span> <hr> <small>Mengarahkan kamu ke <span class="text-primary">Halaman Home</span></small>,`,
//         });
//         next({ name: "HomePasien" });
//       } else {
//         Swal.fire({
//           icon: "info",
//           title: "Yeay...",
//           html: `Kamu sudah <span class="text-primary">Login</span>`,
//         });
//         next();
//       }
//     } else {
//       store.state.session = null;
//       localStorage.removeItem("session");

//       next({ name: "Login" });
//     }
//   });
// } else {
//   // Todo session tidak ada
//   if (to.name === "Login" || to.name === "Daftar") {
//     next();
//   }
// }
export default router;
