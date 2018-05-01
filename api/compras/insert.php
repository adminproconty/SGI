<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/compras.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$compras = new Compras($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$compras->proveedor_id = $info[0]["proveedor_id"];
$compras->serie = $info[0]["serie"];
$compras->documento = $info[0]["documento"];
$compras->autorizacion = $info[0]["autorizacion"];
$compras->fecha_comprobante = $info[0]["fecha_comprobante"];
$compras->fecha_ingreso = $info[0]["fecha_ingreso"];
$compras->fecha_caducidad = $info[0]["fecha_caducidad"];
$compras->vencimiento = $info[0]["vencimiento"];
$compras->descripcion = $info[0]["descripcion"];
$compras->subtotal = $info[0]["subtotal"];
$compras->iva = $info[0]["iva"];
$compras->total_iva = $info[0]["total_iva"];
$compras->total = $info[0]["total"];
$compras->stock_inicial = $info[0]["stock_inicial"];

// insert compra
$response = $compras->insert();
if($response != false){
    $response = $response * 1;
    echo json_encode($response); 
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}
?>