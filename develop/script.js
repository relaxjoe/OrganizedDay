// Wrap all code that interacts with the DOM in a call to jQuery
$(function () {
  // Add listener for click events on the save button
  $('.saveBtn').on('click', function() {
    var timeBlockId = $(this).closest('.time-block').attr('id');
    var userInput = $(this).siblings('.description').val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply past, present, or future class to each time block
  $('.time-block').each(function() {
    var blockHour = parseInt($(this).attr('id').replace('hour-', ''));
    var currentHour = dayjs().hour(); // Using Day.js to get current hour

    $(this).removeClass('past present future');
    if (blockHour < currentHour) {
      $(this).addClass('past');
    } else if (blockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  // Load and set user input from localStorage
  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var savedInput = localStorage.getItem(timeBlockId);
    if (savedInput) {
      $(this).find('.description').val(savedInput);
    }
  });

  // Display the current date in the page header
  $('#currentDay').text(dayjs().format('MMMM D, YYYY'));
});
