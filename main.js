$(function() {
	$('#login').facebook_login({
	  appId: '768275313321557',  //your facebook application id
	  onSuccess: testAPI(), //what to do on success, usually redirect
	  onError: function(data) {},     //what to do on error
	  permissions: 'email'      //what permissions you need, default is just email
	});


	function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
    });
  };
});