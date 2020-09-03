<?php
// FICHERO: api/post/puntuaciones.php
// PETICIONES POST ADMITIDAS:
// * api/puntuaciones
//      Params: nombre:nombre del jugador;puntos:puntos conseguidos
// =================================================================================
// =================================================================================
// INCLUSION DE LA CONEXION A LA BD
require_once('../configbd.php');
// =================================================================================
// CONFIGURACION DE SALIDA JSON Y CORS PARA PETICIONES AJAX
// =================================================================================
header("Access-Control-Allow-Orgin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");
// =================================================================================
// Se prepara la respuesta
// =================================================================================
$R             = [];  // Almacenará el resultado.
$RESPONSE_CODE = 200; // código de respuesta por defecto: 200 - OK
// =================================================================================
// =================================================================================
// Se supone que si llega aquí es porque todo ha ido bien y tenemos los datos correctos:
$PARAMS = $_POST;

if( !(isset($PARAMS['nombre']) && isset($PARAMS['puntos'])) )
{
  $RESPONSE_CODE    = 400;
  $R['RESULTADO']   = 'ERROR';
  $R['CODIGO']      = $RESPONSE_CODE;
  $R['DESCRIPCION'] = 'Faltan parámetros';
}
else
{
  // Se pillan el usuario y el login:
  $nombre = sanatize($PARAMS['nombre']);
  $puntos = sanatize($PARAMS['puntos']);
  try{
    // ******** INICIO DE TRANSACCION **********
    mysqli_query($link, 'BEGIN');
    $mysql  = 'insert into puntuacion(nombre,puntos) values("';
    $mysql .= $nombre . '",' . $puntos . ')';
    // Se ejecuta el sql
    if( mysqli_query( $link, $mysql ) )
    {
      $RESPONSE_CODE    = 201; // RESOURCE CREATED INSIDE A COLLECTION
      $R['RESULTADO']   = 'OK';
      $R['CODIGO']      = $RESPONSE_CODE;
      $R['DESCRIPCION'] = 'Puntuación guardada correctamente';
      $R['NOMBRE']      = $nombre;
      $R['PUNTOS']      = $puntos;
    }
    else
    {
      $RESPONSE_CODE    = 500; // INTERNAL SERVER ERROR
      $R['RESULTADO']   = 'ERROR';
      $R['CODIGO']      = $RESPONSE_CODE;
      $R['DESCRIPCION'] = 'Error indefinido al guardar la puntuación';
    }
    // ******** FIN DE TRANSACCION **********
    mysqli_query($link, "COMMIT");
  } catch(Exception $e){
    // Se ha producido un error, se cancela la transacción.
    mysqli_query($link, "ROLLBACK");
  }
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