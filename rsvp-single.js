"use strict";
let attending = null;

function setAttending(val) {
  attending = val;
  document.getElementById("btn-yes").classList.toggle("active", val === true);
  document.getElementById("btn-no").classList.toggle("active", val === false);
}

// ── PASTE YOUR DEPLOYED APPS SCRIPT URL HERE ──
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx5sgLcdKEZhC5FKEsZ5KLzDzCnVS3yCmiO_-Lz4TAK4ykpTRRaE63GnUVzDtN2umWV/exec";

async function submitRSVP() {
  const nameInput = document.getElementById("fullname");
  const name = nameInput.value.trim();

  if (!name) {
    nameInput.classList.add("input-error");
    nameInput.focus();
    setTimeout(() => nameInput.classList.remove("input-error"), 1800);
    return;
  }
  if (attending === null) {
    const group = document.querySelector(".toggle-group");
    group.classList.add("shake");
    group.addEventListener(
      "animationend",
      () => group.classList.remove("shake"),
      { once: true }
    );
    return;
  }

  const submitBtn = document.querySelector(".form-submit");
  submitBtn.textContent = "Sending…";
  submitBtn.disabled = true;

  const payload = {
    name,
    attending: attending ? "Yes" : "No",
    plusOne: "N/A",
    plusOneName: "—",
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn("Could not reach sheet, response logged locally.", e);
  }

  const msg = attending
    ? "We can't wait to celebrate with you!"
    : "You will be missed. Thank you for letting us know.";

  document.getElementById("rsvp-form").style.display = "none";
  document.getElementById("success-msg").style.display = "block";
  document.getElementById("success-text").textContent = msg;
}
