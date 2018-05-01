<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/empleado_local.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$empleado_local = new EmpleadoLocal($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);

$empleado = $info[0]["empleado_id"];
$locales = $info[0]["locales"];

for($i = 0; $i < count($locales); $i++){
    $resultado = $empleado_local->getByEmpledoLocal($empleado,$locales[$i]);
    if($resultado == 0){
        $empleado_local->local_id = $locales[$i];
        $empleado_local->empleado_id = $empleado;
        $empleado_local->insert();
    }
}

echo json_encode(true);

?>