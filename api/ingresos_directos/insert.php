<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/ingresos_directo.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$ingresos_directo = new IngresosDirecto($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$ingresos_directo->ingresos_id = $info[0]["ingresos_id"];
$ingresos_directo->cuenta = $info[0]["Cuenta"];
$ingresos_directo->debe = $info[0]["Debe"];
$ingresos_directo->haber = $info[0]["Haber"];

//echo json_encode($ingresos); 

// insertar factura
$response = $ingresos_directo->insert();
if($response != false){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>