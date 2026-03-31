const BACKEND_URL = "https://sarath-portfolio-rh7d.onrender.com";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = document.getElementById("submitBtn");
  const status = document.getElementById("form-status");
  const btnText = btn.querySelector(".btn-text");
  const btnLoader = btn.querySelector(".btn-loader");

  btnText.style.display = "none";
  btnLoader.style.display = "inline";
  btn.disabled = true;
  status.textContent = "Sending...";

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  try {
    const res = await fetch(`${BACKEND_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      status.textContent = "✅ Message sent!";
      document.getElementById("contactForm").reset();
    } else {
      status.textContent = "❌ " + result.error;
    }

  } catch (err) {
    console.error(err);
    status.textContent = "❌ Backend not connected";
  }

  btnText.style.display = "inline";
  btnLoader.style.display = "none";
  btn.disabled = false;
});