<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/ingresos.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$ingresos = new Ingresos($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$ingresos->empresa_id = $info[0]["empresa_id"];
$ingresos->fecha = $info[0]["fecha"];
$ingresos->recibo = $info[0]["recibo"];
$ingresos->cuenta_id = $info[0]["cuenta_id"];
$ingresos->descripcion = $info[0]["descripcion"];
$ingresos->referencia = $info[0]["referencia"];
$ingresos->documento = $info[0]["documento"];
$ingresos->total = $info[0]["total"];
$ingresos->tipo_ingreso = $info[0]["tipo_ingreso"];

//echo json_encode($ingresos); 

// insertar factura
$response = $ingresos->insert();
if($response != false){
    $response = $response * 1;
    echo json_encode($response); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>