const members = [
  {
    name: "Fajar Alfa Rizky",
    role: "Ketua Kelas",
    urutan: 1,
    hobby: "Memimpin, mengorganisir",
    humor: "Tegas, bertanggung jawab",
    bio: "Kelas bisa apa tanpa aku",
    prestasi: [
      "Juara 3 dan 5 Lomba Kihajar STEM Tingkat Provinsi Aceh Tahun 2024",
    ],
  },
  {
    name: "Muhammad Haliq Maulana",
    role: "Wakil Ketua Kelas",
    urutan: 2,
    hobby: "Strategi, problem solving",
    humor: "Presisi, cerdik",
    bio: "Aku admin besar (kalau pajar ga datang)",
    image: "foto/haliq.jpeg", // untuk card
    imageModal: "foto/haliq-bg.png", // untuk modal (tanpa background)
    prestasi: [
      "Excelent from 15 participants in the competition In National",
      "Juara 1 Lomba IT Software Solution For Bussiness Tingkat Provinsi Aceh tahun 2025",
      "Juara 3 Lomba Kihajar STEM Tingkat Provinsi Aceh Tahun 2024",
    ],
  },
  {
    name: "Nadya Febriasari",
    role: "Sekretaris",
    urutan: 3,
    hobby: "Menulis, menghafal",
    humor: "Ceria, peduli",
    bio: "Nadya Febriasari berperan mencatat dan merapikan informasi agar administrasi kelas tetap tertata.",
    image: "foto/nadya.jpeg", // untuk card
    imageModal: "foto/nadya-bg.png",
    prestasi: [],
  },
  {
    name: "Syarifah Shabrina",
    role: "Bendahara",
    urutan: 4,
    hobby: "Public speaking, management",
    humor: "Aktif, komunikatif, ENTP",
    bio: "Tempat setor uang + pusat kendali keuangan kelas. Dari kumpul dana, booking, sampai pembayaran biar aku yang urus, kalian tinggal nikmatin acara. Intinya kalian yang patungan, saya yang pusing",
    image: "foto/sabrina.jpeg", // untuk card
    imageModal: "foto/sabrina-bg.png",
    prestasi: [
      "Duta Lingkungan Kabupaten Aceh Tamiang Putri",
      "Juara 1 Monolog",
      "Juara 5 Lomba Kihajar STEM Tingkat Provinsi Aceh Tahun 2024",
    ],
  },
  {
    name: "Angga Saputra",
    role: "Anggota Kelas",
    urutan: 5,
    hobby: "Berhitung, memahami konsep",
    humor: "Ramah, ceria",
    bio: "Angga Saputra merupakan bagian dari struktur anggota kelas XII RPL 1.",
    image: "foto/angga.jpeg", // untuk card
    imageModal: "foto/angga-bg.png",
    prestasi: ["Juara 5 Lomba Kihajar STEM Tingkat Provinsi Aceh Tahun 2024"],
  },
  {
    name: "Andika Setiawan",
    role: "Anggota Kelas",
    urutan: 6,
    hobby: "Menyelesaikan tugas teknis",
    humor: "Logis, kritis",
    bio: "Andika Setiawan terdaftar sebagai anggota kelas dengan peran yang sama pentingnya dalam dinamika kelas.",
    image: "foto/dika.jpeg", // untuk card
    imageModal: "foto/dika-bg.png",
    prestasi: [],
  },
  {
    name: "Alvin Marliansyah",
    role: "Anggota Kelas",
    urutan: 7,
    hobby: "Olahraga, praktik",
    humor: "Ceria, ramah",
    bio: "Alvin Marliansyah menjadi bagian dari anggota yang mendukung aktivitas kelas.",
    image: "foto/alpin.jpeg", // untuk card
    imageModal: "foto/alpin-bg.png",
    prestasi: ["Futsal", "E Sport Mobile Legends"],
  },
  {
    name: "Hafiz Maulana",
    role: "Anggota Kelas",
    urutan: 8,
    hobby: "Drawing, imajinasi tinggi dan membuat meme",
    humor: "humoris, kreatif dan imajinatif",
    bio: "Hafis Maulana termasuk anggota kelas XII RPL 1 yang terdata dalam daftar resmi.",
    image: "foto/hafis.jpeg", // untuk card
    imageModal: "foto/hafis-bg.png",
    prestasi: ["E Sport Mobile Legends"],
  },
  {
    name: "Fahrezi",
    role: "Anggota Kelas",
    urutan: 9,
    hobby: "bermain gim strategi",
    humor: "Ceria, lincah",
    bio: "Fahrezi tercatat sebagai anggota kelas dengan identitas yang ditampilkan pada daftar anggota.",
    prestasi: ["E Sport Mobile Legends"],
  },
  {
    name: "Hafief Al Luthfi",
    role: "Anggota Kelas",
    urutan: 10,
    hobby: "Membaca, memahami konsep",
    humor: "Logic, cerdas",
    bio: "Hafief Al Luthfi menjadi bagian dari anggota yang mewakili kelas XII RPL 1.",
    image: "foto/hafif.png", // untuk card
    imageModal: "foto/hafif-bg.png",
    prestasi: ["E Sport Mobile Legends"],
  },
  {
    name: "Salwa Khalisha",
    role: "Anggota Kelas",
    urutan: 11,
    hobby: "Memahami materi, berhitung",
    humor: "Teliti, mandiri, ISTJ",
    bio: "Salwa Khalisha tercantum sebagai anggota kelas dengan tampilan kartu individual.",
    image: "foto/salwa.jpeg", // untuk card
    imageModal: "foto/salwa-bg.png",
    prestasi: ["Juara 3 Lomba Kihajar STEM Tingkat Provinsi Aceh Tahun 2024"],
  },
  {
    name: "T Rizka Namira",
    role: "Anggota Kelas",
    urutan: 12,
    hobby: "Menulis, berhitung",
    humor: "Ceria, ramah",
    bio: "T Rizka Namira merupakan anggota kelas yang dimasukkan ke daftar lengkap dashboard.",
    image: "foto/rizka.png", // untuk card
    imageModal: "foto/rizka-bg.png",
    prestasi: [],
  },
  {
    name: "Nadya Kaputri",
    role: "Anggota Kelas",
    urutan: 13,
    hobby: "Memahami materi, Kesenian",
    humor: "Cerdas, kreatif dan ceria",
    bio: "Nadia Kaputri menempati satu kartu khusus pada tampilan anggota kelas.",
    image: "foto/kaput.jpeg", // untuk card
    imageModal: "foto/kaput-bg.png",
    prestasi: [],
  },
  {
    name: "Sri Mutia Wahyuni",
    role: "Anggota Kelas",
    urutan: 14,
    hobby: "Menulis, mencatat informasi",
    humor: "Pintar, teliti",
    bio: "Sri Mutia Wahyuni termasuk bagian dari susunan lengkap kelas XII RPL 1.",
    image: "foto/sri.jpeg", // untuk card
    imageModal: "foto/sri-bg.png",
    prestasi: [
      "Paskibraka Kabupaten Aceh Tamiang tahun 2024",
      "Juara 1 Lomba Atletik",
      "Paskibraka Lomba Lentera class three",
      "Juara 3 Lomba Kihajar STEM Tingkat Provinsi Aceh Tahun 2024",
    ],
  },
  {
    name: "Rani Bila Aulia",
    role: "Anggota Kelas",
    urutan: 15,
    hobby: "Membaca, menulis",
    humor: "Ceria, aktif",
    bio: "Rani Bila Aulia menjadi salah satu anggota yang ditampilkan dalam kartu tersendiri.",
    image: "foto/rani.jpeg", // untuk card
    imageModal: "foto/rani-bg.png",
    prestasi: [],
  },
  {
    name: "Salsabila Zahra",
    role: "Anggota Kelas",
    urutan: 16,
    hobby: "Menulis ide, mendukung kerja tim",
    humor: "Ceria, humoris",
    bio: "Salsabila Zahra merupakan bagian dari data anggota kelas XII RPL 1.",
    image: "foto/caca.jpeg", // untuk card
    imageModal: "foto/caca-bg.png",
    prestasi: ["Lomba Badminton"],
  },
  {
    name: "Mawaddah",
    role: "Anggota Kelas",
    urutan: 17,
    hobby: "Drawing, berimajinasi",
    humor: "Bijak, teliti",
    bio: "Mawaddah ditampilkan sebagai anggota kelas pada daftar utama.",
    image: "foto/mawad.png",
    imageModal: "foto/mawad-bg.png",
    prestasi: [],
  },
  {
    name: "Dinda Musthakillah",
    role: "Anggota Kelas",
    urutan: 18,
    hobby: "Mengelola catatan",
    humor: "Konsisten, fokus",
    bio: "Dinda Musthakillah menjadi salah satu kartu anggota dalam struktur kelas.",
    image: "foto/dinda.png",
    imageModal: "foto/dinda-bg.png",
    prestasi: [],
  },
  {
    name: "Wan Cahaya Balqis",
    role: "Anggota Kelas",
    urutan: 19,
    hobby: "Menulis, membaca",
    humor: "Ramah, kreatif ",
    bio: "Wan Cahaya Balkis tercatat sebagai anggota kelas XII RPL 1.",
    prestasi: [],
  },
  {
    name: "Eliza Amanda",
    role: "Anggota Kelas",
    urutan: 20,
    hobby: "Menulis, membaca",
    humor: "Ceria, penolong",
    bio: "Eliza Amanda tampil sebagai bagian dari susunan kelas pada dashboard.",
    image: "foto/eliza.jpeg", // untuk card
    imageModal: "foto/eliza-bg.png", // untuk modal (tanpa background)
    prestasi: [],
  },
  {
    name: "Naila Aisyah Rinaldi",
    role: "Anggota Kelas",
    urutan: 21,
    hobby: "Mencari informasi, menulis",
    humor: "Ceria, kreatif",
    bio: "Naila Aisyah Rinaldi menutup daftar siswa lengkap XII RPL 1 pada tampilan ini.",
    prestasi: [],
  },
];

