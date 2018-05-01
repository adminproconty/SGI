<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/ingresos_transferencia.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$ingresos_transferencia = new IngresosTransferencia($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$ingresos_transferencia->ingresos_id = $info[0]["ingresos_id"];
$ingresos_transferencia->fecha = $info[0]["fecha"];
$ingresos_transferencia->banco_receptor_id = $info[0]["banco_receptor_id"];
$ingresos_transferencia->banco_emisor_id = $info[0]["banco_emisor_id"];
$ingresos_transferencia->monto = $info[0]["monto"];
$ingresos_transferencia->referencia = $info[0]["referencia"];

// insertar factura
$response = $ingresos_transferencia->insert();
if($response != false){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>