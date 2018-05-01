<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/iva.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$iva = new IVA($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$iva->empresa_id = $info[0]["empresa_id"];
$iva->nombre = $info[0]["nombre"];
$iva->cantidad = $info[0]["cantidad"];
$iva->estado = $info[0]["estado"];

// insertar cuenta
$response = $iva->insert();
if($response == true){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda agregar
    echo json_encode(false); 
}
?>