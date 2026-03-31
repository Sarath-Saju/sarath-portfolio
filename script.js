const BACKEND_URL = "https://sarath-portfolio-rh7d.onrender.com";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

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

    alert("Message sent ✅");

  } catch (err) {
    console.error(err);
    alert("Error ❌");
  }
});

  btnText.style.display = "inline";
  btnLoader.style.display = "none";
  btn.disabled = false;
});