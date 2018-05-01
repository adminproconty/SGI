<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/pagos_compra.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$pagos_compra = new PagosCompra($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);

$pagos_compra->compras_id = $info[0]["compras_id"];
$pagos_compra->cxp_id = $info[0]["cxp_id"];
$pagos_compra->metodo_id = $info[0]["metodo_id"];
$pagos_compra->cantidad_cancelada = $info[0]["cantidad_cancelada"];
$pagos_compra->tarjeta_id = $info[0]["tarjeta_id"];
$pagos_compra->autorizacion_tarjeta = $info[0]["autorizacion_tarjeta"];
$pagos_compra->cuenta_id = $info[0]["cuenta_id"];
$pagos_compra->numero_cheque = $info[0]["numero_cheque"];
$pagos_compra->codigo_transferencia = $info[0]["codigo_transferencia"];
$pagos_compra->banco_receptor_id = $info[0]["banco_receptor_id"];
$pagos_compra->institucion = $info[0]["institucion"];
$pagos_compra->observacion = $info[0]["observacion"];

//echo json_encode($pagos_compra); 

$response = $pagos_compra->insert();
if($response == true){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda agregar
    echo json_encode(false); 
}
?>