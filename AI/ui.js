import { buildResponse } from "./engine.js";

export function initUI() {
  const floating = document.createElement("div");
  floating.id = "floating-chat";
  floating.innerHTML = `
    <button id="chat-toggle" aria-label="Buka chat" title="Chatbot">
      <img src="foto/chatbot.png" alt="chatbot" class="chat-logo">
    </button>
  `;

  const popup = document.createElement("div");
  popup.id = "chat-popup";
  popup.className = "chat-popup";
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-label", "Chatbot kelas");
  popup.setAttribute("aria-hidden", "true");
  popup.innerHTML = `
    <div class="chat-header">
      <div class="chat-title">
        <img src="foto/chatbot.png" alt="chatbot" class="chat-logo">
        <span>AI RPL Assistant</span>
      </div>
      <button id="chat-close" aria-label="Tutup chat">&times;</button>
    </div>

    <div id="chat-messages" class="chat-messages" aria-live="polite"></div>

    <form id="chat-form" class="chat-form" onsubmit="return false;">
      <input id="chat-input" type="text" placeholder="Tulis pesan..." autocomplete="off" />
      <button id="chat-send" type="button">Kirim</button>
    </form>
  `;

  document.body.appendChild(floating);
  document.body.appendChild(popup);

  const toggleBtn = document.getElementById("chat-toggle");
  const closeBtn = document.getElementById("chat-close");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");
  const sendBtn = document.getElementById("chat-send");

  function appendMessage(text, type = "bot") {
    const el = document.createElement("div");
    el.className = `msg ${type}`;
    el.textContent = text;
    chatMessages.appendChild(el);
    requestAnimationFrame(() => el.classList.add("enter"));
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function typeMessage(text) {
    const el = document.createElement("div");
    el.className = "msg bot";
    chatMessages.appendChild(el);

    let i = 0;
    const speed = 18;

    function typing() {
      el.textContent = text.slice(0, i++);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      if (i <= text.length) {
        setTimeout(typing, speed);
      } else {
        el.classList.add("enter");
      }
    }

    typing();
  }

  function createTyping() {
    const wrap = document.createElement("div");
    wrap.className = "typing-wrapper";

    const t = document.createElement("div");
    t.className = "typing";
    t.innerHTML = `
      <span class="dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </span>
    `;

    wrap.appendChild(t);
    chatMessages.appendChild(wrap);
    requestAnimationFrame(() => t.classList.add("show"));
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return wrap;
  }

  function removeTyping(node) {
    return new Promise((resolve) => {
      if (!node) return resolve();
      const typing = node.querySelector(".typing");
      if (typing) typing.classList.add("fade-out");
      setTimeout(() => {
        node.remove();
        resolve();
      }, 260);
    });
  }

  function navigateToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setActiveNav(sectionId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });
  }

  function getRect(el) {
    const r = el.getBoundingClientRect();
    return {
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
    };
  }

  function createIsland(startRect) {
    const island = document.createElement("div");
    island.className = "island-transition";
    island.style.left = `${startRect.left}px`;
    island.style.top = `${startRect.top}px`;
    island.style.width = `${startRect.width}px`;
    island.style.height = `${startRect.height}px`;
    island.style.borderRadius = `${Math.max(startRect.width, startRect.height)}px`;
    document.body.appendChild(island);
    return island;
  }

  async function openChat() {
    const btnRect = getRect(toggleBtn);
    const popupRect = getRect(popup);

    popup.style.visibility = "hidden";
    popup.style.display = "block";

    const island = createIsland(btnRect);
    floating.classList.add("sucked");

    await new Promise((r) => requestAnimationFrame(r));

    island.style.transition = [
      "left .32s cubic-bezier(.12,1,.25,1)",
      "top .32s cubic-bezier(.12,1,.25,1)",
      "width .32s cubic-bezier(.12,1,.25,1)",
      "height .32s cubic-bezier(.12,1,.25,1)",
      "border-radius .24s cubic-bezier(.2,.9,.2,1)",
      "transform .32s cubic-bezier(.12,1,.25,1)",
      "box-shadow .32s ease",
    ].join(", ");

    island.style.left = `${popupRect.left - 10}px`;
    island.style.top = `${popupRect.top + 8}px`;
    island.style.width = `${popupRect.width + 20}px`;
    island.style.height = `${popupRect.height - 16}px`;
    island.style.borderRadius = "18px";
    island.style.transform = "scaleX(.93) scaleY(1.06)";
    island.style.boxShadow = "0 40px 110px rgba(2,6,23,0.48)";

    await new Promise((r) => setTimeout(r, 350));

    island.style.transition = "all .12s cubic-bezier(.3,.9,.2,1)";
    island.style.left = `${popupRect.left}px`;
    island.style.top = `${popupRect.top}px`;
    island.style.width = `${popupRect.width}px`;
    island.style.height = `${popupRect.height}px`;
    island.style.borderRadius = "14px";
    island.style.transform = "scale(1)";

    await new Promise((r) => setTimeout(r, 140));

    island.remove();
    floating.style.display = "none";

    popup.style.display = "flex";
    popup.style.visibility = "visible";
    popup.classList.add("ready");
    popup.setAttribute("aria-hidden", "false");

    setTimeout(() => chatInput.focus(), 20);
  }

  async function closeChat() {
    const btnRect = getRect(toggleBtn);
    const popupRect = getRect(popup);

    floating.style.display = "block";
    const island = createIsland(popupRect);

    popup.classList.remove("ready");
    popup.setAttribute("aria-hidden", "true");

    island.style.transition = [
      "left .34s cubic-bezier(.25,.9,.32,1)",
      "top .34s cubic-bezier(.25,.9,.32,1)",
      "width .34s cubic-bezier(.25,.9,.32,1)",
      "height .34s cubic-bezier(.25,.9,.32,1)",
      "border-radius .26s cubic-bezier(.3,.9,.2,1)",
      "box-shadow .34s cubic-bezier(.25,.9,.32,1)",
    ].join(", ");

    island.style.left = `${btnRect.left}px`;
    island.style.top = `${btnRect.top}px`;
    island.style.width = `${btnRect.width}px`;
    island.style.height = `${btnRect.height}px`;
    island.style.borderRadius = "999px";
    island.style.boxShadow = "0 16px 40px rgba(2,6,23,0.26)";

    await new Promise((r) => setTimeout(r, 360));

    island.remove();
    floating.classList.remove("sucked");
    chatInput.blur();
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    chatInput.value = "";
    sendBtn.disabled = true;

    const typingNode = createTyping();

    try {
      const result = buildResponse(text);

      await new Promise((r) => setTimeout(r, 450));
      await removeTyping(typingNode);

typeMessage(result.reply);

      if (result.section) {
        navigateToSection(result.section);
        setActiveNav(result.section);
      }
    } catch (err) {
      await removeTyping(typingNode);
      appendMessage("Terjadi kesalahan saat memproses pesan.", "bot");
      console.error(err);
    } finally {
      sendBtn.disabled = false;
    }
  }

function initialBotIntro() {
  typeMessage(
    "Halo. Chat ini khusus untuk informasi sekolah, kelas, anggota, prestasi, album, dan perjalanan 3 tahun.",
  );
}

  toggleBtn.addEventListener("click", () => {
    if (popup.classList.contains("ready")) {
      closeChat();
    } else {
      openChat();
    }
  });

  closeBtn.addEventListener("click", closeChat);
  sendBtn.addEventListener("click", sendMessage);
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
  });

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  initialBotIntro();
}
