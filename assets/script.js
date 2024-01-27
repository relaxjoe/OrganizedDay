$(document).ready(function() {
  // Function to update the current day at the top of the calendar
  function updateCurrentDay() {
      $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  }

  // Call the function to set the current day
  updateCurrentDay();

  // Function to update the color coding of time blocks
  function updateTimeBlockColors() {
      var currentHour = dayjs().hour();

      $('.time-block').each(function() {
          var blockHour = parseInt($(this).attr('id').split('-')[1]);
          $(this).removeClass('past present future');

          if (blockHour < currentHour) {
              $(this).addClass('past');
          } else if (blockHour === currentHour) {
              $(this).addClass('present');
          } else {
              $(this).addClass('future');
          }
      });
  }

  // Update the time block colors initially and every minute
  updateTimeBlockColors();
  setInterval(updateTimeBlockColors, 60000);

  // Save button event listener
  $('.saveBtn').on('click', function() {
      var hourId = $(this).parent().attr('id');
      var eventText = $(this).siblings('.description').val();
      localStorage.setItem(hourId, eventText);
  });

  // Load saved events from local storage
  $('.time-block').each(function() {
      var hourId = $(this).attr('id');
      var savedEvent = localStorage.getItem(hourId);
      if (savedEvent) {
          $(this).find('.description').val(savedEvent);
      }
  });
});
