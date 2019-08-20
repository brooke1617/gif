var options = [
    "orange",
    "apple",
    "pineapple",
    "watermelon",

]

function renderButtons() {

    $("#buttons_here").empty();
    for (var i = 0; i < options.length; i++) {

        var pushHere = $('<button>');
        pushHere.text(options[i]);
        pushHere.attr('data-name', options[i]);
        pushHere.addClass('btn');

        $('#buttons_here').append(pushHere);

    }
};

renderButtons();

$("#submit").on('click', function (event) {
    event.preventDefault();
    var userInput = $("#userInput").val();
    options.push(userInput);
    renderButtons();
})



$(document).on('click', '.btn', function () {
    var topics = $(this).attr("data-name");


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topics + "&api_key=SpKxqIkJbChrNLcX83G8ZPC0wBDbrxZq&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",
        type: "json"

    })
        .then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var imageDiv = $("<div>");
                imageDiv.addClass('container');

                var pTag = $("<p>").text("Rating: " + results[i].rating);

                var fruitImg = $("<img>");
                fruitImg.addClass('fruitImg');

                fruitImg.attr("src", results[i].images.fixed_height.url);
                fruitImg.attr('data-still', results[i].images.fixed_height_still.url )
                fruitImg.attr('data-animate', results[i].images.fixed_height.url )
                fruitImg.attr("data-state", "animate");
                console.log(fruitImg);

                imageDiv.append(pTag);
                imageDiv.append(fruitImg);

                $("#gifs_here").prepend(imageDiv);
         
           }
           
        })

},
    
)


$(document).on("click", ".fruitImg", function () {

var state = $(this).attr("data-state");
if (state == "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
} else {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
};
})