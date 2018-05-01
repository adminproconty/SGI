<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/usuarios.php';
include_once '../objects/personas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$usuarios = new Usuarios($db);
$personas = new Personas($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);

$personas->apellido = $info[0]["apellido"];
$personas->nombre = $info[0]["nombre"];
$personas->celular = $info[0]["celular"];
$personas->descripcion = $info[0]["descripcion"];
$personas->direccion = $info[0]["direccion"];
$personas->email = $info[0]["email"];
$personas->convencional = $info[0]["convencional"];
$personas->opcional = $info[0]["opcional"];
$personas->id = $info[0]["persona_id"];
$personas->num_documento = $info[0]["num_documento"];
$personas->tipo_documento = $info[0]["tipo_documento"];

$respuestaPersona = $personas->update();
if($respuestaPersona == true){
    // modificar usuario
    $response = $usuarios->update($info[0]["clave"],$info[0]["id"], $info[0]["empleado"]);
    if($response == true){
        echo json_encode(true); 
    }else{
        // Error en caso de que no se pueda modificar
        echo json_encode(false); 
    }
}

?>