import "./style.css";

const form = document.querySelector("form");
showDownloadButton();
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showSpinner();

  const data = new FormData(form);

  const response = await fetch("http://localhost:8000/dream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  const { image } = await response.json();

  const result = document.querySelector("#result");
  result.innerHTML = `
    <img id="generated-image" src="${image}" width="512" />
  `;
  showDownloadButton();
  hideSpinner();
});

function showSpinner() {
  const button = document.querySelector("button");
  button.disabled = true;
  button.innerHTML = 'Creating... <span class="spinner">⏱️</span>';
}

function showDownloadButton() {
  const button = document.querySelector(".download-btn-container");
  button.disabled = true;
  button.innerHTML =
    '<button><a class="download-link" href="${image}" download="generated_image.png">Download Image</a></button>';
}

function hideSpinner() {
  const button = document.querySelector("button");
  button.disabled = false;
  button.innerHTML = "Create";
}
