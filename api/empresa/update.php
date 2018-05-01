<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/empresa.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$empresa = new Empresa($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$empresa->id = $info[0]["id"];
$empresa->nombre_legal = $info[0]["nombre_legal"];
$empresa->nombre_comercial = $info[0]["nombre_comercial"];
$empresa->email = $info[0]["email"];
$empresa->RUC = $info[0]["RUC"];
$empresa->direccion = $info[0]["direccion"];
$empresa->telefono = $info[0]["telefono"];
$empresa->celular = $info[0]["celular"];


// modificar empresa
$response = $empresa->update();
if($response == true){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>