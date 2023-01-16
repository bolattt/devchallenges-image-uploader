const tooltiptext = document.querySelector("#myTooltip");
const dropZone = document.getElementById("drop-zone");
const uploadBtn = document.getElementById("upload-btn");
const form = document.querySelector("form");

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

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  console.log(file);
  let formData = new FormData();
  //   formData.append("key1", "value1");
  //   formData.append("key2", "value2");
  //   formData.append("file", file);
  formData.append("image", file);
  console.log("entrie", formData.entries());
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  fetch("/", {
    method: "POST",

    body: formData,
  })
    .then((res) => {
      if (res.ok) {
        console.log("uploaded");
      }
    })
    .catch((err) => console.log(err));
});
