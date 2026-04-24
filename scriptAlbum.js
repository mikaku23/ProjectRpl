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
