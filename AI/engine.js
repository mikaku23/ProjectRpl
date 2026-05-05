import {
  schoolData,
  aboutText,
  learningFocus,
  classCharacter,
  prestasiGroups,
  members,
  memberFields,
  spotlightCards,
  albumItems,
} from "./data.js";

import { intents, quickSuggestions } from "./intents.js";
import { getContext, setContext } from "./context.js";

import {
  normalizeNumbersAndAbbrev,
  EXTRA_TYPO_MAP,
  bonusNameScore,
  detectNegation,
  handleNegation,
  resolveAmbiguousFollowUp,
  detectComparison,
  formatComparison,
  buildSmartFallback,
} from "./logic.js";

// ======================
// TYPO MAP
// ======================

const TYPO_MAP = {
  ketu: "ketua",
  ketau: "ketua",
  angota: "anggota",
  anggta: "anggota",
  prestsi: "prestasi",
  prestaasi: "prestasi",
  prestasii: "prestasi",
  jadwl: "jadwal",
  senen: "senin",
  almbum: "album",
  albm: "album",
  albun: "album",
  profill: "profil",
  profl: "profil",
  skolah: "sekolah",
  sekolahh: "sekolah",
  skola: "sekolah",
  walikelas: "wali kelas",
  wakilketua: "wakil ketua",
  wakilkelas: "wakil kelas",
  sekretari: "sekretaris",
  sekretarius: "sekretaris",
  bendahar: "bendahara",
  bendahrar: "bendahara",
  fot: "foto",
  footo: "foto",
  alumni: "album",
  anggotta: "anggota",
  meber: "member",
  membr: "member",
  membar: "member",
  hobinya: "hobi",
  hobbinya: "hobi",
  hobbi: "hobi",
  vsi: "visi",
  msi: "misi",
  jursan: "jurusan",
  jrusan: "jurusan",
  prstasi: "prestasi",
  karater: "karakter",
  karaketer: "karakter",
  sifaat: "sifat",
  infoo: "info",
  imformasi: "informasi",
  infonya: "info",
  siapah: "siapa",
  tanggaal: "tanggal",
  waktuu: "waktu",
  searang: "sekarang",
  skrg: "sekarang",
  skrang: "sekarang",
  kmrn: "kemarin",
  bsok: "besok",
  // merge EXTRA_TYPO_MAP
  ...EXTRA_TYPO_MAP,
};

const SECTION_MAP = {
  dashboard: "dashboard",
  tentang: "tentang",
  prestasi: "prestasi",
  anggota: "anggota",
  album: "album",
};

const NAV_CUES = [
  "buka halaman",
  "buka bagian",
  "arahkan ke",
  "menuju halaman",
  "menuju bagian",
  "tampilkan halaman",
  "tampilkan bagian",
  "pindah ke",
  "scroll ke",
  "pergi ke",
  "navigasi ke",
  "ke halaman",
  "ke bagian",
  "lihat halaman",
  "lihat bagian",
  "akses halaman",
  "akses bagian",
  "tuju halaman",
  "tuju bagian",
];

