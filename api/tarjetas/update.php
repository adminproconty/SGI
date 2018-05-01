<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/tarjetas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$tarjetas = new Tarjetas($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$tarjetas->id = $info[0]["id"];
$tarjetas->nombre = $info[0]["nombre"];
$tarjetas->numero = $info[0]["numero"];
$tarjetas->tipo_tarjeta_id = $info[0]["tipo_tarjeta_id"];
$tarjetas->marca_tarjeta_id = $info[0]["marca_tarjeta_id"];
$tarjetas->cuenta_id = $info[0]["cuenta_id"];

// modificar tarjeta
$response = $tarjetas->update();
if($response == true){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>