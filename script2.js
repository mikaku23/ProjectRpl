const spotlightTrack = document.getElementById("spotlight-track");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .section");
const rail = document.querySelector(".spotlight-rail");

const spotlightCards = [
  {
    title: "Langkah Terarah",
    label: "Identitas 01",
    desc: "Kartu ini menampilkan karakter yang rapi, tenang, dan konsisten dalam menjaga ritme kerja.",
    image: "foto/default.jpeg",
  },
  {
    title: "Ruang Fokus",
    label: "Identitas 02",
    desc: "Tampilan dibuat modern, bersih, dan menonjolkan kesan aktif saat kartu dibuka.",
    image: "foto/default.jpeg",
  },
  {
    title: "Pusat Ide",
    label: "Identitas 03",
    desc: "Efek blur dan teks naik digunakan untuk memberi kesan premium dan interaktif.",
    image: "foto/default.jpeg",
  },
  {
    title: "Arah Baru",
    label: "Identitas 04",
    desc: "Kartu bergerak perlahan ke samping agar tampilan terasa hidup tanpa terlalu ramai.",
    image: "foto/default.jpeg",
  },
  {
    title: "Jejak Prestasi",
    label: "Identitas 05",
    desc: "Setiap kartu memiliki identitas visual yang berbeda, tetapi tetap satu gaya dengan tema utama.",
    image: "foto/default.jpeg",
  },
];

function buildSpotlightCard(item) {
  return `
    <article class="spotlight-card" tabindex="0">
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="spotlight-overlay">
        <div class="spotlight-text">
          <span class="spotlight-kicker">${item.label}</span>
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      </div>
    </article>
  `;
}

function renderSpotlightCards() {
  if (!spotlightTrack) return;

  spotlightTrack.innerHTML = spotlightCards.map(buildSpotlightCard).join("");

  const cards = spotlightTrack.querySelectorAll(".spotlight-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const isActive = card.classList.contains("active");

      // reset semua
      cards.forEach((item) => item.classList.remove("active"));

      // toggle
      if (!isActive) {
        card.classList.add("active");
      }
    });
  });
}

/* ===== NAV SCROLL ACTIVE ===== */
function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === id);
  });
}

function onScroll() {
  const scrollPos = window.scrollY;
  const header = document.querySelector(".site-header");
  const headerOffset = header ? header.offsetHeight + 10 : 0;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerOffset;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      currentSection = section.id;
    }
  });

  if (currentSection) {
    setActiveLink(currentSection);
  }
}

/* ===== DRAG SCROLL ===== */
if (rail) {
  let isDown = false;
  let startX;
  let scrollLeft;

  rail.addEventListener("mousedown", (e) => {
    isDown = true;
    rail.classList.add("dragging");
    startX = e.pageX - rail.offsetLeft;
    scrollLeft = rail.scrollLeft;
  });

  rail.addEventListener("mouseleave", () => {
    isDown = false;
  });

  rail.addEventListener("mouseup", () => {
    isDown = false;
  });

  rail.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - rail.offsetLeft;
    const walk = (x - startX) * 1.5;
    rail.scrollLeft = scrollLeft - walk;
  });
}

/* ===== INIT ===== */
window.addEventListener("scroll", onScroll);
renderSpotlightCards();
onScroll();
