function onSuccess(googleUser) {
        var profile = googleUser.getBasicProfile();

        var url = host_app()+"/DomiAPI/api/v1/Register/social";
        var method = "POST";
        var data = JSON.stringify({
            "type-auth":'google',
            "social-id":profile.getId(),
            "name":profile.getGivenName(),
            "lastname":profile.getFamilyName(),
            "email":profile.getEmail(),
            "photo":profile.getImageUrl()
        });
        
        $('.alerts-error').html('<div class="Salert alert-success" role="alert"><div class="spinner-border text-success" role="status"><span class="sr-only"></span></div>Registrando usuario</div>')
        var response = RequestTo(url,method,data);

        response.done(function( msg ) {
          if(msg.error){
              $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+msg.response.message+'<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
          } else{
            // localStorage.setItem('idsession', JSON.stringify(msg.response.user_id));
            // sessionStorage.idsession = JSON.stringify(msg.response.user_id);
            // localStorage.setItem('session_token', JSON.stringify(msg.response.session_token));
            // sessionStorage.session_token = JSON.stringify(msg.response.session_token);
            setCookie("idsession", msg.response.user_id, 1);
            setCookie("session_token", msg.response.session_token, 1);
            setCookie("logged_in", true, 1);
            // function parseJwt (token) {
            //   var base64Url = token.split('.')[1];
            //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            //   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            //       }).join(''));
              
            //       return JSON.parse(jsonPayload);
            //   };
            window.location.href = "/";
          }
      });

    }

  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

  function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
  }
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 280,
    'height': 40,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}
