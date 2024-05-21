import DOM from "../../tools/dom.js";
import API from "../../tools/api.js";

const date = DOM.GE('.date');
const name = DOM.GE('.name');
const surname = DOM.GE('.surname');
const rooms = DOM.GE('.rooms');
const email = DOM.GE('.email');
const phone = DOM.GE('.phone');

// set minimal day for choose
const today = new Date().toISOString().split('T')[0];
date.min = today;

date.addEventListener('change', (e) => {
  API.checkFreeDays(e.target.value)
  .then(d => {
    console.log(d);
    if (d?.message === '') {
      
    }
  });
});