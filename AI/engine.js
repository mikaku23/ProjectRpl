import {
  schoolData,
  aboutText,
  learningFocus,
  classCharacter,
  prestasiGroups,
  members,
  spotlightCards,
  albumItems,
} from "./data.js";

import { intents, quickSuggestions } from "./intents.js";
import { getContext, setContext } from "./context.js";

const TYPO_MAP = {
  ketu: "ketua",
  ketau: "ketua",
  angota: "anggota",
  prestsi: "prestasi",
  jadwl: "jadwal",
  senen: "senin",
  almbum: "album",
  profill: "profil",
  skolah: "sekolah",
  sekolahh: "sekolah",
  walikelas: "wali kelas",
  wakilketua: "wakil ketua",
  sekretari: "sekretaris",
  bendahar: "bendahara",
  fot: "foto",
  alumni: "album",
};

const SECTION_MAP = {
  dashboard: "dashboard",
  tentang: "tentang",
  prestasi: "prestasi",
  anggota: "anggota",
  album: "album",
};

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fixCommonTypos(text = "") {
  let out = normalizeText(text);
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

  if (second && second.score >= top.score * 0.7) {
    return [top, second];
  }

  return [top];
}

function detectSectionAction(message) {
  const msg = fixCommonTypos(message);

  for (const [name, id] of Object.entries(SECTION_MAP)) {
    if (msg.includes(name)) return id;
  }

  return null;
}

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

  if (type === "school_vision") {
    return extractBetween(detail, "Visi:", "Misi:") || detail;
  }

  if (type === "school_mission") {
    return extractBetween(detail, "Misi:", "Jurusan unggulan:") || detail;
  }

  if (type === "major") {
    return extractBetween(detail, "Jurusan unggulan:", "") || detail;
  }

  return detail;
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

  return (
    members.find((m) => q.includes(normalizeText(m.name))) ||
    members.find((m) => similarity(q, normalizeText(m.name)) >= 0.72) ||
    null
  );
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

function formatMembersList() {
  return members.map((m) => `${m.urutan}. ${m.name} — ${m.role}`).join("\n");
}

function formatMemberDetail(member) {
  return [
    `${member.name}`,
    `Role: ${member.role}`,
    `Urutan: ${member.urutan}`,
    `Hobi: ${member.hobby}`,
    `Karakter: ${member.humor}`,
    `Bio: ${member.bio}`,
  ].join("\n");
}

function formatPrestasiGroup(group) {
  return [
    `${group.title || "Tanpa judul"} — ${group.label}`,
    `${group.desc}`,
    ...(group.items || []).map((item, index) =>
      [
        `${index + 1}. ${item.name}`,
        `Kompetisi: ${item.competition}`,
        `Penghargaan: ${item.award}`,
      ].join("\n"),
    ),
  ].join("\n\n");
}

function formatPrestasiList() {
  return prestasiGroups
    .map((group) => `${group.title || "Tanpa judul"} — ${group.label}`)
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
    "- visi",
    "- misi",
    "- jurusan RPL",
    "- tentang kelas",
    "- pembelajaran",
    "- karakter kelas",
    "- daftar anggota",
    "- siapa ketua kelas",
    "- prestasi",
    "- album foto",
    "- perjalanan 3 tahun",
  ].join("\n");
}

function getFallbackResponse() {
  return [
    "Pertanyaan belum dikenali.",
    "Coba gunakan kata kunci seperti:",
    "- profil sekolah",
    "- visi",
    "- anggota",
    "- prestasi",
    "- album",
    "- tentang kelas",
  ].join("\n");
}

