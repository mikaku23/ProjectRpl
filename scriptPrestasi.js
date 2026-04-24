const prestasiTrack = document.getElementById("prestasi-track");
const prestasiBackdrop = document.getElementById("prestasi-modal-backdrop");
const prestasiClose = document.getElementById("prestasi-modal-close");
const prestasiModalLabel = document.getElementById("prestasi-modal-label");
const prestasiModalTitle = document.getElementById("prestasi-modal-title");
const prestasiModalDesc = document.getElementById("prestasi-modal-desc");
const prestasiModalGrid = document.getElementById("prestasi-modal-grid");

let closeGridTimer = null;

const prestasiGroups = [
  {
    label: "2 Prestasi",
    title: "Syarifah Shabrina",
    desc: "Siswi SMK Negeri 1 Karang Baru",
    items: [
      {
        image: "foto/p1.jpeg",
        name: "Duta Lingkungan Kabupaten Aceh Tamiang Putri",
        competition: "Duta Siswa/Siswi Kabupaten Aceh Tamiang",
        award: "15 Agustus 2024",
      },
      {
        image: "foto/p2.jpeg",
        name: "Juara 1 Monolog",
        competition: "FLS2N SMK/SMA Tahun 2025",
        award: "12 Juli 2025",
      },
    ],
  },
  {
    label: "3 Prestasi",
    title: "Sri Mutia Wahyuni",
    desc: "Siswi SMK Negeri 1 Karang Baru",
    items: [
      {
        image: "foto/p3.jpeg",
        name: "Paskibraka Kabupaten Aceh Tamiang tahun 2024",
        competition: "Upacara HUT RI ke-79 Kabupaten Aceh Tamiang",
        award: "17 Agustus 2024",
      },
      {
        image: "foto/p4.jpeg",
        name: "Juara 1 Lomba Atletik",
        competition: "Atletik Antar Pelajar Kabupaten Aceh Tamiang Tahun 2023",
        award: "21 Desember 2023",
      },
      {
        image: "foto/p5.jpeg",
        name: "Paskibraka Lomba Lentera class three",
        competition:
          "Lomba Lentera class three Kabupaten Aceh Tamiang Tahun 2025",
        award: "26 Mei 2025",
      },
    ],
  },
  {
    label: "2 Prestasi",
    title: "Muhammad Haliq Maulana",
    desc: "Siswa SMK Negeri 1 Karang Baru",
    items: [
      {
        image: "foto/p8.jpeg",
        name: "Excelent from 15 participants in the competition",
        competition:
          "LKSN Teknologi Informasi Piranti Lunak untuk Bisnis Tingkat Nasional tahun 2025",
        award: "Jakarta/Jawa Barat, 27 Juli - 01 Agustus 2025",
      },
      {
        image: "foto/p10.jpeg",
        name: "Juara 1 Lomba IT Software Solution For Bussiness",
        competition:
          "LKSN IT Software Solution For Bussiness Tingkat Provinsi Aceh tahun 2025",
        award: "Meulaboh, Aceh Barat, 13 - 17 Juni 2025",
      },
    ],
  },
  {
    label: "1 prestasi",
    title: "Salsabila Zahra",
    desc: "Siswi SMK Negeri 1 Karang Baru",
    items: [
      {
        image: "foto/p6.jpeg",
        name: "Lomba Badminton",
        competition:
          "Lomba Badminton Antar Pelajar Kabupaten Aceh Tamiang Tahun 2023",
        award: "21 Desember 2023",
      },
    ],
  },
  {
    label: "1 Prestasi",
    title: "",
    desc: "oleh Hafiz Maulana, Hafief Al Luthfi, Alvin Marliansyah, Fajar Alfa Rizky, dan Andika Setiawan",
    items: [
      {
        image: "foto/p7.jpeg",
        name: "E Sport Mobile Legends",
        competition:
          "Lomba E Sport Mobile Legends Antar Kelas SMK Negeri 1 Karang Baru tahun 2024",
        award: "17 Agustus 2024",
      },
    ],
  },
  {
    label: "2 Prestasi",
    title: "Juara 3 dan 5 Tingkat Provinsi Aceh ",
    desc: "Oleh 2 tim yaitu (Muhammad Haliq Maulana, Sri Mutia Wahyuni, Salwa Khalisha) dan (Syarifah Shabrina, Fajar Alfa Risky, Angga Saputra)",
    items: [
      {
        image: "foto/p13.jpeg",
        name: "Juara 3 dan 5 Lomba Kihajar STEM Tingkat Provinsi Aceh Tahun 2024",
        competition: "Kihajar STEM Tingkat Provinsi Aceh Tahun 2024",
        award: "10 Agustus 2024",
      },
    ],
  },
  {
    label: "4 Prestasi",
    title: "XI RPL 1",
    desc: "SMK Negeri 1 Karang Baru",
    items: [
      {
        image: "foto/p11.jpeg",
        name: "Piagam Penghargaan untuk Top 4 kelas Terbersih 2025, Juara 3 futsal antar jurusan, dan Akreditasi A dalam Lomba kelas Terbaik antar jurusan",
        competition: "SMK Negeri 1 Karang Baru Tahun 2025",
        award: "17 Agustus 2025",
      },
      {
        image: "foto/p12.jpeg",
        name: "XI RPL 1",
        competition: "Siswa - siswi kelas XI RPL 1 SMK Negeri 1 Karang Baru",
        award: "17 Agustus 2025",
      },
    ],
  },
];

