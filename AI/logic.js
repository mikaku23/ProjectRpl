// logic.js
// Berisi: context chaining lanjutan, komparasi anggota,
// fuzzy nama dibalik, smart fallback, normalisasi angka/singkatan,
// deteksi negasi/koreksi, typo tambahan

import { members } from "./data.js";
import { getContext, setContext, clearContext } from "./context.js";

// ======================
// NORMALISASI ANGKA & SINGKATAN
// ======================

const NUMBER_MAP = {
  "kelas 10": "kelas x",
  "kelas 11": "kelas xi",
  "kelas 12": "kelas xii",
  "kelas sepuluh": "kelas x",
  "kelas sebelas": "kelas xi",
  "kelas dua belas": "kelas xii",
  "10 rpl": "x rpl",
  "11 rpl": "xi rpl",
  "12 rpl": "xii rpl",
  "x rpl 1": "x rpl",
  "xi rpl 1": "xi rpl",
  "xii rpl 1": "xii rpl",
  "kelas x rpl 1": "x rpl",
  "kelas xi rpl 1": "xi rpl",
  "kelas xii rpl 1": "xii rpl",
  "kelas x": "kelas x",
  "kelas xi": "kelas xi",
  "kelas xii": "kelas xii",
};

const ABBREV_MAP = {
  "\\bwk\\b": "wakil ketua",
  "\\bkk\\b": "ketua kelas",
  "\\bwkk\\b": "wakil ketua kelas",
  "\\bsek\\b": "sekretaris",
  "\\bben\\b": "bendahara",
  "\\bsmk\\b": "smk",
  "\\bsmkn\\b": "smk",
  "\\binfo\\b": "informasi",
  "\\byg\\b": "yang",
  "\\bkrn\\b": "karena",
  "\\bdg\\b": "dengan",
  "\\bbs\\b": "bisa",
  "\\btp\\b": "tapi",
  "\\bny\\b": "nya",
  "\\bkls\\b": "kelas",
  "\\bsmstr\\b": "semester",
  "\\bthn\\b": "tahun",
  "\\bnmr\\b": "nomor",
  "\\bnm\\b": "nama",
  "\\btlp\\b": "telepon",
  "\\btel\\b": "telepon",
  "\\bhp\\b": "hp",
  "\\bno\\b": "nomor",
  "\\badr\\b": "alamat",
  "\\blok\\b": "lokasi",
  "\\bviber\\b": "hubungi",
  "\\bkonk\\b": "kontak",
  "\\bvisi\\b": "visi",
  "\\bmisi\\b": "misi",
  "\\brpl\\b": "rpl",
  "\\bpplg\\b": "pplg",
  "\\bit\\b": "it",
  "\\btik\\b": "teknologi informasi",
};

// Typo tambahan spesifik nama anggota & konteks data
export const EXTRA_TYPO_MAP = {
  // nama anggota
  fajer: "fajar",
  fajr: "fajar",
  halik: "haliq",
  halic: "haliq",
  khaliq: "haliq",
  nadyah: "nadya",
  nadiya: "nadya",
  sabrinah: "sabrina",
  syarifah: "syarifah",
  sarifah: "syarifah",
  anggah: "angga",
  andikah: "andika",
  alfin: "alvin",
  alphin: "alvin",
  hafis: "hafiz",
  hapiz: "hafiz",
  fahrezy: "fahrezi",
  fahresy: "fahrezi",
  rezi: "fahrezi",
  hafif: "hafief",
  hapif: "hafief",
  lutfi: "luthfi",
  salwah: "salwa",
  riska: "rizka",
  kaputri: "kaputri",
  nadia: "nadya",
  mutiah: "mutia",
  srimutia: "sri mutia",
  salsabilah: "salsabila",
  cacah: "caca",
  mawadah: "mawaddah",
  dindah: "dinda",
  balkis: "balqis",
  elizah: "eliza",
  nailah: "naila",
  ranii: "rani",
  // umum
  presatsi: "prestasi",
  prsetasi: "prestasi",
  presasi: "prestasi",
  prstasi: "prestasi",
  albuum: "album",
  albu: "album",
  sekoalh: "sekolah",
  seklah: "sekolah",
  sekolahh: "sekolah",
  skolah: "sekolah",
  skola: "sekolah",
  anggotta: "anggota",
  anggotah: "anggota",
  karkater: "karakter",
  krakater: "karakter",
  boi: "bio",
  bioo: "bio",
  hby: "hobi",
  hoby: "hobi",
  hobbin: "hobi",
  jrusan: "jurusan",
  jursan: "jurusan",
  jusan: "jurusan",
  vission: "visi",
  mission: "misi",
  mision: "misi",
  vison: "visi",
  vsii: "visi",
  msii: "misi",
  // Variasi kata
  informasi: "informasi",
  imformasi: "informasi",
  imfo: "info",
  infoo: "info",
  infonya: "info",
  telepon: "telepon",
  telpon: "telepon",
  telp: "telepon",
  nomer: "nomor",
  nomor: "nomor",
  hape: "hp",
  hp: "hp",
  alamat: "alamat",
  lokasi: "lokasi",
  letak: "letak",
  lokalisasi: "lokasi",
  posisi: "lokasi",
  lokasii: "lokasi",
  alamatt: "alamat",
  alamatan: "alamat",
  kontak: "kontak",
  kontack: "kontak",
  hubungi: "hubungi",
  hubung: "hubungi",
  email: "email",
  imail: "email",
  email: "email",
  smk: "smk",
  smkn: "smk",
  "smk negeri": "smk",
  kampus: "kampus",
  institusi: "institusi",
  insitusi: "institusi",
  lembaga: "lembaga",
  madrasah: "madrasah",
  karangbaru: "karang baru",
  karanbaru: "karang baru",
  aceh: "aceh",
  tamiang: "tamiang",
  tamiang: "tamiang",
};

