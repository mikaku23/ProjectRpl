const albumTrack = document.getElementById("album-track");

const albumItems = [
  {
    image: "foto/f1.jpeg",
    label: "Momen 01",
    title: "Foto Kelas",
    desc: "Dokumentasi foto terakhir sekolah.",
  },
  {
    image: "foto/f2.jpeg",
    label: "Momen 02",
    title: "Kebersamaan XII",
    desc: "Foto kelas di momen terakhir.",
  },
  {
    image: "foto/f9.jpeg",
    label: "Momen 03",
    title: "Kenangan XII",
    desc: "Penutup perjalanan sebelum lulus.",
  },
  {
    image: "foto/f5.jpeg",
    label: "Momen 04",
    title: "Kenangan XII",
    desc: "Penutup perjalanan sebelum lulus.",
  },
  {
    image: "foto/f6.jpeg",
    label: "Momen 05",
    title: "Kenangan XII",
    desc: "Penutup perjalanan sebelum lulus.",
  },
  {
    image: "foto/f7.jpeg",
    label: "Momen 06",
    title: "Kenangan XII",
    desc: "Penutup perjalanan sebelum lulus.",
  },
  {
    image: "foto/f3.jpeg",
    label: "Momen 07",
    title: "Wali Kelas XII",
    desc: "Foto bersama wali kelas yang selalu mendukung perjalanan kami.",
  },
  {
    image: "foto/f8.jpeg",
    label: "Momen 08",
    title: "Bapak Coding Kami",
    desc: "Foto bersama guru coding yang telah membimbing kami.",
  },
  {
    image: "foto/XI.jpeg",
    label: "Momen 09",
    title: "Wali Kelas XI",
    desc: "Foto bersama wali kelas yang telah mendukung awal perjalanan kami.",
  },
  {
    image: "foto/default.jpeg",
    label: "Momen 10",
    title: "Wali Kelas Pertama X RPL 1",
    desc: "Foto bersama wali kelas yang sangat berharga.",
  },
  {
    image: "foto/rpl2.jpeg",
    label: "Momen 11",
    title: "Wali Kelas Pertama X RPL 2",
    desc: "Foto bersama wali kelas yang sangat berharga.",
  },
];

function buildAlbumCard(item) {
  return `
    <article class="album-card glass" tabindex="0">
      <img class="album-card__img" src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="album-card__overlay">
        <div class="album-card__content">
          <span class="album-kicker">${item.label}</span>
          <h4 class="album-card__title">${item.title}</h4>
          <p class="album-card__desc">${item.desc}</p>
        </div>
      </div>
    </article>
  `;
}

function renderAlbum() {
  if (!albumTrack) return;
  albumTrack.innerHTML = albumItems.map(buildAlbumCard).join("");
}

renderAlbum();
initScrollReveal();
// ================= AUDIO =================

const music = document.getElementById("album-music");
const toggleBtn = document.getElementById("music-toggle");
const icon = toggleBtn?.querySelector(".music-icon");
const progressBar = document.querySelector(".progress-bar");
const timeDisplay = document.getElementById("music-time");

let isPlaying = false;
let playPending = false;

const circumference = 2 * Math.PI * 18;

function formatTime(seconds) {
  if (!seconds || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function setPlayingState(playing) {
  isPlaying = playing;

  if (icon) {
    icon.innerHTML = playing
      ? '<i class="fa-solid fa-pause"></i>'
      : '<i class="fa-solid fa-play"></i>';
  }

  if (toggleBtn) {
    toggleBtn.classList.toggle("playing", playing);
  }

  // ⬇️ ini bagian penting: kontrol teks
  if (timeDisplay && !playing && music.currentTime === 0) {
    timeDisplay.textContent = "play";
  }
}

function resetProgress() {
  if (progressBar) {
    progressBar.style.strokeDashoffset = circumference;
  }
}

function updateProgress() {
  if (!music || !progressBar || !music.duration || Number.isNaN(music.duration))
    return;

  const progress = music.currentTime / music.duration;
  progressBar.style.strokeDashoffset = circumference * (1 - progress);

  if (timeDisplay) {
    const remaining = music.duration - music.currentTime;
    timeDisplay.textContent = formatTime(remaining);
  }
}

if (music && toggleBtn && icon && progressBar && timeDisplay) {
  music.volume = 0.3;

  progressBar.style.strokeDasharray = `${circumference}`;
  resetProgress();

  // ⬇️ state awal
  setPlayingState(false);
  timeDisplay.textContent = "play";

  toggleBtn.addEventListener("click", async () => {
    try {
      if (!isPlaying) {
        playPending = true;
        await music.play();
        setPlayingState(true);
      } else {
        music.pause();
        setPlayingState(false);
      }
    } catch (err) {
      console.warn("Audio gagal diputar:", err);
      setPlayingState(false);
    } finally {
      playPending = false;
    }
  });

  music.addEventListener("loadedmetadata", () => {
    resetProgress();
  });

  music.addEventListener("timeupdate", updateProgress);

  music.addEventListener("ended", () => {
    setPlayingState(false);
    resetProgress();

    if (timeDisplay) {
      timeDisplay.textContent = "00:00";
    }

    music.currentTime = 0;
  });

  window.addEventListener("scroll", () => {
    if (!isPlaying || playPending) return;

    const section = document.getElementById("album");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const keluar = rect.bottom < 0 || rect.top > window.innerHeight;

    if (keluar) {
      music.pause();
      setPlayingState(false);
    }
  });
} else {
  console.warn("Elemen audio atau tombol play belum lengkap.");
}