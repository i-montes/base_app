/*=============================================
BOTÓN FACEBOOK
=============================================*/

$(".facebook").click(function(){

    FB.login(function(response){

        validarUsuario();

    }, {scope: 'public_profile, email'})

})

/*=============================================
VALIDAR EL INGRESO
=============================================*/

function validarUsuario(){

    FB.getLoginStatus(function(response){

        statusChangeCallback(response);

    })

}

/*=============================================
VALIDAMOS EL CAMBIO DE ESTADO EN FACEBOOK
=============================================*/

function statusChangeCallback(response){

    if(response.status === 'connected'){

        testApi();

    }else{
        console.log("response", response);
        swal({
          title: "¡ERROR!",
          text: "¡Ocurrió un error al ingresar con Facebook, vuelve a intentarlo!",
          type: "error",
          confirmButtonText: "Cerrar",
          closeOnConfirm: false
        },

        function(isConfirm){
            if (isConfirm) {    
                window.location = localStorage.getItem("rutaActual");
            } 
        });

    }

}

/*=============================================
INGRESAMOS A LA API DE FACEBOOK
=============================================*/

function testApi(){

    FB.api('/me?fields=id,first_name,last_name,email,picture',function(response){

        if(response.email == null){

            swal({
              title: "¡ERROR!",
              text: "¡Para poder ingresar al sistema debe proporcionar la información del correo electrónico!",
              type: "error",
              confirmButtonText: "Cerrar",
              closeOnConfirm: false
            },

            function(isConfirm){
                if (isConfirm) {    
                    window.location = localStorage.getItem("rutaActual");
                } 
            });

        }else{
            var id = response.id;
            var email = response.email;
            var firstname = response.first_name;
            var lastname = response.last_name;
            var foto = "http://graph.facebook.com/"+response.id+"/picture?type=large";
            var url = host_app()+"/DomiAPI/api/v1/Register/social";
            var method = "POST";
            var data = JSON.stringify({
                "type-auth":'facebook',
                "social-id":id,
                "name":firstname,
                "lastname":lastname,
                "email":email,
                "photo":foto
            });
            $('.alerts-error').html('<div class="alert alert-success" role="alert"><div class="spinner-border text-success" role="status"><span class="sr-only"></span></div>Registrando usuario</div>')
            var response = RequestTo(url,method,data);

            response.done(function( msg ) {
                if(msg.error){
                    $(".alerts-error").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+msg.response.message+'<i class="fa fa-sad-tear"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
                } else{
                    // localStorage.setItem('idsession', JSON.stringify(msg.response.user_id));
                    // localStorage.setItem('session_token', JSON.stringify(msg.response.session_token));
                    setCookie("idsession", msg.response.user_id, 1);
                    setCookie("session_token", msg.response.session_token, 1);
                    setCookie("logged_in", true, 1);
                    // function parseJwt (token) {
                    //     var base64Url = token.split('.')[1];
                    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    //     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    //     }).join(''));
                    
                    //     return JSON.parse(jsonPayload);
                    // };
                    // console.log(parseJwt(msg.response.session_token))

                    window.location.href = "/";
                }
            });
            // $.ajax({
            //     url:rutaOculta+"ajax/usuarios.ajax.php",
            //     method:"POST",
            //     data:datos,
            //     cache:false,
            //     contentType:false,
            //     processData:false,
            //     success:function(respuesta){

            //         if(respuesta == "ok"){

            //             window.location = localStorage.getItem("rutaActual");

            //         }else{

            //             swal({
            //               title: "¡ERROR!",
            //               text: "¡El correo electrónico "+email+" ya está registrado con un método diferente a Facebook!",
            //               type: "error",
            //               confirmButtonText: "Cerrar",
            //               closeOnConfirm: false
            //             },

            //             function(isConfirm){
            //                 if (isConfirm) {    

            //                  FB.getLoginStatus(function(response){

            //                      if(response.status === 'connected'){     

            //                         FB.logout(function(response){

            //                             deleteCookie("fblo_300012410734892");

            //                             setTimeout(function(){

            //                                 window.location=rutaOculta+"salir";

            //                             },500)

            //                         });

            //                         function deleteCookie(name){

            //                              document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            //                         }

            //                      }

            //                  })

            //                 } 
            //             });

            //         }

            //     }

            // })

        }

    })

}

/*=============================================
SALIR DE FACEBOOK
=============================================*/

$(".salir").click(function(e){

    e.preventDefault();

     FB.getLoginStatus(function(response){
        
         if(response.status === 'connected'){     

            FB.logout(function(response){

                deleteCookie("fblo_300012410734892");

                console.log("salir");

                setTimeout(function(){

                    window.location="/Salir";

                },500)

            });

            function deleteCookie(name){

                 document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            }

         }

     })

})