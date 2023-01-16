const tooltiptext = document.querySelector("#myTooltip");
const dropZone = document.getElementById("drop-zone");
const uploadBtn = document.getElementById("upload-btn");

function handleClick() {
  navigator.clipboard.writeText("<%=url%>");
  tooltiptext.innerText = "Copied!";
}

dropZone?.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("drag over");
});

dropZone?.addEventListener("dragleave", () => {
  console.log("drag leave ");
});

dropZone?.addEventListener("drop", (event) => {
  event.preventDefault();

  const file = event.dataTransfer.files[0];
  console.log(file);

  let formData = new FormData();
  formData.append("image", file);
  formData.append("isUsingFetch", true);
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

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
});
