const spotlightTrack = document.getElementById("spotlight-track");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .section");
const rail = document.querySelector(".spotlight-rail");

const spotlightCards = [
  {
    title: "X RPL 1",
    label: "Berawal dari Kelas",
    desc: "Awal perjalanan dimulai di SMKN 1 Karang Baru, tepatnya di kelas X RPL 1, dengan wali kelas Ibu Rini Deliana, S.T., M.Pd.",
    image: "foto/default.jpeg",
  },
  {
    title: "X RPL 2",
    label: "Berawal dari Kelas",
    desc: "Awal perjalanan dimulai di SMKN 1 Karang Baru, tepatnya di kelas X RPL 2, dengan wali kelas Ibu Lenni Harahap, S.Pd.",
    image: "foto/rpl2.jpeg",
  },
  {
    title: "XI RPL 1",
    label: "Kisah dimulai pada kelas",
    desc: "Kisah kami dimulai pada kelas XI, saat kami dipersatukan di kelas XI RPL 1 dengan wali kelas Ibu Hanifah, S.Pd.",
    image: "foto/XI.jpeg",
  },
  {
    title: "XI RPL 1 dan XII RPL 1",
    label: "Berkarya di Lab",
    desc: "berkarya dan menikmati pembelajaran coding bersama bapak coding kami yaitu bapak Safrizal, S. ST",
    image: "foto/lab.jpeg",
  },
  {
    title: "XII RPL 1",
    label: "Berakhir di kelas",
    desc: "Perjalanan kami berakhir di kelas XII RPL 1 bersama ibu coding sekaligus wali kelas kami yaitu ibu Linda Hariani Nasution, S. Si",
    image: "foto/XII.jpeg",
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

  let isDragging = false;

  // deteksi drag (mobile + desktop)
  if (rail) {
    rail.addEventListener("touchstart", () => {
      isDragging = false;
    });

    rail.addEventListener("touchmove", () => {
      isDragging = true;
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // kalau habis drag → abaikan click
      if (isDragging) return;

      e.stopPropagation();

      const isActive = card.classList.contains("active");

      if (isActive) {
        // toggle OFF
        card.classList.remove("active");
      } else {
        // aktifkan satu saja
        cards.forEach((item) => item.classList.remove("active"));
        card.classList.add("active");
      }
    });
  });

  // klik luar → reset
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".spotlight-card")) {
      cards.forEach((c) => c.classList.remove("active"));
    }
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
