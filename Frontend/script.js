Date.prototype.toDateInputValue = (function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
});

const todayDate = new Date('dd/mm/yyyy');
document.querySelector('#calandar-input').value = new Date().toDateInputValue();