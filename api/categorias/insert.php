<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/categorias.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$categorias = new Categorias($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$categorias->nombre = $info[0]["nombre"];
$categorias->abreviatura = $info[0]["abreviatura"];
$categorias->descripcion = $info[0]["descripcion"];

// insertar categoria
$response = $categorias->insert();
if($response == true){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda agregar
    echo json_encode(false); 
}
?>