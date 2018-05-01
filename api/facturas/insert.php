<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/facturas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$facturas = new Facturas($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$facturas->persona_id = $info[0]["persona_id"] * 1;
$facturas->local_id = $info[0]["local_id"] * 1;
$facturas->usuario_id = $info[0]["usuario_id"];
$facturas->serie = $info[0]["serie"];
$facturas->autorizacion = $info[0]["autorizacion"] * 1;
$facturas->subtotal = $info[0]["subtotal"];
$facturas->total_iva = $info[0]["total_iva"];
$facturas->total = $info[0]["total"];
$facturas->estatus_id = $info[0]["estatus_id"];

// insertar factura
$response = $facturas->insert();
if($response != false){
    echo json_encode($response * 1); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>