const single = new datepicker.DatePicker({ selector: '#datepicker' });
const range = new datepicker.DatePickerRange({
    language: 'pt-BR',
    leftSelector: '#left-datepicker',
    rightSelector: '#right-datepicker',
    appendTo: '.jumbotron'
});

single.calendar.on('clickDate', event => {
  let date = event.detail;
  console.log('single:date', date)
  console.log(date.toISOString())
  const browserTimezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const tokyoOffset = 540;
  const utcOffset = tokyoOffset * 60 * 1000;
  const utcDate = new Date((date.getTime() + browserTimezoneOffset) + utcOffset);
  console.log(utcDate);
  console.log(utcDate.getUTCHours());
  console.log(utcDate.toISOString());
});

range.leftDatePicker.calendar.on('clickDate', event => console.log('left:date', event.detail));
range.rightDatePicker.calendar.on('clickDate', event => console.log('right:date', event.detail));
