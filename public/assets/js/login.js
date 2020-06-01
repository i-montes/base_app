function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}
function Sendlogin() {
    var email = document.getElementById('login-email').value
    var password = document.getElementById('login-password').value
    
    if (!ValidateEmail(email)){
        var element = document.getElementById('login-email');
        element.classList.add('is-invalid');
        if (email.length == 0) {
            $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">Por favor llene el campo de correo<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')    
            return (false);    
        }else{
            $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">Correo invalido, prueba con otro<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
            return (false);    
        }
    }

    var url =  host_app()+"/DomiAPI/api/v1/login";
    var method = "POST";
    var data = JSON.stringify({
        "email":email,
        "password":password
    });
    $('.alerts-error').html('<div class="alert alert-success" role="alert"><div class="spinner-border text-success" role="status"><span class="sr-only"></span></div>Iniciando sesion</div>')
    var response = RequestTo(url,method,data);

    response.done(function( msg ) {
        if(msg.error){
            $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+msg.response.message+'<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
        }else{
            setCookie("idsession", msg.response.user_id, 1);
            setCookie("session_token", msg.response.session_token, 1);
            setCookie("logged_in", true, 1);
            $('.alerts-error').html('<div class="alert alert-success" role="alert">Inicio de session correcto</div>')
            window.location.href = "/";

        }
    });
}

function login() {
    Sendlogin()    
}