const members = [
  {
    name: "Fajar Alfa Rizki",
    role: "Ketua Kelas",
    rank: 1,
    hobby: "Memimpin diskusi dan merapikan tugas",
    humor: "ceria",
    bio: "Fajar Alfa Rizki menjadi pusat koordinasi kelas dan berada pada posisi utama dalam struktur XII RPL 1.",
  },
  {
    name: "Muhammad Haliq Maulana",
    role: "Wakil Ketua Kelas",
    rank: 2,
    hobby: "Menyusun catatan dan mengatur alur kerja",
    humor: "ceria",
    bio: "Muhammad Haliq Maulana mendukung jalannya kegiatan kelas dan menjaga urutan kerja tetap stabil.",
  },
  {
    name: "Nadya Febriasari",
    role: "Sekretaris",
    rank: 3,
    hobby: "Menulis, merangkum, dan menyusun dokumen",
    humor: "ceria",
    bio: "Nadya Febriasari berperan mencatat dan merapikan informasi agar administrasi kelas tetap tertata.",
  },
  {
    name: "Syarifah Sabrina",
    role: "Bendahara",
    rank: 4,
    hobby: "Mengelola pembukuan dan administrasi",
    humor: "ceria",
    bio: "Syarifah Sabrina bertanggung jawab menjaga pencatatan dana dan keuangan kelas tetap jelas.",
  },
  {
    name: "Angga Saputra",
    role: "Anggota Kelas",
    rank: 5,
    hobby: "Belajar pemrograman dan olahraga ringan",
    humor: "ceria",
    bio: "Angga Saputra merupakan bagian dari struktur anggota kelas XII RPL 1.",
  },
  {
    name: "Andika Setiawan",
    role: "Anggota Kelas",
    rank: 6,
    hobby: "Menyelesaikan tugas teknis dan eksplorasi web",
    humor: "ceria",
    bio: "Andika Setiawan terdaftar sebagai anggota kelas dengan peran yang sama pentingnya dalam dinamika kelas.",
  },
  {
    name: "Alvin Marliansyah",
    role: "Anggota Kelas",
    rank: 7,
    hobby: "Membaca, menonton tutorial, dan praktik desain",
    humor: "ceria",
    bio: "Alvin Marliansyah menjadi bagian dari anggota yang mendukung aktivitas kelas.",
  },
  {
    name: "Hafis Maulana",
    role: "Anggota Kelas",
    rank: 8,
    hobby: "Mencoba konsep baru dan belajar mandiri",
    humor: "ceria",
    bio: "Hafis Maulana termasuk anggota kelas XII RPL 1 yang terdata dalam daftar resmi.",
  },
  {
    name: "Fahrezi",
    role: "Anggota Kelas",
    rank: 9,
    hobby: "Olahraga dan bermain gim strategi",
    humor: "ceria",
    bio: "Fahrezi tercatat sebagai anggota kelas dengan identitas yang ditampilkan pada daftar anggota.",
  },
  {
    name: "Hafief Al Luthfi",
    role: "Anggota Kelas",
    rank: 10,
    hobby: "Mengutak-atik tampilan antarmuka",
    humor: "ceria",
    bio: "Hafief Al Luthfi menjadi bagian dari anggota yang mewakili kelas XII RPL 1.",
  },
  {
    name: "Salwa Khalisa",
    role: "Anggota Kelas",
    rank: 11,
    hobby: "Menyusun catatan dan membantu presentasi",
    humor: "ceria",
    bio: "Salwa Khalisa tercantum sebagai anggota kelas dengan tampilan kartu individual.",
  },
  {
    name: "T Rizka Namira",
    role: "Anggota Kelas",
    rank: 12,
    hobby: "Membaca dan mengerjakan tugas kelompok",
    humor: "ceria",
    bio: "T Rizka Namira merupakan anggota kelas yang dimasukkan ke daftar lengkap dashboard.",
  },
  {
    name: "Nadia Kaputri",
    role: "Anggota Kelas",
    rank: 13,
    hobby: "Menggambar dan menyusun ide visual",
    humor: "ceria",
    bio: "Nadia Kaputri menempati satu kartu khusus pada tampilan anggota kelas.",
  },
  {
    name: "Sri Mutia Wahyuni",
    role: "Anggota Kelas",
    rank: 14,
    hobby: "Menyimak materi dan merapikan tugas",
    humor: "ceria",
    bio: "Sri Mutia Wahyuni termasuk bagian dari susunan lengkap kelas XII RPL 1.",
  },
  {
    name: "Rani Bila Aulia",
    role: "Anggota Kelas",
    rank: 15,
    hobby: "Membuat catatan ringkas dan belajar terarah",
    humor: "ceria",
    bio: "Rani Bila Aulia menjadi salah satu anggota yang ditampilkan dalam kartu tersendiri.",
  },
  {
    name: "Salsabila Zahra",
    role: "Anggota Kelas",
    rank: 16,
    hobby: "Menulis ide dan mendukung kerja tim",
    humor: "ceria",
    bio: "Salsabila Zahra merupakan bagian dari data anggota kelas XII RPL 1.",
  },
  {
    name: "Mawaddah",
    role: "Anggota Kelas",
    rank: 17,
    hobby: "Membaca dan membantu penyusunan tugas",
    humor: "ceria",
    bio: "Mawaddah ditampilkan sebagai anggota kelas pada daftar utama.",
  },
  {
    name: "Dinda Mustakillah",
    role: "Anggota Kelas",
    rank: 18,
    hobby: "Mengelola catatan dan belajar mandiri",
    humor: "ceria",
    bio: "Dinda Mustakillah menjadi salah satu kartu anggota dalam struktur kelas.",
  },
  {
    name: "Wan Cahaya Balkis",
    role: "Anggota Kelas",
    rank: 19,
    hobby: "Mengamati desain dan menyusun referensi",
    humor: "ceria",
    bio: "Wan Cahaya Balkis tercatat sebagai anggota kelas XII RPL 1.",
  },
  {
    name: "Eliza Amanda",
    role: "Anggota Kelas",
    rank: 20,
    hobby: "Merapikan tugas dan mengikuti diskusi",
    humor: "ceria",
    bio: "Eliza Amanda tampil sebagai bagian dari susunan kelas pada dashboard.",
  },
  {
    name: "Naila Aisyah Rinaldi",
    role: "Anggota Kelas",
    rank: 21,
    hobby: "Membuat ringkasan dan mengecek detail",
    humor: "ceria",
    bio: "Naila Aisyah Rinaldi menutup daftar siswa lengkap XII RPL 1 pada tampilan ini.",
  }
];

