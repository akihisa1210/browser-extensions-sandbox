const generateModal = (text) => {
  const modal = document.createElement("sapn");
  modal.id = "modal";
  modal.style.position = "absolute";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.right = "0";
  modal.style.bottom = "0";
  modal.style.backgroundColor = "rbga(0,0,0,0.5)";
  modal.style.color = "white";
  modal.style.fontSize = "5rem";
  modal.style.textAlign = "center";
  modal.style.padding = "9rem";
  modal.style.fontWeight = "bold";
  modal.style.textShadow = "0 0 4rem black";
  modal.textContent = text;
  return modal;
};

window.addEventListener("keydown", event => {
  const modal = generateModal(event.code);
  document.body.appendChild(modal);
});
