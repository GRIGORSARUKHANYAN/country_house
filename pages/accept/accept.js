import DOM from "../../tools/dom.js";
import API from "../../tools/api.js";

// DOM elements
const dateDOM = DOM.GE(".date");
const nameDOM = DOM.GE(".name");
const surnameDOM = DOM.GE(".surname");
const roomsDOM = DOM.GE(".rooms");
const emailDOM = DOM.GE(".email");
const phoneDOM = DOM.GE(".phone");
const registerButtonDOM = DOM.GE(".registerButton");

// set minimal day for choose
const today = new Date().toISOString().split("T")[0];
dateDOM.min = today;

// event listeners
dateDOM.addEventListener("change", (e) => {
  roomsDOM.innerHTML = "";
  roomsDOM.value = null;
  API.checkFreeDays(e.target.value).then((d) => {
    if (d?.data) {
      roomsRender(d.data);
      registerButtonActivateCheck();
    }
  });
});

roomsDOM.addEventListener("change", (e) => {
  registerButtonActivateCheck();
});

nameDOM.addEventListener("input", (e) => {
  registerButtonActivateCheck();
});
surnameDOM.addEventListener("input", (e) => {
  registerButtonActivateCheck();
});
emailDOM.addEventListener("input", (e) => {
  registerButtonActivateCheck();
});
phoneDOM.addEventListener("input", (e) => {
  registerButtonActivateCheck();
});

registerButtonDOM.addEventListener("click", () => {
  // TODO
});

// =======================
// FUNCTIONS ==================
function registerButtonActivateCheck() {
  if (
    dateDOM.value &&
    nameDOM.value &&
    surnameDOM.value &&
    roomsDOM.value &&
    emailDOM.value &&
    phoneDOM.value
  ) {
    registerButtonDOM.disabled = false;
  } else {
    registerButtonDOM.disabled = true;
  }
}

function roomsRender(rooms) {
  for (let i = 0; i < rooms.length; ++i) {
    const option = DOM.CE("option");
    option.value = rooms[i];
    option.innerHTML = rooms[i];

    roomsDOM.appendChild(option);
  }


  if (rooms.length > 0) {
    roomsDOM.disabled = false;
  }
}
