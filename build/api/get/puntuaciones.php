<?php
// FICHERO: api/get/puntuaciones.php
// PETICIONES GET ADMITIDAS:
// * api/puntuaciones -> devuelve la lista de puntuaciones
// =================================================================================
// =================================================================================
// INCLUSION DE LA CONEXION A LA BD
   require_once('../configbd.php');
// =================================================================================
// =================================================================================
if(strlen($_GET['prm']) > 0)
    $RECURSO = explode("/", substr($_GET['prm'],1));
else
    $RECURSO = [];
// =================================================================================
// CONFIGURACION DE SALIDA JSON Y CORS PARA PETICIONES AJAX
// =================================================================================
header("Access-Control-Allow-Orgin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");
// =================================================================================
// Se prepara la respuesta
// =================================================================================
$R     = [];  // Almacenará el resultado.
$mysql = 'select * from puntuacion order by puntos desc LIMIT 0, 10';
if($res = mysqli_query($link, $mysql))
{
  while( $row = mysqli_fetch_assoc( $res ) )
    $FILAS[] = $row;
  mysqli_free_result( $res );

  $RESPONSE_CODE       = 200; // código de respuesta por defecto: 200 - OK
  $R['RESULTADO'] = 'OK';
  $R['CODIGO']    = $RESPONSE_CODE;
  $R['FILAS']     = $FILAS;
}
else
{
  $RESPONSE_CODE    = 500;
  $R['RESULTADO']   = 'ERROR';
  $R['CODIGO']      = $RESPONSE_CODE;
  $R['DESCRIPCION'] = 'Error de servidor. No se ha podido realizar la operación.';
}

// =================================================================================
// SE CIERRA LA CONEXION CON LA BD
// =================================================================================
mysqli_close($link);
// =================================================================================
// SE DEVUELVE EL RESULTADO DE LA CONSULTA
// =================================================================================
http_response_code($RESPONSE_CODE);
print json_encode($R);
?>