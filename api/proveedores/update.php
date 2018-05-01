<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/proveedores.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$proveedores = new Proveedores($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$proveedores->RUC = $info[0]["RUC"];
$proveedores->nombre = $info[0]["nombre"];
$proveedores->direccion = $info[0]["direccion"];
$proveedores->email = $info[0]["email"];
$proveedores->convencional = $info[0]["convencional"];
$proveedores->celular = $info[0]["celular"];
$proveedores->opcional = $info[0]["opcional"];
$proveedores->credito = $info[0]["credito"];
$proveedores->web = $info[0]["web"];
$proveedores->contacto = $info[0]["contacto"];
$proveedores->nota_pedido = $info[0]["nota_pedido"];
$proveedores->parte_relacionada = $info[0]["parte_relacionada"];
$proveedores->automatico = $info[0]["automatico"];
$proveedores->id = $info[0]["id"];

// modificar proveedor
$response = $proveedores->update();
if($response == true){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>