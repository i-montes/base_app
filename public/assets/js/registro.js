function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}


function validate_register(firstname,lastname,email,password) {
        $("#firstname").removeClass("is-invalid");
        $("#lastname").removeClass("is-invalid");
        $("#email").removeClass("is-invalid");
        $("#password").removeClass("is-invalid");

        if (firstname.length == 0 || firstname.length < 2) {
            var element = document.getElementById('firstname');
            element.classList.add('is-invalid');
            $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">Escribe tu nombre, por favor<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
            return false;
        }

        if (lastname.length == 0 || lastname.length < 2) {
            var element = document.getElementById('lastname');
            element.classList.add('is-invalid');
            $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">Escribe tu apellido, por favor<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
            return false;
        }

        if (!ValidateEmail(email)){
            var element = document.getElementById('email');
            element.classList.add('is-invalid');
            if (email.length == 0) {
                $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">Por favor llene el campo de correo<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')        
            }else{
            $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">Correo invalido, prueba con otro<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
            }


            return (false)}
        if (password.length < 6){
            var element = document.getElementById('password');
            element.classList.add('is-invalid');
            $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">Contraseña invalida, tiene que tener mas de 6 caracteres<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
            return (false)
        }
        return true;

    }

function SendRequestAddUser(){
    var terms = $('#terms').prop('checked');
    if (terms){
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        
        if(validate_register(firstname,lastname,email,password)){
            var url = host_api()+"/DomiAPI/api/v1/Register";
            var method = "POST";
            var data = JSON.stringify({
                "name":firstname,
                "lastname":lastname,
                "email":email,
                "password":password
            });
            $('.alerts-error').html('<div class="alert alert-success" role="alert"><div class="spinner-border text-success" role="status"><span class="sr-only"></span></div>Registrando usuario</div>')

            var response = RequestTo(url,method,data);

            response.done(function( msg ) {
                if(msg.error){
                    console.log(msg)
                    $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+msg.response.message+'<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
                } else{
                    window.location.href = "/";
                }
            });
        
            response.fail(function( jqXHR, textStatus ) {
                $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">ups! huston tenemos problemas, intentalo mas tarde.<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
            console.log(jqXHR)
            });

        } else{
            
        }

    }else{
        console.log(terms)
        document.getElementById('label-terms').style = 'color:red'
    }


}

