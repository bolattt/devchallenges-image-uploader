const tooltiptext = document.querySelector("#myTooltip");
const dropZone = document.getElementById("drop-zone");
const uploadBtn = document.getElementById("upload-btn");

function handleClick() {
  console.log("clicked");
  navigator.clipboard.writeText("<%=url%>");
  tooltiptext.innerText = "Copied!";
}

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("drag over");
});

dropZone.addEventListener("dragleave", () => {
  console.log("drag leave ");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  alert("dropped");
});