function buildResponse(message) {
  const raw = String(message || "");
  const msg = fixCommonTypos(raw);
  const context = getContext();

  const sectionAction = detectSectionAction(msg);
  const matched = detectIntents(msg);
  const top = matched[0];
  const second = matched[1];

  if (!msg) {
    return {
      reply: "Tulis pertanyaan dulu.",
      intent: "empty",
      confidence: 0,
      section: null,
      suggestions: quickSuggestions.slice(0, 6),
    };
  }

  if (
    /^(halo|hai|hei|selamat pagi|selamat siang|selamat sore|selamat malam)$/.test(
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

  if (
    msg.includes("jam") ||
    msg.includes("tanggal") ||
    msg.includes("waktu") ||
    msg.includes("hari ini")
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

  if (
    msg.includes("bantuan") ||
    msg.includes("menu") ||
    msg.includes("apa yang bisa") ||
    msg.includes("fitur")
  ) {
    return {
      reply: getHelpResponse(),
      intent: "help",
      confidence: 1,
      section: null,
      suggestions: quickSuggestions.slice(0, 6),
    };
  }

  if (sectionAction) {
    const label = sectionAction;
    const reply = `Membuka bagian ${label}.`;
    setContext({
      lastIntent: "navigation",
      lastEntity: null,
      lastSection: label,
    });
    return {
      reply,
      intent: "navigation",
      confidence: 0.95,
      section: label,
      suggestions: quickSuggestions.slice(0, 6),
    };
  }

  if (
    msg.includes("siapa") ||
    msg.includes("bio") ||
    msg.includes("hobi") ||
    msg.includes("hobby") ||
    msg.includes("karakter")
  ) {
    const member =
      findMemberByQuery(msg) ||
      (context.lastEntity
        ? members.find(
            (m) => normalizeText(m.name) === normalizeText(context.lastEntity),
          )
        : null);

    if (member) {
      let reply = formatMemberDetail(member);

      if (msg.includes("siapa")) {
        reply = `${member.name} adalah ${member.role}.\n${reply}`;
      }

      setContext({
        lastIntent: "member_detail",
        lastEntity: member.name,
        lastSection: "anggota",
      });

      return {
        reply,
        intent: "member_detail",
        confidence: 0.95,
        section: "anggota",
        suggestions: ["hobi", "bio", "daftar anggota", "siapa wakil ketua"],
      };
    }
  }

  if (top && top.name === "school") {
    const reply = getSchoolAnswer("school");
    setContext({
      lastIntent: "school",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply,
      intent: "school",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }

  if (top && top.name === "school_address") {
    const reply = getSchoolAnswer("school_address");
    setContext({
      lastIntent: "school_address",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply,
      intent: "school_address",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }

  if (top && top.name === "school_vision") {
    const reply = getSchoolAnswer("school_vision");
    setContext({
      lastIntent: "school_vision",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply,
      intent: "school_vision",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }

  if (top && top.name === "school_mission") {
    const reply = getSchoolAnswer("school_mission");
    setContext({
      lastIntent: "school_mission",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply,
      intent: "school_mission",
      confidence: Math.min(1, top.score / 5),
      section: "dashboard",
    };
  }

  if (top && top.name === "major") {
    const reply = getSchoolAnswer("major");
    setContext({
      lastIntent: "major",
      lastEntity: null,
      lastSection: "dashboard",
    });
    return {
      reply,
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
    const reply = sec
      ? `Membuka bagian ${sec}.`
      : "Bagian yang diminta belum dikenali.";
    return {
      reply,
      intent: "navigation",
      confidence: Math.min(1, top.score / 5),
      section: sec,
      suggestions: quickSuggestions.slice(0, 6),
    };
  }

  if (matched.length >= 2) {
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

  if (
    context.lastIntent === "member_detail" &&
    (msg.includes("bio") ||
      msg.includes("hobi") ||
      msg.includes("hobby") ||
      msg.includes("karakter"))
  ) {
    const member = members.find(
      (m) => normalizeText(m.name) === normalizeText(context.lastEntity),
    );
    if (member) {
      return {
        reply: formatMemberDetail(member),
        intent: "member_detail",
        confidence: 0.9,
        section: "anggota",
        suggestions: [
          "daftar anggota",
          "siapa ketua kelas",
          "siapa wakil ketua",
        ],
      };
    }
  }

  return {
    reply: getFallbackResponse(),
    intent: "unknown",
    confidence: 0,
    section: null,
    suggestions: quickSuggestions.slice(0, 6),
  };
}

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

