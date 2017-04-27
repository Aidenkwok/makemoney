$(document).foundation();
$(".background").hide();
$("#message").hide();

$(function() {
  $('#login').facebook_login({
    appId: '768275313321557',  //your facebook application id
    onSuccess:   function() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api("me?fields=id,name,location,birthday,friends,gender,first_name,last_name,email,picture.width(150).height(150),feed.limit(40),events", function(response) {
        console.log('Successful login for: ' + response.name);
        console.log('id: ' + response.id);
        // $("#info").append("<p>" + response.email + "</p>");
        $("#picture").append("<img id='picture-border' src= " + response.picture.data.url + " alt= />");
        $("#name").append(response.first_name + '<br>' + response.last_name);
        $("#gender").text(response.gender);
        $("#hometown").text(response.location.name);
        $("#birthday").text(response.birthday);
        $("#id").text(response.id);
        $("#email").text(response.email);
        $(".value").text("£" + response.friends.summary.total_count);
        $(".login-area").fadeOut();
        $(".background").delay(500).slideDown();
        $("#message").delay(700).fadeIn();

        var x;
        var feedList = [];
        for (x in response.feed.data){

          if (response.feed.data[x]['story'] === undefined){
            $("#feed").append(response.feed.data[x]['message'] + ", ");
            feedList.push(response.feed.data[x]['message']);
          } else{
            $("#feed").append(response.feed.data[x]['story'] + ", ");
            feedList.push(response.feed.data[x]['story']);
          }
        };

        var i;
        var eventList = [];
        for (i = 0; i < 3; i++) {
          $("#events").append(response.events.data[i]['name'] + '<br>');
          eventList.push(response.events.data[i]['name']);
        };

        var firebaseRef = firebase.database().ref();
        var usersRef = firebaseRef.child("Users");
        usersRef.push({
          id:response.id,
          name:response.name,
          gender:response.gender,
          email:response.email,
          location:response.location.name,
          birthday:response.birthday,
          friends:response.friends.summary.total_count,
          picture:response.picture.data.url,
          feed:feedList,
          events:eventList
        })


      });
    },   //what to do on success, usually redirect
    onError: function(data) {},     //what to do on error
    permissions: 'email'   //what permissions you need, default is just email
  });
});

$('#login').bind('click', function() {
       $(this).unbind('click');
});
