$(document).foundation();
$(".background").hide();
$("#message").hide();

$(function() {
  $('#login').facebook_login({
    appId: '768275313321557',  //your facebook application id
    onSuccess:   function() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api("me?fields=id,email, cover, name ,first_name, last_name ,age_range, link, gender,locale, picture.width(150).height(150), timezone, updated_time,verified",

      function(response) {

        console.log('Successful login for: ' + response.name);
        console.log('id: ' + response.id)
        $("#picture").append("<img id='picture-border' src= " + response.picture.data.url + " alt= />");
        $("#name").append(response.first_name + '<br>' + response.last_name);
        $("#gender").text(response.gender);
        $("#age").text(response.age_range.min);
        $("#age").append("- " + response.age_range.max);
        $("#locale").text(response.locale);
        $("#id").text(response.id);
        $("#email").text(response.email);

        for (i=0; i< 70;i++){
          $("#link").append(response.link);
        }

        $(".login-area").fadeOut();
        $(".background").delay(500).slideDown();
        $("#message").delay(700).fadeIn();

        $('.background-img').css("background-image", "url('" + response.cover.source + "')");

        console.log(response.age_range)

        var firebaseRef = firebase.database().ref();
        var usersRef = firebaseRef.child("Users");
        usersRef.push({
          id:response.id,
          cover:response.cover.source,
          first_name:response.first_name,
          last_name:response.last_name,
          // age_range_max:response.age_range.max,
          // age_range_min:response.age_range.min,
          link:response.link,
          gender:response.gender,
          locale:response.locale,
          picture:response.picture.data.url
        })

        if(response.age_range.min === undefined){
          return;
        }else {
          usersRef.push({age_range_min:response.age_range.min});
        }

      });
    },   //what to do on success, usually redirect
    onError: function(data) {},     //what to do on error
    permissions: 'email'   //what permissions you need, default is just email
  });
});


$('#login').bind('click', function() {
       $(this).unbind('click');
});