function buildPreviewStack(items) {
  if (!items || items.length === 0) return "";

  if (items.length === 1) {
    const item = items[0];
    return `
      <img
        class="prestasi-stack__img prestasi-stack__img--single"
        src="${item.image}"
        alt="${item.name}"
        loading="lazy"
        style="z-index:3;"
      />
    `;
  }

  const previews = items.slice(0, 3);

  return previews
    .map(
      (item, index) => `
        <img
          class="prestasi-stack__img"
          src="${item.image}"
          alt="${item.name}"
          loading="lazy"
          style="z-index:${3 - index};"
        />
      `,
    )
    .join("");
}

function buildPrestasiCard(group, index) {
  return `
    <article class="prestasi-card glass" data-group-index="${index}" tabindex="0">
      <div class="prestasi-card__media">
        <div class="prestasi-stack">
          ${buildPreviewStack(group.items)}
        </div>
        <div class="prestasi-card__overlay">
          <div class="prestasi-card__content">
            <span class="prestasi-kicker">${group.label}</span>
            <h4 class="prestasi-card__title">${group.title}</h4>
            <p class="prestasi-card__desc">${group.desc}</p>
            <button class="prestasi-card__cta" type="button">Lihat semua</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function buildModalItem(item) {
  return `
    <article class="prestasi-result-card">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="prestasi-result-text">
        <h4>${item.name}</h4>
        <p>${item.competition}</p>
        <span>${item.award}</span>
      </div>
    </article>
  `;
}

function applyGridMode(total) {
  prestasiModalGrid.classList.remove("is-1", "is-2");

  if (total === 1) {
    prestasiModalGrid.classList.add("is-1");
  } else if (total === 2) {
    prestasiModalGrid.classList.add("is-2");
  }
}

function openPrestasiModal(group) {
  if (closeGridTimer) {
    clearTimeout(closeGridTimer);
    closeGridTimer = null;
  }

  prestasiModalLabel.textContent = group.label;
  prestasiModalTitle.textContent = group.title;
  prestasiModalDesc.textContent = group.desc;
  prestasiModalGrid.innerHTML = group.items.map(buildModalItem).join("");

  applyGridMode(group.items.length);

  prestasiBackdrop.classList.add("open");
  document.body.classList.add("prestasi-modal-open");
  prestasiBackdrop.setAttribute("aria-hidden", "false");
}

function closePrestasiModal() {
  prestasiBackdrop.classList.remove("open");
  document.body.classList.remove("prestasi-modal-open");
  prestasiBackdrop.setAttribute("aria-hidden", "true");

  if (closeGridTimer) clearTimeout(closeGridTimer);
  closeGridTimer = setTimeout(() => {
    prestasiModalGrid.classList.remove("is-1", "is-2");
    closeGridTimer = null;
  }, 260);
}

function renderPrestasiCards() {
  if (!prestasiTrack) return;
  prestasiTrack.innerHTML = prestasiGroups.map(buildPrestasiCard).join("");
}

if (prestasiTrack) {
  prestasiTrack.addEventListener("click", (event) => {
    const card = event.target.closest(".prestasi-card");
    if (!card) return;

    const index = Number(card.dataset.groupIndex);
    const group = prestasiGroups[index];
    if (group) openPrestasiModal(group);
  });

  prestasiTrack.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const card = event.target.closest(".prestasi-card");
    if (!card) return;

    event.preventDefault();
    const index = Number(card.dataset.groupIndex);
    const group = prestasiGroups[index];
    if (group) openPrestasiModal(group);
  });
}

if (prestasiBackdrop) {
  prestasiBackdrop.addEventListener("click", (event) => {
    if (event.target === prestasiBackdrop) {
      closePrestasiModal();
    }
  });
}

if (prestasiClose) {
  prestasiClose.addEventListener("click", (event) => {
    event.stopPropagation();
    closePrestasiModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePrestasiModal();
  }
});

renderPrestasiCards();
