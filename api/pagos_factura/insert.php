<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/pagos_factura.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$pagos_facturas = new PagosFactura($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);

for($i = 0; $i < count($info[0]["pagos"]); $i++){   
    $pagos_facturas->factura_id = $info[0]["factura_id"];
    $pagos_facturas->cxc_id = $info[0]["pagos"][$i]["cxc_id"];
    $pagos_facturas->metodo_id = $info[0]["pagos"][$i]["metodo_id"];
    $pagos_facturas->cantidad_cancelada = $info[0]["pagos"][$i]["aporte"];
    $pagos_facturas->cuenta_id = $info[0]["pagos"][$i]["cuenta_id"];

    if($pagos_facturas->cuenta_id == '') {
        $pagos_facturas->cuenta_id = 'NULL';
    }

    $pagos_facturas->banco = $info[0]["pagos"][$i]["banco"];

    if($pagos_facturas->banco == '') {
        $pagos_facturas->banco = 'NULL';
    }

    $pagos_facturas->tipo_tarjeta_id = $info[0]["pagos"][$i]["tipo_tarjeta_id"];
    $pagos_facturas->marca_tarjeta_id = $info[0]["pagos"][$i]["marca_tarjeta_id"];
    $pagos_facturas->numero_tarjeta = $info[0]["pagos"][$i]["numero_tarjeta"];
    $pagos_facturas->fecha_vencimiento_tarjeta = $info[0]["pagos"][$i]["fecha_vencimiento_tarjeta"];
    $pagos_facturas->seguridad_tarjeta = $info[0]["pagos"][$i]["seguridad_tarjeta"];
    $pagos_facturas->autorizacion_tarjeta = $info[0]["pagos"][$i]["autorizacion_tarjeta"];

    if($pagos_facturas->tipo_tarjeta_id == '' && $pagos_facturas->marca_tarjeta_id == '' && 
        $pagos_facturas->numero_tarjeta == '' && $pagos_facturas->fecha_vencimiento_tarjeta == '' &&
        $pagos_facturas->seguridad_tarjeta == '' && $pagos_facturas->autorizacion_tarjeta == '') {
            $pagos_facturas->tipo_tarjeta_id = 'NULL';
            $pagos_facturas->marca_tarjeta_id = 'NULL';
            $pagos_facturas->numero_tarjeta = 'NULL';
            $pagos_facturas->fecha_vencimiento_tarjeta = 'NULL';
            $pagos_facturas->seguridad_tarjeta = 'NULL';
            $pagos_facturas->autorizacion_tarjeta = 'NULL';
    }

    $pagos_facturas->titular = $info[0]["pagos"][$i]["titular"];

    if($pagos_facturas->titular == '') {
        $pagos_facturas->titular = 'NULL';
    }

    $pagos_facturas->numero_cheque = $info[0]["pagos"][$i]["numero_cheque"];

    if($pagos_facturas->numero_cheque == '') {
        $pagos_facturas->numero_cheque = 'NULL';
    }

    $pagos_facturas->codigo_transferencia = $info[0]["pagos"][$i]["codigo_transferencia"];

    if($pagos_facturas->codigo_transferencia == '') {
        $pagos_facturas->codigo_transferencia = 'NULL';
    }

    $pagos_facturas->email = $info[0]["pagos"][$i]["email"];

    if($pagos_facturas->email == '') {
        $pagos_facturas->email = 'NULL';
    }

    $pagos_facturas->telefono = $info[0]["pagos"][$i]["telefono"]; 
    
    if($pagos_facturas->telefono == '') {
        $pagos_facturas->telefono = 'NULL';
    }

    $pagos_facturas->insert();
}

echo json_encode(true); 
?>