const dashboardGrid = document.getElementById("dashboard-grid");
const memberList = document.getElementById("member-list");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .section");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalClose = document.getElementById("modal-close");
const modalImage = document.getElementById("modal-image");
const modalRole = document.getElementById("modal-role");
const modalName = document.getElementById("modal-name");
const modalNickname = document.getElementById("modal-nickname");
const modalHobby = document.getElementById("modal-hobby");
const modalHumor = document.getElementById("modal-humor");
const modalBio = document.getElementById("modal-bio");

const pinRanks = new Set([1, 2, 3, 4]);

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join("");
}

function avatarSvg(name, variant = "bg") {
  const ini = initials(name);
  const safe = encodeURIComponent(name);
  const bg = variant === "bg"
    ? `
      <defs>
        <linearGradient id="g-${safe}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8b5cf6"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="88" fill="url(#g-${safe})"/>
      <circle cx="384" cy="110" r="84" fill="rgba(255,255,255,0.14)"/>
      <circle cx="120" cy="412" r="96" fill="rgba(255,255,255,0.10)"/>
      <text x="50%" y="56%" text-anchor="middle" font-size="132" font-weight="800" fill="#ffffff" font-family="Arial, sans-serif">${ini}</text>
      <text x="50%" y="75%" text-anchor="middle" font-size="28" font-weight="600" fill="rgba(255,255,255,0.88)" font-family="Arial, sans-serif">XII RPL 1</text>
    `
    : `
      <rect width="512" height="512" rx="88" fill="transparent"/>
      <circle cx="256" cy="168" r="86" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="14"/>
      <path d="M130 408c18-78 72-118 126-118s108 40 126 118" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="14" stroke-linecap="round"/>
      <text x="50%" y="86%" text-anchor="middle" font-size="88" font-weight="800" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif">${ini}</text>
    `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      ${bg}
    </svg>
  `)}`;
}

function memberCard(member) {
  const isPin = pinRanks.has(member.rank);
  return `
    <article class="member-card glass" data-name="${member.name}">
      <div class="member-card__bg">
        <img class="member-avatar" src="${avatarSvg(member.name, "bg")}" alt="${member.name}" />
        <span class="member-rank ${isPin ? "pin" : ""}">${isPin ? "PIN " + member.rank : "#" + member.rank}</span>
      </div>
      <div class="member-info">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
        <div class="tag-row">
          <span class="tag">Humor: ${member.humor}</span>
          <span class="tag">Hobi: ${member.hobby}</span>
        </div>
      </div>
    </article>
  `;
}

function renderDashboard() {
  dashboardGrid.innerHTML = members.map(memberCard).join("");
}

function renderMemberList() {
  memberList.innerHTML = members.map(member => `
    <div class="member-row">
      <img src="${avatarSvg(member.name, "plain")}" alt="${member.name}" />
      <div class="row-text">
        <h4>${member.name}</h4>
        <p>${member.role} · ${member.humor}</p>
      </div>
    </div>
  `).join("");
}

function openModal(member) {
  modalImage.src = avatarSvg(member.name, "plain");
  modalRole.textContent = member.role;
  modalName.textContent = member.name;
  modalNickname.textContent = `Rank ${member.rank} · ${member.humor}`;
  modalHobby.textContent = member.hobby;
  modalHumor.textContent = member.humor;
  modalBio.textContent = member.bio;
  modalBackdrop.classList.add("open");
  document.body.classList.add("modal-open");
  modalBackdrop.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modalBackdrop.classList.remove("open");
  document.body.classList.remove("modal-open");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (event) => {
  const card = event.target.closest(".member-card");
  if (card) {
    const member = members.find(item => item.name === card.dataset.name);
    if (member) openModal(member);
  }
});

modalClose.addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === activeId);
        });
      }
    });
  },
  {
    root: null,
    threshold: 0.45,
    rootMargin: "-12% 0px -55% 0px"
  }
);

sections.forEach(section => observer.observe(section));

renderDashboard();
renderMemberList();