const dashboardGrid = document.getElementById("dashboard-grid");
const memberList = document.getElementById("member-list");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalClose = document.getElementById("modal-close");
const modalImage = document.getElementById("modal-image");
const modalRole = document.getElementById("modal-role");
const modalName = document.getElementById("modal-name");
const modalNickname = document.getElementById("modal-nickname");
const modalHobby = document.getElementById("modal-hobby");
const modalHumor = document.getElementById("modal-humor");
const modalBio = document.getElementById("modal-bio");
const modalPrestasi = document.getElementById("modal-prestasi");

const pinurutans = new Set([1, 2, 3, 4]);

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function avatarSvg(name, variant = "bg") {
  const ini = initials(name);
  const safe = encodeURIComponent(name);

  const bg =
    variant === "bg"
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

function getMemberImage(member, variant = "bg") {
  if (variant === "modal" && member.imageModal) {
    return member.imageModal;
  }

  if (member.image) {
    return member.image;
  }

  return avatarSvg(member.name, variant);
}

function memberCard(member) {
  return `
    <article class="member-card glass" data-name="${member.name}">
      <div class="member-card__bg">
        <img class="member-avatar" src="${getMemberImage(member, "bg")}" alt="${member.name}" />
      </div>
      <div class="member-info">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
        <div class="tag-row">
          <span class="tag">Karakter: ${member.humor}</span>
          <span class="tag">Keahlian: ${member.hobby}</span>
        </div>
      </div>
    </article>
  `;
}

function renderDashboard() {
  dashboardGrid.innerHTML = members.map(memberCard).join("");
}

function renderMemberList() {
  memberList.innerHTML = members
    .map(
      (member) => `
    <div class="member-row">
      <img src="${getMemberImage(member, "plain")}" alt="${member.name}" />
      <div class="row-text">
        <h4>${member.name}</h4>
        <p>${member.role} · ${member.humor}</p>
      </div>
    </div>
  `,
    )
    .join("");
}

function openModal(member) {
  modalImage.src = getMemberImage(member, "modal");
  modalRole.textContent = member.role;
  modalName.textContent = member.name;
  modalNickname.textContent = `urutan ${member.urutan} · ${member.humor}`;
  modalHobby.textContent = member.hobby;
  modalHumor.textContent = member.humor;
  modalBio.textContent = member.bio;

  // render prestasi
  if (member.prestasi && member.prestasi.length > 0) {
    modalPrestasi.innerHTML = member.prestasi
      .map((item) => `<li>${item}</li>`)
      .join("");
  } else {
    modalPrestasi.innerHTML = `<li>Tidak ada prestasi</li>`;
  }

  modalBackdrop.classList.add("open");
  document.body.classList.add("modal-open");
  modalBackdrop.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modalBackdrop.classList.remove("open");
  document.body.classList.remove("modal-open");
  modalBackdrop.setAttribute("aria-hidden", "true");

  modalPrestasi.innerHTML = "";
}

document.addEventListener("click", (event) => {
  const card = event.target.closest(".member-card");
  if (!card) return;

  const member = members.find((item) => item.name === card.dataset.name);
  if (member) openModal(member);
});

modalClose.addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

renderDashboard();
renderMemberList();
initScrollReveal();

function initScrollReveal() {
  const targets = document.querySelectorAll(`
    .section-heading,
    .spotlight-section,
    .stats-row .stat-card,
    .card-grid .member-card,
    .two-column .info-card,
    .member-list .member-row,
    .prestasi-section,
    .album-section
  `);

  targets.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${(index % 6) * 60}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -5% 0px",
    },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

window.addEventListener("load", initScrollReveal);