const inputs = document.querySelectorAll(".otp-inputs input");
const form = document.getElementById("otp-form");
const successMsg = document.getElementById("success-msg");
const errorMsg = document.getElementById("error-msg");
const countdown = document.getElementById("countdown");
const resendSection = document.getElementById("resend");

const VALID_OTP = "123456";
let timer = 30;
let interval = null;

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
    hideMessages();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userOTP = Array.from(inputs).map(input => input.value).join("");

  if (userOTP.length < 6) {
    errorMsg.textContent = "❌ Please enter all 6 digits.";
    errorMsg.style.display = "block";
    successMsg.style.display = "none";
    return;
  }

  if (userOTP === VALID_OTP) {
    successMsg.style.display = "block";
    errorMsg.style.display = "none";
  } else {
    errorMsg.style.display = "block";
    successMsg.style.display = "none";
    resendSection.style.display = "block";
  }
});

function startTimer() {
  timer = 30;
  countdown.textContent = `Resend OTP in ${timer}s`;
  resendSection.style.display = "none";
  interval = setInterval(() => {
    timer--;
    countdown.textContent = `Resend OTP in ${timer}s`;
    if (timer <= 0) {
      clearInterval(interval);
      countdown.textContent = "Didn't receive the code?";
      resendSection.style.display = "block";
    }
  }, 1000);
}

function resendOTP() {
  Array.from(inputs).forEach(input => input.value = "");
  inputs[0].focus();
  startTimer();
  successMsg.style.display = "none";
  errorMsg.style.display = "none";
}

function hideMessages() {
  const currentOTP = Array.from(inputs).map(input => input.value).join("");
  if (currentOTP.length < 6) {
    successMsg.style.display = "none";
    errorMsg.style.display = "none";
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const btn = document.querySelector('.dark-mode-toggle');
  btn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
}

window.onload = () => {
  inputs[0].focus();
  startTimer();
};