export function normalizeNumbersAndAbbrev(text = "") {
  let out = text.toLowerCase();

  // Normalisasi angka ke romawi
  for (const [from, to] of Object.entries(NUMBER_MAP)) {
    out = out.replace(new RegExp(from, "g"), to);
  }

  // Normalisasi singkatan
  for (const [pattern, replacement] of Object.entries(ABBREV_MAP)) {
    out = out.replace(new RegExp(pattern, "g"), replacement);
  }

  return out;
}

// ======================
// FUZZY NAMA DIBALIK
// ======================

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text = "") {
  return normalizeText(text).split(" ").filter(Boolean);
}

// Cek apakah token query cocok dengan token nama (urutan dibalik)
export function matchReversedName(query, memberName) {
  const qTokens = tokenize(normalizeText(query));
  const nTokens = tokenize(normalizeText(memberName));

  if (qTokens.length < 2 || nTokens.length < 2) return false;

  // Cek semua token query ada di token nama (tanpa peduli urutan)
  const matched = qTokens.filter((qt) =>
    nTokens.some((nt) => nt === qt || (qt.length >= 3 && nt.startsWith(qt))),
  );

  return matched.length >= 2 && matched.length >= qTokens.length * 0.7;
}

// Skor tambahan untuk nama dibalik & nama sebagian
export function bonusNameScore(member, query) {
  const q = normalizeText(query);
  const qTokens = tokenize(q);
  let bonus = 0;

  // Nama dibalik: "rizky fajar" → Fajar Alfa Rizky
  if (matchReversedName(q, member.name)) {
    bonus += 40;
  }

  // Nama sebagian: token tunggal yang cocok dengan salah satu token nama
  const nameTokens = tokenize(member.name);
  for (const qt of qTokens) {
    if (qt.length >= 3) {
      for (const nt of nameTokens) {
        if (nt === qt) bonus += 15;
        else if (nt.startsWith(qt) && qt.length >= 4) bonus += 8;
        else if (qt.startsWith(nt) && nt.length >= 4) bonus += 6;
      }
    }
  }

  // Alias sebagian
  for (const alias of member.aliases || []) {
    const aliasTokens = tokenize(alias);
    for (const qt of qTokens) {
      if (qt.length >= 3 && aliasTokens.includes(qt)) bonus += 12;
    }
  }

  return bonus;
}

// ======================
// DETEKSI NEGASI / KOREKSI
// ======================

const NEGATION_PATTERNS = [
  /^bukan (itu|dia|tadi|itu tadi)/,
  /^bukan$/,
  /^salah$/,
  /^maksudku bukan/,
  /^bukan maksudku/,
  /^koreksi/,
  /^ralat/,
  /^maaf bukan/,
  /^eh bukan/,
  /^yang tadi salah/,
  /^tidak itu/,
  /^bukan yang tadi/,
];

export function detectNegation(msg = "") {
  const q = normalizeText(msg);
  return NEGATION_PATTERNS.some((pat) => pat.test(q));
}

// Extract nama setelah "bukan X, maksudku Y"
export function extractCorrectedEntity(msg = "") {
  const q = normalizeText(msg);

  // Pola: "maksudku [nama]" / "yang kumaksud [nama]"
  const patterns = [
    /maksudku (.+)$/,
    /yang kumaksud (.+)$/,
    /yang aku maksud (.+)$/,
    /bukan .+? tapi (.+)$/,
    /bukan .+? melainkan (.+)$/,
    /koreksi[,:]? (.+)$/,
    /ralat[,:]? (.+)$/,
  ];

  for (const pat of patterns) {
    const match = q.match(pat);
    if (match) return match[1].trim();
  }

  return null;
}

