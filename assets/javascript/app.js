// My food array
var food = ['Pizza', 'Cheeseburger', 'Spaghetti',
    'Pineapples', 'Fries', 'Donuts', 'Pancakes', 'Jello', 'Pie', 'Tacos'];

function createButtons() {
    //To ensure that the buttons don't all repeat when a new button is created
    $('#buttonsHere').empty();
    //Loops through the food array
    for (var i = 0; i < food.length; i++) {
        var b = $('<button>');
        b.addClass('food');
        b.attr('data-food', food[i]);
        b.text(food[i]);
        $('#buttonsHere').append(b);
    }
}
//Will create buttons for every item in the array
createButtons();

//Creating an on-click function
function clickingFoodItem() {
    $('.food').on('click', function() {
        var foodItem = $(this).data('food'); //Grabbing the data-attribute assigned to the button

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodItem + "&api_key=dc6zaTOxFJmzC&limit=10";
        //One URL for each gif in my array

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {
            console.log(response);
            var results = response.data;

        //Emptying div before gifs are added
        $('#gifsHere').empty();
          //Looping through the food array
            for (var i = 0; i < results.length; i++) {
                var imageHolder = results[i].images.fixed_height.url; //Link for the animated gif
                var pause = results[i].images.fixed_height_still.url; //Link for the still gif
                var foodImage = $('<img>');
                foodImage.attr('src', pause).attr('data-animate', imageHolder).attr('data-still', pause);
                foodImage.attr('data-state', 'still'); 
                $('#gifsHere').prepend(foodImage);
                foodImage.on('click', pausingGifs);
                //Adding the rating
                var rating = results[i].rating;
                var ratingText = $('<p class="p-styles">').text("Rating: " + rating);
                //Putting the ratings above the gifs
              $('#gifsHere').prepend(ratingText);
          }
        });
    });
}

clickingFoodItem();

//Creating new button based on user input
$(document).on('click', '#addGif', function() {
    var userFoodGif = $('#foodInput').val().trim();
    food.push(userFoodGif);
    //Creates the new button
    createButtons();
    //Generates gifs when clicked on
    clickingFoodItem();
    //Pauses or unpauses gifs when clicked on
    pausingGifs();
    return false;
});

//Creating the function to pause gifs
function pausingGifs(){
  var gifState = $(this).attr('data-state');
  console.log(gifState);

  if (gifState === 'still'){
    $(this).attr('src', $(this).data('animate'));
    $(this).attr('data-state', 'animate');
  } else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }
}