const DIRECT_SECTION_MAP = {
  sekolah: "dashboard",
  "profil sekolah": "dashboard",
  "info sekolah": "dashboard",
  "informasi sekolah": "dashboard",
  "tentang sekolah": "dashboard",
  "data sekolah": "dashboard",
  smk: "dashboard",
  smkn: "dashboard",
  "smkn 1 karang baru": "dashboard",
  "smkn1 karang baru": "dashboard",
  "karang baru": "dashboard",
  kampus: "dashboard",
  lembaga: "dashboard",
  institusi: "dashboard",
  alamat: "dashboard",
  "alamat sekolah": "dashboard",
  lokasi: "dashboard",
  "lokasi sekolah": "dashboard",
  letak: "dashboard",
  telp: "dashboard",
  telepon: "dashboard",
  "nomor telepon": "dashboard",
  "no telp": "dashboard",
  email: "dashboard",
  "email sekolah": "dashboard",
  kontak: "dashboard",
  "kontak sekolah": "dashboard",
  hubungi: "dashboard",
  visi: "dashboard",
  "visi sekolah": "dashboard",
  "visi smk": "dashboard",
  "tujuan sekolah": "dashboard",
  misi: "dashboard",
  "misi sekolah": "dashboard",
  "misi smk": "dashboard",
  jurusan: "dashboard",
  "pilihan jurusan": "dashboard",
  "program keahlian": "dashboard",
  "kompetensi keahlian": "dashboard",
  rpl: "dashboard",
  pplg: "dashboard",
  "rekayasa perangkat lunak": "dashboard",
  "pengembangan perangkat lunak": "dashboard",
  gim: "dashboard",
  game: "dashboard",
  informatika: "dashboard",
  "teknologi informasi": "dashboard",
  tentang: "tentang",
  "tentang kelas": "tentang",
  cerita: "tentang",
  "cerita kelas": "tentang",
  kisah: "tentang",
  "kisah kelas": "tentang",
  perjalanan: "tentang",
  sejarah: "tentang",
  "sejarah kelas": "tentang",
  "3 tahun": "tentang",
  "tiga tahun": "tentang",
  riwayat: "tentang",
  "riwayat kelas": "tentang",
  "latar belakang": "tentang",
  "rekam jejak": "tentang",
  "asal usul": "tentang",
  "profil kelas": "tentang",
  anggota: "anggota",
  member: "anggota",
  siswa: "anggota",
  "daftar siswa": "anggota",
  "daftar anggota": "anggota",
  "list anggota": "anggota",
  "list siswa": "anggota",
  "semua anggota": "anggota",
  "semua siswa": "anggota",
  "data siswa": "anggota",
  "data anggota": "anggota",
  murid: "anggota",
  "peserta didik": "anggota",
  pelajar: "anggota",
  "teman kelas": "anggota",
  "anak kelas": "anggota",
  prestasi: "prestasi",
  "prestasi kelas": "prestasi",
  "daftar prestasi": "prestasi",
  "list prestasi": "prestasi",
  "semua prestasi": "prestasi",
  "pencapaian kelas": "prestasi",
  "capaian kelas": "prestasi",
  "raihan kelas": "prestasi",
  juara: "prestasi",
  lomba: "prestasi",
  penghargaan: "prestasi",
  kompetisi: "prestasi",
  kejuaraan: "prestasi",
  perlombaan: "prestasi",
  turnamen: "prestasi",
  olimpiade: "prestasi",
  medali: "prestasi",
  trofi: "prestasi",
  piala: "prestasi",
  "hasil lomba": "prestasi",
  "hasil kompetisi": "prestasi",
  album: "album",
  foto: "album",
  dokumentasi: "album",
  momen: "album",
  kenangan: "album",
  galeri: "album",
  gambar: "album",
  "koleksi foto": "album",
  "foto kelas": "album",
  "foto bersama": "album",
  "dokumentasi kelas": "album",
  "arsip foto": "album",
  liputan: "album",
  spotlight: "dashboard",
  "perjalanan kelas": "dashboard",
  "jejak waktu": "dashboard",
  "kelas selama 3 tahun": "dashboard",
  "kisah 3 tahun": "dashboard",
  "timeline kelas": "dashboard",
  "linimasa kelas": "dashboard",
  "highlight kelas": "dashboard",
  "narasi kelas": "dashboard",
  "cerita 3 tahun": "dashboard",
};

const STRUCTURE_RULES = [
  {
    role: "Ketua Kelas",
    label: "Ketua kelas",
    patterns: ["ketua kelas", "ketua"],
  },
  {
    role: "Wakil Ketua Kelas",
    label: "Wakil ketua kelas",
    patterns: ["wakil ketua kelas", "wakil ketua"],
  },
  { role: "Sekretaris", label: "Sekretaris", patterns: ["sekretaris"] },
  { role: "Bendahara", label: "Bendahara", patterns: ["bendahara"] },
];