// ======================
// CONTEXT CHAINING LANJUTAN
// ======================

const FOLLOW_UP_PATTERNS = [
  // "yang lain", "lainnya", "siapa lagi"
  {
    pattern: /\b(yang lain|lainnya|siapa lagi|selanjutnya|berikutnya)\b/,
    type: "next",
  },
  // "dia juga", "bagaimana dengannya"
  {
    pattern: /\b(dia juga|bagaimana dengan(nya)?|gimana dengan(nya)?)\b/,
    type: "same",
  },
  // "dan dia", "dan si"
  { pattern: /^(dan |juga )?(dia|si |ia )?/, type: "continue" },
];

export function detectFollowUp(msg = "") {
  const q = normalizeText(msg);
  for (const fp of FOLLOW_UP_PATTERNS) {
    if (fp.pattern.test(q)) return fp.type;
  }
  return null;
}

// Ambil member berikutnya dari konteks (untuk "yang lain")
export function getNextMember(currentName) {
  if (!currentName) return null;
  const idx = members.findIndex(
    (m) => normalizeText(m.name) === normalizeText(currentName),
  );
  if (idx === -1 || idx >= members.length - 1) return null;
  return members[idx + 1];
}

// ======================
// SMART FALLBACK
// ======================

const INTENT_HINTS = [
  { keywords: ["sekolah", "smk", "kampus", "profil"], hint: "profil sekolah" },
  { keywords: ["visi"], hint: "visi sekolah" },
  { keywords: ["misi"], hint: "misi sekolah" },
  { keywords: ["jurusan", "rpl", "pplg"], hint: "jurusan RPL" },
  { keywords: ["anggota", "siswa", "murid", "daftar"], hint: "daftar anggota" },
  {
    keywords: ["prestasi", "juara", "lomba", "kompetisi"],
    hint: "prestasi kelas",
  },
  { keywords: ["album", "foto", "galeri", "momen"], hint: "album foto" },
  {
    keywords: ["tentang", "cerita", "kisah", "sejarah"],
    hint: "tentang kelas",
  },
  {
    keywords: ["belajar", "pembelajaran", "materi"],
    hint: "fokus pembelajaran",
  },
  { keywords: ["karakter", "sifat", "kepribadian"], hint: "karakter kelas" },
  {
    keywords: ["perjalanan", "3 tahun", "spotlight"],
    hint: "perjalanan 3 tahun",
  },
  {
    keywords: ["ketua", "wakil", "sekretaris", "bendahara"],
    hint: "siapa ketua kelas",
  },
  { keywords: ["bio", "hobi", "hobby"], hint: "bio [nama anggota]" },
  {
    keywords: ["waktu", "jam", "tanggal", "hari"],
    hint: "jam berapa sekarang",
  },
];

function similarity(a = "", b = "") {
  const x = normalizeText(a).replace(/\s+/g, "");
  const y = normalizeText(b).replace(/\s+/g, "");
  if (!x || !y) return 0;
  if (x === y) return 1;
  const shorter = x.length <= y.length ? x : y;
  const longer = x.length > y.length ? x : y;
  let same = 0;
  for (const ch of shorter) {
    if (longer.includes(ch)) same++;
  }
  return same / longer.length;
}

export function buildSmartFallback(msg = "") {
  const q = normalizeText(msg);
  const tokens = q.split(" ").filter(Boolean);
  const hints = [];

  for (const { keywords, hint } of INTENT_HINTS) {
    const matched = keywords.some((kw) =>
      tokens.some(
        (t) => t === kw || q.includes(kw) || similarity(t, kw) >= 0.75,
      ),
    );
    if (matched) hints.push(hint);
  }

  // Cek apakah mirip nama anggota
  let closestMember = null;
  let bestScore = 0;
  for (const member of members) {
    const s = similarity(q, normalizeText(member.name));
    const aliasScore = (member.aliases || []).reduce((max, a) => {
      return Math.max(max, similarity(q, normalizeText(a)));
    }, 0);
    const score = Math.max(s, aliasScore);
    if (score > bestScore) {
      bestScore = score;
      closestMember = member;
    }
  }

  if (bestScore >= 0.5 && closestMember) {
    hints.unshift(`siapa ${closestMember.name.split(" ")[0].toLowerCase()}`);
  }

  if (hints.length === 0) {
    return [
      "Pertanyaan belum dikenali.",
      "Coba gunakan kata kunci seperti:",
      "- profil sekolah",
      "- visi / misi",
      "- daftar anggota",
      "- prestasi kelas",
      "- album foto",
      "- tentang kelas",
    ].join("\n");
  }

  return [
    "Pertanyaan belum dikenali sepenuhnya.",
    "Mungkin maksudmu:",
    ...hints.slice(0, 3).map((h) => `- ${h}`),
  ].join("\n");
}

