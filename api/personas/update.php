<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/personas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$personas = new Personas($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$personas->nombre = $info[0]["nombre"];
$personas->apellido = $info[0]["apellido"];
$personas->tipo_documento = $info[0]["tipo_documento"];
$personas->num_documento = $info[0]["num_documento"];
$personas->direccion = $info[0]["direccion"];
$personas->descripcion = $info[0]["descripcion"];
$personas->email = $info[0]["email"];
$personas->convencional = $info[0]["convencional"];
$personas->celular = $info[0]["celular"];
$personas->opcional = $info[0]["opcional"];
$personas->id = $info[0]["id"]; 

//echo json_encode($personas); 

// modificar persona
$response = $personas->update();
if($response == true){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>