// ======================
// UTILS
// ======================

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fixCommonTypos(text = "") {
  // 1. Normalisasi angka & singkatan dulu
  let out = normalizeNumbersAndAbbrev(normalizeText(text));
  // 2. Koreksi typo
  for (const [wrong, right] of Object.entries(TYPO_MAP)) {
    out = out.replace(new RegExp(`\\b${escapeRegExp(wrong)}\\b`, "g"), right);
  }
  return out;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenize(text = "") {
  return fixCommonTypos(text).split(" ").filter(Boolean);
}

function similarity(a = "", b = "") {
  const x = normalizeText(a).replace(/\s+/g, "");
  const y = normalizeText(b).replace(/\s+/g, "");
  if (!x || !y) return 0;
  if (x === y) return 1;
  const shorter = x.length <= y.length ? x : y;
  const longer = x.length > y.length ? x : y;
  let same = 0;
  for (const ch of shorter) {
    if (longer.includes(ch)) same += 1;
  }
  return same / longer.length;
}

// ======================
// INTENT SCORING
// ======================

function scoreIntent(message, intent) {
  const msg = fixCommonTypos(message);
  const tokens = tokenize(msg);
  let score = 0;

  for (const keyword of intent.keywords) {
    const key = normalizeText(keyword);
    if (!key) continue;
    if (msg === key) score += 5;
    if (msg.includes(key)) score += 3;
    const keyTokens = key.split(" ").filter(Boolean);
    for (const token of tokens) {
      if (token === key) {
        score += 2.5;
        continue;
      }
      if (keyTokens.length === 1) {
        const sim = similarity(token, key);
        if (sim >= 0.8) score += 1.6;
        else if (sim >= 0.65) score += 0.8;
      }
    }
  }
  return score;
}

function detectIntents(message) {
  const scored = intents
    .map((intent) => ({
      name: intent.name,
      section: intent.section,
      score: scoreIntent(message, intent),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];
  const top = scored[0];
  const second = scored[1];
  if (second && second.score >= top.score * 0.7) return [top, second];
  return [top];
}

function detectSectionAction(message) {
  const msg = fixCommonTypos(message);
  for (const [key, sectionId] of Object.entries(DIRECT_SECTION_MAP)) {
    if (msg === key || msg.includes(key)) return sectionId;
  }
  const hasNavCue = NAV_CUES.some((cue) => msg.includes(cue));
  if (!hasNavCue) return null;
  for (const [name, id] of Object.entries(SECTION_MAP)) {
    if (msg.includes(name)) return id;
  }
  return null;
}

// ======================
// TIME
// ======================

function timeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) return "Selamat pagi";
  if (hour >= 11 && hour < 15) return "Selamat siang";
  if (hour >= 15 && hour < 18) return "Selamat sore";
  return "Selamat malam";
}

function formatTimeNow() {
  const now = new Date();
  const day = now.toLocaleDateString("id-ID", { weekday: "long" });
  const date = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `Waktu saat ini: ${day}, ${date}, pukul ${time}`;
}

// ======================
// SCHOOL
// ======================

function extractBetween(text, startLabel, endLabel) {
  const source = String(text);
  const startIndex = source.indexOf(startLabel);
  if (startIndex === -1) return "";
  const sliceStart = startIndex + startLabel.length;
  const endIndex = endLabel ? source.indexOf(endLabel, sliceStart) : -1;
  if (endIndex === -1) return source.slice(sliceStart).trim();
  return source.slice(sliceStart, endIndex).trim();
}

function getSchoolAnswer(type) {
  const detail = schoolData.detail;
  if (type === "school") return detail;
  if (type === "school_address") {
    return [
      "Alamat: Jl. Ir. H. Juanda, Desa Bundar, Karang Baru – Aceh Tamiang 24476",
      "Telp: 0641-7447003",
      "Email: smkn1karangbaru@gmail.com",
    ].join("\n");
  }
  if (type === "school_vision")
    return extractBetween(detail, "Visi:", "Misi:") || detail;
  if (type === "school_mission")
    return extractBetween(detail, "Misi:", "Jurusan unggulan:") || detail;
  if (type === "major")
    return extractBetween(detail, "Jurusan unggulan:", "") || detail;
  return detail;
}

// ======================
// MEMBER MATCHING
// ======================

function getMemberVariants(member) {
  return [member.name, ...(member.aliases || [])]
    .map((item) => normalizeText(item))
    .filter(Boolean);
}

function scoreMemberMatch(member, query) {
  const q = normalizeText(query);
  if (!q) return 0;
  const qTokens = tokenize(q);
  const nameTokens = tokenize(member.name);
  const variants = getMemberVariants(member);
  let score = 0;

  for (const variant of variants) {
    if (!variant) continue;
    if (q === variant) score += 100;
    if (q.includes(variant)) score += 80;
    if (variant.includes(q) && q.length >= 3) score += 55;
  }

  for (const token of qTokens) {
    if (nameTokens.includes(token)) score += 22;
    for (const alias of member.aliases || []) {
      const aliasTokens = tokenize(alias);
      if (aliasTokens.includes(token)) score += 10;
    }
  }

  score += similarity(q, normalizeText(member.name)) * 20;

  // Bonus dari logic.js: nama dibalik & nama sebagian
  score += bonusNameScore(member, q);

  return score;
}

function findMemberByQuery(query) {
  const q = normalizeText(query);
  if (!q) return null;

  const roleMap = [
    { role: "ketua kelas", name: "Fajar Alfa Rizky" },
    { role: "wakil ketua kelas", name: "Muhammad Haliq Maulana" },
    { role: "sekretaris", name: "Nadya Febriasari" },
    { role: "bendahara", name: "Syarifah Shabrina" },
  ];

  for (const item of roleMap) {
    if (q.includes(item.role)) {
      return (
        members.find(
          (m) => normalizeText(m.name) === normalizeText(item.name),
        ) || null
      );
    }
  }

  let bestMember = null;
  let bestScore = 0;
  for (const member of members) {
    const score = scoreMemberMatch(member, q);
    if (score > bestScore) {
      bestScore = score;
      bestMember = member;
    }
  }

  return bestScore >= 20 ? bestMember : null;
}

function detectMemberField(query) {
  const q = normalizeText(query);
  if (!q) return null;
  for (const [field, keywords] of Object.entries(memberFields)) {
    for (const keyword of keywords) {
      if (q.includes(normalizeText(keyword))) return field;
    }
  }
  return null;
}

// ======================
// FORMAT
// ======================

function formatPrestasiMember(member) {
  if (!member.prestasi || member.prestasi.length === 0) return "Prestasi: -";
  return [
    "Prestasi:",
    ...member.prestasi.map((item, i) => `${i + 1}. ${item}`),
  ].join("\n");
}

function formatMemberPrestasiOnly(member) {
  if (!member) return "Data anggota tidak ditemukan.";
  return [`${member.name} — ${member.role}`, formatPrestasiMember(member)].join(
    "\n",
  );
}

function getStructureMember(roleName) {
  return (
    members.find((m) => normalizeText(m.role) === normalizeText(roleName)) ||
    null
  );
}

function getStructureResponse(query) {
  const q = normalizeText(query);
  if (!q) return null;

  const isMemberCount =
    q.includes("jumlah anggota kelas") ||
    q.includes("jumlah anggota") ||
    q.includes("berapa anggota") ||
    q.includes("berapa siswa") ||
    q.includes("berapa murid") ||
    q.includes("total anggota") ||
    q.includes("total siswa") ||
    q.includes("banyak anggota") ||
    q.includes("banyak siswa") ||
    q === "anggota kelas";

  if (isMemberCount) {
    return {
      reply: `Jumlah anggota kelas adalah ${members.length} siswa/siswi.`,
      intent: "count_members",
      confidence: 0.98,
      section: "anggota",
      suggestions: [
        "siapa ketua kelas",
        "siapa wakil ketua",
        "jumlah perangkat kelas",
      ],
    };
  }

  const isStructureCount =
    q.includes("jumlah perangkat kelas") ||
    q.includes("jumlah struktur kelas") ||
    q.includes("struktur kelas") ||
    q.includes("perangkat kelas") ||
    q.includes("susunan kelas") ||
    q.includes("susunan pengurus") ||
    q.includes("pengurus kelas") ||
    q.includes("organisasi kelas") ||
    q.includes("kepengurusan kelas") ||
    q.includes("berapa pengurus");

  if (isStructureCount) {
    return {
      reply: [
        "Jumlah perangkat kelas adalah 4 orang:",
        `1. Ketua Kelas: ${getStructureMember("Ketua Kelas")?.name || "Tidak ditemukan"}`,
        `2. Wakil Ketua Kelas: ${getStructureMember("Wakil Ketua Kelas")?.name || "Tidak ditemukan"}`,
        `3. Sekretaris: ${getStructureMember("Sekretaris")?.name || "Tidak ditemukan"}`,
        `4. Bendahara: ${getStructureMember("Bendahara")?.name || "Tidak ditemukan"}`,
      ].join("\n"),
      intent: "count_structure",
      confidence: 0.98,
      section: "anggota",
      suggestions: [
        "siapa ketua kelas",
        "siapa wakil ketua",
        "siapa sekretaris",
        "siapa bendahara",
      ],
    };
  }

  const qWithoutWakil = q
    .replace(/\bwakil ketua kelas\b/g, " ")
    .replace(/\bwakil ketua\b/g, " ");
  const roleReplies = [];
  const hasWakilKetua =
    q.includes("wakil ketua kelas") || q.includes("wakil ketua");
  const hasKetuaKelas =
    q.includes("ketua kelas") || /\bketua\b/.test(qWithoutWakil);
  const hasSekretaris = q.includes("sekretaris");
  const hasBendahara = q.includes("bendahara");

  if (hasKetuaKelas) {
    const m = getStructureMember("Ketua Kelas");
    roleReplies.push(`Ketua kelas adalah ${m ? m.name : "Tidak ditemukan"}.`);
  }
  if (hasWakilKetua) {
    const m = getStructureMember("Wakil Ketua Kelas");
    roleReplies.push(
      `Wakil ketua kelas adalah ${m ? m.name : "Tidak ditemukan"}.`,
    );
  }
  if (hasSekretaris) {
    const m = getStructureMember("Sekretaris");
    roleReplies.push(`Sekretaris adalah ${m ? m.name : "Tidak ditemukan"}.`);
  }
  if (hasBendahara) {
    const m = getStructureMember("Bendahara");
    roleReplies.push(`Bendahara adalah ${m ? m.name : "Tidak ditemukan"}.`);
  }

  if (roleReplies.length > 0) {
    return {
      reply: roleReplies.join("\n"),
      intent: "structure",
      confidence: 0.98,
      section: "anggota",
      suggestions: [
        "jumlah anggota kelas",
        "jumlah perangkat kelas",
        "siapa ketua kelas",
      ],
    };
  }

  return null;
}

function findPrestasiByQuery(query) {
  const q = normalizeText(query);
  if (!q) return null;
  for (const group of prestasiGroups) {
    const haystack = normalizeText(
      [
        group.label,
        group.title,
        group.desc,
        ...(group.items || []).map(
          (i) => `${i.name} ${i.competition} ${i.award}`,
        ),
      ].join(" "),
    );
    if (haystack.includes(q)) return group;
  }
  for (const group of prestasiGroups) {
    const groupHay = normalizeText([group.title, group.desc].join(" "));
    if (similarity(q, groupHay) >= 0.7) return group;
  }
  return null;
}

function findAlbumByQuery(query) {
  const q = normalizeText(query);
  if (!q) return null;
  return (
    albumItems.find((item) => {
      const hay = normalizeText([item.label, item.title, item.desc].join(" "));
      return hay.includes(q) || similarity(q, hay) >= 0.72;
    }) || null
  );
}

function findSpotlightByQuery(query) {
  const q = normalizeText(query);
  if (!q) return null;
  return (
    spotlightCards.find((item) => {
      const hay = normalizeText([item.title, item.label, item.desc].join(" "));
      return hay.includes(q) || similarity(q, hay) >= 0.72;
    }) || null
  );
}

function formatMemberResponse(member, field = "full") {
  if (!member) return "Data anggota tidak ditemukan.";
  const header = `${member.name} — ${member.role}`;
  if (field === "bio") return `${header}\nBio: ${member.bio}`;
  if (field === "hobby") return `${header}\nHobi: ${member.hobby}`;
  if (field === "role") return `${header}\nJabatan: ${member.role}`;
  if (field === "humor") return `${header}\nKarakter: ${member.humor}`;
  return [
    header,
    `Urutan: ${member.urutan}`,
    `Hobi: ${member.hobby}`,
    `Karakter: ${member.humor}`,
    `Bio: ${member.bio}`,
    formatPrestasiMember(member),
  ]
    .filter(Boolean)
    .join("\n");
}

function formatMembersList() {
  return members.map((m) => `${m.urutan}. ${m.name} — ${m.role}`).join("\n");
}

function formatPrestasiGroup(group) {
  return [
    `${group.title || "Tanpa judul"} — ${group.label}`,
    `${group.desc}`,
    ...(group.items || []).map((item, i) =>
      [
        `${i + 1}. ${item.name}`,
        `Kompetisi: ${item.competition}`,
        `Penghargaan: ${item.award}`,
      ].join("\n"),
    ),
  ].join("\n\n");
}

function formatPrestasiList() {
  return prestasiGroups
    .map((g) => `${g.title || "Tanpa judul"} — ${g.label}`)
    .join("\n");
}

function formatAlbumList() {
  return albumItems.map((item) => `${item.label} — ${item.title}`).join("\n");
}

function formatSpotlightList() {
  return spotlightCards
    .map((item) => `${item.title} — ${item.label}`)
    .join("\n");
}

function getGreetingResponse() {
  return `${timeGreeting()}. Ada yang ingin diketahui tentang sekolah, kelas, prestasi, anggota, atau album?`;
}

function getHelpResponse() {
  return [
    "Kata kunci yang bisa dipakai:",
    "- profil sekolah",
    "- visi sekolah",
    "- misi sekolah",
    "- jurusan RPL",
    "- tentang kelas",
    "- pembelajaran",
    "- karakter kelas",
    "- daftar anggota",
    "- siapa haliq (contohnya)",
    "- bio haliq (contohnya)",
    "- prestasi haliq (contohnya)",
    "- siapa ketua kelas",
    "- siapa wakil ketua",
    "- prestasi",
    "- album foto",
    "- perjalanan 3 tahun",
    "- bandingkan shabrina dan fajar (contohnya)",
  ].join("\n");
}

// ======================
// BUILD RESPONSE
// ======================

function buildResponse(message) {
  const raw = String(message || "");
  const msg = fixCommonTypos(raw);
  const context = getContext();

  if (!msg) {
    return {
      reply: "Tulis pertanyaan dulu.",
      intent: "empty",
      confidence: 0,
      section: null,
      suggestions: quickSuggestions.slice(0, 6),
    };
  }

  // --- 1. DETEKSI NEGASI / KOREKSI ---
  if (detectNegation(msg)) {
    const result = handleNegation(msg, context);
    if (result.shouldClear) {
      return {
        reply: result.reply,
        intent: "negation",
        confidence: 1,
        section: null,
        suggestions: quickSuggestions.slice(0, 6),
      };
    }
    // Ada koreksi entitas → lanjut dengan query terkoreksi
    if (result.correctedQuery) {
      const correctedMsg = fixCommonTypos(result.correctedQuery);
      const correctedMember = findMemberByQuery(correctedMsg);
      if (correctedMember) {
        setContext({
          lastIntent: "member_query",
          lastEntity: correctedMember.name,
          lastSection: "anggota",
        });
        return {
          reply: formatMemberResponse(correctedMember, "full"),
          intent: "member_query",
          confidence: 0.95,
          section: "anggota",
          suggestions: [
            `bio ${correctedMember.name}`,
            `hobi ${correctedMember.name}`,
            "daftar anggota",
          ],
        };
      }
    }
  }

  // --- 2. DETEKSI KOMPARASI ---
  const comparison = detectComparison(msg);
  if (comparison) {
    const memberA = findMemberByQuery(comparison.nameA);
    const memberB = findMemberByQuery(comparison.nameB);
    const reply = formatComparison(
      memberA,
      memberB,
      comparison.attribute || null,
    );
    setContext({
      lastIntent: "comparison",
      lastEntity: null,
      lastSection: "anggota",
    });
    return {
      reply,
      intent: "comparison",
      confidence: 0.95,
      section: "anggota",
      suggestions: [
        memberA
          ? `bio ${memberA.name.split(" ")[0].toLowerCase()}`
          : "daftar anggota",
        memberB
          ? `prestasi ${memberB.name.split(" ")[0].toLowerCase()}`
          : "prestasi kelas",
        "daftar anggota",
      ],
    };
  }

  // --- 3. GREETING ---
  if (
    /^(hi|halo|hai|hei|hey|hallo|haloo|pagi|siang|sore|malam|permisi|apa kabar|hai bot|halo bot|assalamu alaikum|assalamualaikum|selamat pagi|selamat siang|selamat sore|selamat malam)$/.test(
      msg,
    )
  ) {
    const reply = getGreetingResponse();
    setContext({ lastIntent: "greeting", lastEntity: null, lastSection: null });
    return {
      reply,
      intent: "greeting",
      confidence: 1,
      section: null,
      suggestions: quickSuggestions.slice(0, 6),
    };
  }

  // --- 4. TIME ---
  if (
    msg.includes("jam") ||
    msg.includes("pukul") ||
    msg.includes("tanggal") ||
    msg.includes("waktu") ||
    msg.includes("hari ini") ||
    msg.includes("hari apa") ||
    msg.includes("bulan apa") ||
    msg.includes("tahun berapa") ||
    msg.includes("saat ini") ||
    msg.includes("sekarang") ||
    msg.includes("detik ini") ||
    msg.includes("jam sekarang") ||
    msg.includes("waktu sekarang")
  ) {
    const reply = formatTimeNow();
    setContext({ lastIntent: "time", lastEntity: null, lastSection: null });
    return {
      reply,
      intent: "time",
      confidence: 1,
      section: null,
      suggestions: ["profil sekolah", "daftar anggota", "prestasi kelas"],
    };
  }

  // --- 5. HELP ---
  if (
    msg.includes("bantuan") ||
    msg.includes("bantu") ||
    msg.includes("tolong") ||
    msg.includes("menu") ||
    msg.includes("apa yang bisa") ||
    msg.includes("bisa apa") ||
    msg.includes("fitur") ||
    msg.includes("fungsi") ||
    msg.includes("cara pakai") ||
    msg.includes("petunjuk") ||
    msg.includes("panduan") ||
    msg.includes("kemampuan") ||
    msg.includes("kamu bisa apa") ||
    msg.includes("apa yang kamu bisa") ||
    msg.includes("bisa ngapain")
  ) {
    return {
      reply: getHelpResponse(),
      intent: "help",
      confidence: 1,
      section: null,
      suggestions: quickSuggestions.slice(0, 6),
    };
  }

  // --- 6. PURE SECTION QUERY ---
  const isPureSectionQuery =
    msg === "tentang" ||
    msg === "prestasi" ||
    msg === "anggota" ||
    msg === "album";
  if (isPureSectionQuery) {
    const section = detectSectionAction(msg);
    if (section) {
      setContext({
        lastIntent: "navigation",
        lastEntity: null,
        lastSection: section,
      });
      return {
        reply: `Membuka bagian ${section}.`,
        intent: "navigation",
        confidence: 1,
        section,
        suggestions: quickSuggestions.slice(0, 6),
      };
    }
  }

  // --- 7. STRUCTURE ---
  const structureResponse = getStructureResponse(msg);
  if (structureResponse) {
    setContext({
      lastIntent: structureResponse.intent,
      lastEntity: null,
      lastSection: structureResponse.section,
    });
    return structureResponse;
  }

  // --- 8. FOLLOW-UP KONTEKS AMBIGU (dari logic.js) ---
  const followUpResult = resolveAmbiguousFollowUp(msg, context);
  if (followUpResult) {
    if (followUpResult.reply) {
      return {
        reply: followUpResult.reply,
        intent: "follow_up",
        confidence: 0.9,
        section: context.lastSection,
        suggestions: quickSuggestions.slice(0, 6),
      };
    }
    if (followUpResult.member) {
      const member = followUpResult.member;
      const field = detectMemberField(msg) || "full";
      setContext({
        lastIntent: "member_query",
        lastEntity: member.name,
        lastSection: "anggota",
      });
      return {
        reply: formatMemberResponse(member, field),
        intent: "member_query",
        confidence: 0.9,
        section: "anggota",
        suggestions: [
          `bio ${member.name.split(" ")[0].toLowerCase()}`,
          `hobi ${member.name.split(" ")[0].toLowerCase()}`,
          "daftar anggota",
        ],
      };
    }
  }

  // --- 9. MEMBER MATCHING ---
  const memberField = detectMemberField(msg);
  const memberQueryWords = [
    "siapa",
    "siapakah",
    "profil",
    "info",
    "informasi",
    "detail",
    "lengkap",
    "bio",
    "hobi",
    "hobby",
    "role",
    "jabatan",
    "posisi",
    "sifat",
    "karakter",
    "biodata",
    "identitas",
    "data diri",
    "kenal",
    "kenali",
    "kesukaan",
    "kegemaran",
    "minat",
    "bakat",
    "keahlian",
  ];

  const memberFromQuery = findMemberByQuery(msg);
  const memberFromContext = context.lastEntity
    ? members.find(
        (m) => normalizeText(m.name) === normalizeText(context.lastEntity),
      )
    : null;

  const currentMember = memberFromQuery || memberFromContext;
  const canUseMemberContext =
    Boolean(memberFromContext) &&
    [
      "member_query",
      "member_attribute",
      "member_prestasi",
      "structure",
    ].includes(context.lastIntent);

  const hasMemberQuery = memberQueryWords.some((word) => msg.includes(word));
  const hasPrestasiKeyword =
    msg.includes("prestasi") ||
    msg.includes("capaian") ||
    msg.includes("pencapaian") ||
    msg.includes("penghargaan") ||
    msg.includes("juara") ||
    msg.includes("raihan");

  if (memberFromQuery && hasPrestasiKeyword) {
    setContext({
      lastIntent: "member_prestasi",
      lastEntity: memberFromQuery.name,
      lastSection: "anggota",
    });
    return {
      reply: formatMemberPrestasiOnly(memberFromQuery),
      intent: "member_prestasi",
      confidence: 0.97,
      section: "anggota",
      suggestions: [
        `bio ${memberFromQuery.name}`,
        `hobi ${memberFromQuery.name}`,
        "daftar anggota",
      ],
    };
  }

  if (memberFromQuery) {
    const field = memberField || "full";
    setContext({
      lastIntent: field === "full" ? "member_query" : "member_attribute",
      lastEntity: memberFromQuery.name,
      lastSection: "anggota",
    });
    return {
      reply: formatMemberResponse(memberFromQuery, field),
      intent: field === "full" ? "member_query" : "member_attribute",
      confidence: 0.96,
      section: "anggota",
      suggestions:
        field === "bio"
          ? [
              `siapa ${memberFromQuery.name}`,
              `hobi ${memberFromQuery.name}`,
              "daftar anggota",
            ]
          : [
              `bio ${memberFromQuery.name}`,
              `hobi ${memberFromQuery.name}`,
              "siapa wakil ketua",
            ],
    };
  }

  if (
    !memberFromQuery &&
    canUseMemberContext &&
    currentMember &&
    (memberField || hasMemberQuery)
  ) {
    const field = memberField || "full";
    setContext({
      lastIntent: field === "full" ? "member_query" : "member_attribute",
      lastEntity: currentMember.name,
      lastSection: "anggota",
    });
    return {
      reply: formatMemberResponse(currentMember, field),
      intent: field === "full" ? "member_query" : "member_attribute",
      confidence: 0.93,
      section: "anggota",
      suggestions:
        field === "bio"
          ? [
              `siapa ${currentMember.name}`,
              `hobi ${currentMember.name}`,
              "daftar anggota",
            ]
          : [
              `bio ${currentMember.name}`,
              `hobi ${currentMember.name}`,
              "siapa wakil ketua",
            ],
    };
  }

  // --- 11. INTENT MATCHING (MOVED BEFORE SECTION ACTION) ---
  const matched = detectIntents(msg);
  const top = matched[0];
  const second = matched[1];

  if (top && top.name === "school") {
    setContext({
      lastIntent: "school",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply: getSchoolAnswer("school"),
      intent: "school",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }
  if (top && top.name === "school_info") {
    setContext({
      lastIntent: "school_info",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply: getSchoolAnswer("school"),
      intent: "school_info",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }
  if (top && top.name === "school_visi_mission") {
    setContext({
      lastIntent: "school_visi_mission",
      lastEntity: null,
      lastSection: "dashboard",
    });
    const visi = getSchoolAnswer("school_vision");
    const misi = getSchoolAnswer("school_mission");
    return {
      reply: `${visi}\n\n${misi}`,
      intent: "school_visi_mission",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }
  if (top && top.name === "school_address") {
    setContext({
      lastIntent: "school_address",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply: getSchoolAnswer("school_address"),
      intent: "school_address",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }
  if (top && top.name === "school_vision") {
    setContext({
      lastIntent: "school_vision",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply: getSchoolAnswer("school_vision"),
      intent: "school_vision",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }
  if (top && top.name === "school_mission") {
    setContext({
      lastIntent: "school_mission",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply: getSchoolAnswer("school_mission"),
      intent: "school_mission",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }
  if (top && top.name === "major") {
    setContext({
      lastIntent: "major",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply: getSchoolAnswer("major"),
      intent: "major",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }
  if (top && top.name === "about") {
    setContext({
      lastIntent: "about",
      lastEntity: null,
      lastSection: "tentang",
    });
    return {
      reply: aboutText,
      intent: "about",
      confidence: Math.min(1, top.score / 5),
      section: "tentang",
      suggestions: ["pembelajaran", "karakter kelas", "perjalanan 3 tahun"],
    };
  }
  if (top && top.name === "learning") {
    setContext({
      lastIntent: "learning",
      lastEntity: null,
      lastSection: "tentang",
    });
    return {
      reply: learningFocus,
      intent: "learning",
      confidence: Math.min(1, top.score / 5),
      section: "tentang",
      suggestions: ["karakter kelas", "tentang kelas", "profil sekolah"],
    };
  }
  if (top && top.name === "character") {
    setContext({
      lastIntent: "character",
      lastEntity: null,
      lastSection: "tentang",
    });
    return {
      reply: classCharacter,
      intent: "character",
      confidence: Math.min(1, top.score / 5),
      section: "tentang",
      suggestions: ["pembelajaran", "tentang kelas", "perjalanan 3 tahun"],
    };
  }
  if (top && top.name === "members") {
    setContext({
      lastIntent: "members",
      lastEntity: null,
      lastSection: "anggota",
    });
    return {
      reply: formatMembersList(),
      intent: "members",
      confidence: Math.min(1, top.score / 5),
      section: "anggota",
      suggestions: ["siapa ketua kelas", "siapa wakil ketua", "bio fajar"],
    };
  }
  if (top && top.name === "prestasi") {
    const group = findPrestasiByQuery(msg);
    if (group) {
      setContext({
        lastIntent: "prestasi",
        lastEntity: group.title || null,
        lastSection: "prestasi",
      });
      return {
        reply: formatPrestasiGroup(group),
        intent: "prestasi",
        confidence: Math.min(1, top.score / 5),
        section: "prestasi",
        suggestions: ["prestasi haliq", "prestasi sri mutia", "prestasi kelas"],
      };
    }
    setContext({
      lastIntent: "prestasi",
      lastEntity: null,
      lastSection: "prestasi",
    });
    return {
      reply: formatPrestasiList(),
      intent: "prestasi",
      confidence: Math.min(1, top.score / 5),
      section: "prestasi",
      suggestions: ["prestasi haliq", "prestasi shabrina", "prestasi kelas"],
    };
  }
  if (top && top.name === "album") {
    const item = findAlbumByQuery(msg);
    if (item) {
      setContext({
        lastIntent: "album",
        lastEntity: item.title,
        lastSection: "album",
      });
      return {
        reply: `${item.label} — ${item.title}\n${item.desc}`,
        intent: "album",
        confidence: Math.min(1, top.score / 5),
        section: "album",
        suggestions: ["album foto", "momen 01", "kenangan XII"],
      };
    }
    setContext({ lastIntent: "album", lastEntity: null, lastSection: "album" });
    return {
      reply: formatAlbumList(),
      intent: "album",
      confidence: Math.min(1, top.score / 5),
      section: "album",
      suggestions: ["foto kelas", "kenangan XII", "momen 01"],
    };
  }
  if (top && top.name === "story") {
    const item = findSpotlightByQuery(msg);
    if (item) {
      setContext({
        lastIntent: "story",
        lastEntity: item.title,
        lastSection: "dashboard",
      });
      return {
        reply: `${item.title} — ${item.label}\n${item.desc}`,
        intent: "story",
        confidence: Math.min(1, top.score / 5),
        section: "dashboard",
        suggestions: ["x rpl 1", "xi rpl 1", "xii rpl 1"],
      };
    }
    setContext({
      lastIntent: "story",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply: formatSpotlightList(),
      intent: "story",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
      suggestions: ["x rpl 1", "xi rpl 1", "xii rpl 1"],
    };
  }
  if (top && top.name === "navigation") {
    const sec = detectSectionAction(msg);
    return {
      reply: sec
        ? `Membuka bagian ${sec}.`
        : "Bagian yang diminta belum dikenali.",
      intent: "navigation",
      confidence: Math.min(1, top.score / 5),
      section: sec,
      suggestions: quickSuggestions.slice(0, 6),
    };
  }

  // --- 10. SECTION ACTION (MOVED AFTER INTENT MATCHING) ---
  const sectionAction = detectSectionAction(msg);
  if (sectionAction && !top) {
    setContext({
      lastIntent: "navigation",
      lastEntity: null,
      lastSection: sectionAction,
    });
    return {
      reply: `Membuka bagian ${sectionAction}.`,
      intent: "navigation",
      confidence: 0.95,
      section: sectionAction,
      suggestions: quickSuggestions.slice(0, 6),
    };
  }

  // --- 12. MULTI INTENT ---
  if (second && matched.length >= 2) {
    const replies = [];
    for (const item of matched.slice(0, 2)) {
      if (item.name === "school") replies.push(getSchoolAnswer("school"));
      if (item.name === "school_vision")
        replies.push(getSchoolAnswer("school_vision"));
      if (item.name === "school_mission")
        replies.push(getSchoolAnswer("school_mission"));
      if (item.name === "major") replies.push(getSchoolAnswer("major"));
      if (item.name === "about") replies.push(aboutText);
      if (item.name === "learning") replies.push(learningFocus);
      if (item.name === "character") replies.push(classCharacter);
      if (item.name === "members") replies.push(formatMembersList());
      if (item.name === "prestasi") replies.push(formatPrestasiList());
      if (item.name === "album") replies.push(formatAlbumList());
      if (item.name === "story") replies.push(formatSpotlightList());
    }
    if (replies.length > 0) {
      setContext({
        lastIntent: matched[0].name,
        lastEntity: null,
        lastSection: matched[0].section,
      });
      return {
        reply: replies.join("\n\n"),
        intent: matched.map((m) => m.name).join("+"),
        confidence: Math.min(1, matched[0].score / 5),
        section: matched[0].section,
        suggestions: quickSuggestions.slice(0, 6),
      };
    }
  }

  // --- 13. SMART FALLBACK (dari logic.js) ---
  return {
    reply: buildSmartFallback(msg),
    intent: "unknown",
    confidence: 0,
    section: null,
    suggestions: quickSuggestions.slice(0, 6),
  };
}

// ======================
// SUGGESTIONS
// ======================

function getSuggestions(input) {
  const value = fixCommonTypos(input);
  if (!value) return quickSuggestions.slice(0, 6);
  const tokens = tokenize(value);
  const pool = [...quickSuggestions];
  return pool
    .filter((item) => {
      const hay = normalizeText(item);
      return tokens.some(
        (token) => hay.includes(token) || similarity(token, hay) >= 0.6,
      );
    })
    .slice(0, 6);
}

export {
  normalizeText,
  fixCommonTypos,
  tokenize,
  similarity,
  detectIntents,
  buildResponse,
  getSuggestions,
};
