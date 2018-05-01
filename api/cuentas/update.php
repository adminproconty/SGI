<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/cuentas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$cuentas = new Cuentas($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$cuentas->id = $info[0]["id"];
$cuentas->nombre = $info[0]["nombre"];
$cuentas->tipo_fuente = $info[0]["tipo_fuente"];
$cuentas->bnco_numero = $info[0]["bnco_numero"];
$cuentas->bnco_id = $info[0]["bnco_id"];
$cuentas->bnco_tipo_cuenta = $info[0]["bnco_tipo_cuenta"];
$cuentas->bnco_saldo_inicial = $info[0]["bnco_saldo_inicial"];
$cuentas->email = $info[0]["email"];

//echo json_encode($cuentas); 

// modificar cuenta
$response = $cuentas->update();
if($response == true){
    echo json_encode(true); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>