<?php
// ============================================================
// PARAMETROS GENERALES DE CONFIGURACION
// ============================================================

// =================================================================================
// CONFIGURACION DE ACCESO A LA BASE DE DATOS:
// =================================================================================
$_server   = "127.0.0.1"; // IP del servidor de mysql. Si mysql está escuchando en
                          // otro puerto, por ejemplo 3307, hay que añadírselo a la
                          // IP del servidor de la siguiente manera:
                          //     $_server   = "127.0.0.1:3307";
$_dataBase = "1010";      // Nombre de la BD en mysql
$_user     = "pcw";       // Usuario con acceso a la BD $_dataBase
$_password = "pcw";       // Contraseña del usuario
// =================================================================================
// SE ABRE LA CONEXION A LA BD
// =================================================================================
$link =  mysqli_connect($_server, $_user, $_password, $_dataBase);
if (mysqli_connect_errno()) {
  printf("Fallo en la conexión: %s\n", mysqli_connect_error());
  exit();
}
// =================================================================================
// SE CONFIGURA EL JUEGO DE CARACTERES DE LA CONEXION A UTF-8
// =================================================================================
mysqli_set_charset($link, 'utf8');
// =================================================================================
// Limpia y prepara el valor correspondiente a un parámetro recibido en el servidor
// procedente de una petición del cliente (ajax, etc)
// =================================================================================
function sanatize($valor)
{
  global $link;

  $valor_retorno = urldecode('' . $valor);
  $valor_retorno = mysqli_real_escape_string($link, $valor_retorno);

  return $valor_retorno;
}
?>