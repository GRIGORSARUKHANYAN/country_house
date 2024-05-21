import DOM from "../../tools/dom.js";
import API from "../../tools/api.js";

const dateDOM = DOM.GE('.date');
const nameDOM = DOM.GE('.name');
const surnameDOM = DOM.GE('.surname');
const roomsDOM = DOM.GE('.rooms');
const emailDOM = DOM.GE('.email');
const phoneDOM = DOM.GE('.phone');

// set minimal day for choose
const today = new Date().toISOString().split('T')[0];
dateDOM.min = today;

dateDOM.addEventListener('change', (e) => {
  API.checkFreeDays(e.target.value)
  .then(d => {
    if (d?.data) {
      roomsRender(d.data, rooms);
    }
  });
});

function roomsRender(rooms, roomsDOM) {
  for (let i = 0; i < rooms.length; ++i) {
    const option = DOM.CE('option');
    option.value = rooms[i];
    option.innerHTML = rooms[i];

    roomsDOM.appendChild(option);
  }
}