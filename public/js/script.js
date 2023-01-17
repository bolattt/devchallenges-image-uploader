const tooltiptext = document.querySelector("#myTooltip");
const dropZone = document.getElementById("drop-zone");
const uploadBtn = document.getElementById("upload-btn");
const inputEl = document.getElementById("input");

function handleClick() {
  navigator.clipboard.writeText("<%=url%>");
  tooltiptext.innerText = "Copied!";
}

function validateFormat(file) {
  console.log(file.type);
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  return validTypes.includes(file.type);
}

function createForm(file) {
  let formData = new FormData();
  formData.append("image", file);
  return formData;
}

function uploadImage(formData) {
  fetch("/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.url);
      window.location.href = data.url;
    })
    .catch((err) => console.log(err));
}

function handleUpload(e) {
  e.preventDefault();
  const file = e.dataTransfer?.files[0] || e.target.files[0];
  console.log(file);
  const isValid = validateFormat(file);
  if (isValid) {
    const formData = createForm(file);
    uploadImage(formData);
  } else {
    alert("not valid format");
  }
}

dropZone?.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("drag over");
});

dropZone?.addEventListener("dragleave", () => {
  console.log("drag leave ");
});

inputEl.addEventListener("change", (e) => handleUpload(e));

dropZone?.addEventListener("drop", (e) => handleUpload(e));
