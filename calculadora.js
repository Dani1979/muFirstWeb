$(function()
{
  var teclaAcum="0";
  var coma=0; //estado coma decimal 0=no, 1=si;
  var ni=0; //número oculto o en espera.
  var operacCurso="no"; //operación en curso; "no" =  sin operación.
  var numOperaciones=0;
  var bloqueTeclaAnt='';
  var encencido = 'off';

// nos creamos un objeto para manejar la pantalla
  var pantalla = $("#textoPantalla") ;

//bloque encendido
  $("#encendido").on("click",function () {
    if( encendido==="on" ){
        pantalla.css({"color":"white"});
        pantalla.css({"background-color": "white"});
        encendido="off";
    }
    else{
        borradoTotal();
        pantalla.css({"color":"black"});
        pantalla.css({"background-color": "#00FFFF"});
        encendido="on";
    }
  });

//bloque numero
  $(".numero").on("click",function () {
    //inicializamos la pantalla
    if (pantalla.html() ==="0" || bloqueTeclaAnt =="igual" )
    {
        pantalla.html($(this).attr("value"));
        teclaAcum=$(this).attr("value");
        if ($(this).attr("value")===".") {
           pantalla.append("0.");
           teclaAcum=$(this).attr("value");
           coma=1;
        }
    }
    else
    {
       if ($(this).attr("value")==="." && coma===0) {
           pantalla.append($(this).attr("value"));
           teclaAcum+=($(this).attr("value"));
           coma=1;
       }
       else if ($(this).attr("value")==="." && coma===1) {

       }
       else {
           pantalla.append($(this).attr("value"));
           teclaAcum+=($(this).attr("value"));
       }
    }
    bloqueTeclaAnt='numero';
  });


// bloque operar
  $(".operar").on("click",function () {
    if(bloqueTeclaAnt!="operar"){
      if(numOperaciones == 0){
        numOperaciones++;
        //validamos si es una operacion especial que no lo resuelva directamente la funcion eval
        if($(this).attr("value")=="x^y"){
          pantalla.html(teclaAcum+"^");
          teclaAcum = "Math.pow("+teclaAcum+",";
        }
        else {
          teclaAcum+=($(this).attr("value"));
          pantalla.append($(this).attr("value"));
        }
      }
      else {
        // validamos que no viene de una operacion especial de un numero elevado a otro numero
        if($(this).attr("value")=="x^y"){
        //concatenamos el cierre de parentesis para cerrar la operacion especial de x^y
          if(teclaAcum.indexOf("M")==-1){
            teclaAcum=eval(teclaAcum);
            pantalla.html(teclaAcum+"^");
            teclaAcum = "Math.pow("+teclaAcum+",";
          }
          else {
            teclaAcum=eval(teclaAcum+")");
            pantalla.html(teclaAcum+"^");
            teclaAcum = "Math.pow("+teclaAcum+",";
          }
        }
        else {
          teclaAcum=eval(teclaAcum);
          teclaAcum+=($(this).attr("value"))
          pantalla.html(teclaAcum);
        }
      }
    }
    bloqueTeclaAnt="operar";
  })

//bloque operarEspecial
  $(".operarEspecial").on("click",function() {
    if (bloqueTeclaAnt!="operar"){
      if($(this).attr("value")=="Raiz"){
        teclaAcum =  Math.sqrt(eval(teclaAcum));
        pantalla.html(teclaAcum);
      }
      else if ($(this).attr("value")=="1/x") {
        teclaAcum =  1/eval(teclaAcum);
        pantalla.html(teclaAcum);
      }
      else if ($(this).attr("value")=="x^2") {
        teclaAcum =  Math.pow(eval(teclaAcum),2);
        pantalla.html(teclaAcum);
      }
    }
    // como es una operacion de un unico numero ponemos el bloque de origen como numero para que se pueda operar
    bloqueTeclaAnt="numero";
  })

// bloque igual
  $(".igual").on("click",function () {
    if(teclaAcum.indexOf("M")==-1){
      teclaAcum=eval(teclaAcum);
      pantalla.html(teclaAcum);
    }
    else {
      //concatenamos el cierre de parentesis para cerrar la operacion especial de x^y
      teclaAcum=eval(teclaAcum+")");
      pantalla.html(teclaAcum);
      numOperaciones=0;
    }
    bloqueTeclaAnt="igual";
  })

//borrado total
  $("#borradoTotal").on("click",function() {
    borradoTotal();
  })

  function borradoTotal(){
      pantalla.html(0);
      numOperaciones=0;
      bloqueTeclaAnt='';
      teclaAcum=0;
  }
});