// ======================
// HANDLER NEGASI DI ENGINE
// ======================

export function handleNegation(msg, context) {
  const corrected = extractCorrectedEntity(msg);

  if (corrected) {
    // Ada koreksi eksplisit → return null agar engine cari member baru
    return { correctedQuery: corrected, shouldClear: false };
  }

  // Tidak ada koreksi eksplisit → reset context
  clearContext();
  return {
    correctedQuery: null,
    shouldClear: true,
    reply: "Oke, konteks sebelumnya dikosongkan. Silakan tanya lagi.",
  };
}

// ======================
// CONTEXT CHAINING: PERTANYAAN AMBIGU LANJUTAN
// ======================

export function resolveAmbiguousFollowUp(msg, context) {
  const followUpType = detectFollowUp(msg);
  if (!followUpType) return null;

  const currentMember = context.lastEntity
    ? members.find(
        (m) => normalizeText(m.name) === normalizeText(context.lastEntity),
      )
    : null;

  if (followUpType === "next") {
    const next = getNextMember(context.lastEntity);
    if (next) {
      return {
        member: next,
        reply: null, // engine yang format
        type: "next_member",
      };
    }
    return {
      member: null,
      reply: "Tidak ada anggota berikutnya setelah ini.",
      type: "end_of_list",
    };
  }

  if (followUpType === "same" && currentMember) {
    return {
      member: currentMember,
      reply: null,
      type: "same_member",
    };
  }

  return null;
}

// ======================
// KOMPARASI ANGGOTA
// ======================

const COMPARE_PATTERNS = [
  /bandingkan (.+) dan (.+)/,
  /bandingkan (.+) dengan (.+)/,
  /perbandingan (.+) dan (.+)/,
  /perbandingan (.+) dengan (.+)/,
  /(.+) vs (.+)/,
  /(.+) versus (.+)/,
  /siapa yang lebih (.+) antara (.+) dan (.+)/,
  /siapa lebih (.+)[,:]? (.+) atau (.+)/,
];

export function detectComparison(msg = "") {
  const q = normalizeText(msg);

  for (const pat of COMPARE_PATTERNS) {
    const match = q.match(pat);
    if (match) {
      // Pattern "bandingkan A dan B" → match[1], match[2]
      // Pattern "siapa yang lebih X antara A dan B" → match[2], match[3]
      if (match.length === 4) {
        return {
          type: "attribute_compare",
          attribute: match[1],
          nameA: match[2],
          nameB: match[3],
        };
      }
      return {
        type: "general_compare",
        nameA: match[1],
        nameB: match[2],
      };
    }
  }

  return null;
}

export function formatComparison(memberA, memberB, attribute = null) {
  if (!memberA || !memberB) {
    return "Salah satu atau kedua anggota tidak ditemukan.";
  }

  if (attribute) {
    const attr = normalizeText(attribute);
    const fieldMap = {
      hobi: "hobby",
      hobby: "hobby",
      bio: "bio",
      karakter: "humor",
      sifat: "humor",
      jabatan: "role",
      role: "role",
      prestasi: "prestasi",
    };

    const field = Object.entries(fieldMap).find(([k]) => attr.includes(k))?.[1];

    if (field === "prestasi") {
      const pA = memberA.prestasi?.join(", ") || "-";
      const pB = memberB.prestasi?.join(", ") || "-";
      return [
        `Perbandingan prestasi:`,
        `${memberA.name}: ${pA}`,
        `${memberB.name}: ${pB}`,
      ].join("\n");
    }

    if (field) {
      return [
        `Perbandingan ${attribute}:`,
        `${memberA.name}: ${memberA[field] || "-"}`,
        `${memberB.name}: ${memberB[field] || "-"}`,
      ].join("\n");
    }
  }

  // Komparasi umum: tampilkan ringkasan keduanya
  const lines = [
    `Perbandingan ${memberA.name} vs ${memberB.name}:`,
    "",
    `[ ${memberA.name} — ${memberA.role} ]`,
    `Hobi: ${memberA.hobby || "-"}`,
    `Karakter: ${memberA.humor || "-"}`,
    `Prestasi: ${memberA.prestasi?.length ? memberA.prestasi.join(", ") : "-"}`,
    "",
    `[ ${memberB.name} — ${memberB.role} ]`,
    `Hobi: ${memberB.hobby || "-"}`,
    `Karakter: ${memberB.humor || "-"}`,
    `Prestasi: ${memberB.prestasi?.length ? memberB.prestasi.join(", ") : "-"}`,
  ];

  return lines.join("\n");
}
