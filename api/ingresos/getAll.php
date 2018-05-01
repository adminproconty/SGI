<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/ingresos.php';
include_once '../objects/ingresos_directo.php';
include_once '../objects/ingresos_transferencia.php';
include_once '../objects/ingresos_tarjeta.php';
include_once '../objects/ingresos_cheque.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$ingresos = new Ingresos($db);
 
// query de lectura
$stmt = $ingresos->read();
$num = $stmt->rowCount();

// ingresos array
$ingresos_arr=array();
$ingresos_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        $ingreso_item=array(
            "id" => $id,
            "empresa_id" => $empresa_id,
            "fecha" => $fecha,
            "recibo" => $recibo,
            "cuenta_id" => $cuenta_id,
            "descripcion" => $descripcion,
            "referencia" => $referencia,
            "documento" => $documento,
            "total" => $total,
            "tipo_ingreso" => $tipo_ingreso,
            "ingreso" => $ingreso,
            "ingresos" => array()
        );

        if ($ingreso_item["ingreso"] == "Directo") {
            $ingreso_item["ingresos"] = getDirecto($id, $db);
        } else if ($ingreso_item["ingreso"] == "Transferencia"){
            $ingreso_item["ingresos"] = getTransferencias($id, $db);
        } else if ($ingreso_item["ingreso"] == "Tarjeta"){
            $ingreso_item["ingresos"] = getTarjetas($id, $db);
        } else if ($ingreso_item["ingreso"] == "Cheque"){
            $ingreso_item["ingresos"] = getCheques($id, $db);
        }
 
        array_push($ingresos_arr["data"], $ingreso_item);       
    }
}

function getDirecto($idingreso, $db){    
    $ingresos_directo = new IngresosDirecto($db);
    $stmt = $ingresos_directo->getById($idingreso);
    $num = $stmt->rowCount();
    $ingresos = array();
    if($num>0){ 
    
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
            $ingreso_item=array(
                "id" => $id,
                "ingresos_id" => $ingresos_id,
                "cuenta" => $cuenta,
                "debe" => $debe,
                "haber" => $haber
            );
     
            array_push($ingresos, $ingreso_item);       
        }        
    }
    return $ingresos;
}

function getTransferencias($idingreso, $db){    
    $ingresos_transferencia = new IngresosTransferencia($db);
    $stmt = $ingresos_transferencia->getById($idingreso);
    $num = $stmt->rowCount();
    $ingresos = array();
    if($num>0){ 
    
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
            $ingreso_item=array(
                "id" => $id,
                "ingresos_id" => $ingresos_id,
                "fecha" => $fecha,
                "banco_receptor_id" => $banco_receptor_id,
                "banco_receptor" => $banco_receptor,
                "banco_emisor_id" => $banco_emisor_id,
                "banco_emisor" => $banco_emisor,
                "monto" => $monto,
                "referencia" => $referencia
            );
     
            array_push($ingresos, $ingreso_item);       
        }        
    }
    return $ingresos;
}

function getTarjetas($idingreso, $db){    
    $ingresos_tarjeta = new IngresosTarjeta($db);
    $stmt = $ingresos_tarjeta->getById($idingreso);
    $num = $stmt->rowCount();
    $ingresos = array();
    if($num>0){ 
    
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
            $ingreso_item=array(
                "id" => $id, 
                "ingresos_id" => $ingresos_id,
                "fecha" => $fecha,
                "tarjeta_id" => $tarjeta_id,
                "numero" => $numero,
                "tipo_tarjeta" => $tipo_tarjeta,
                "marca_tarjeta" => $marca_tarjeta, 
                "bnco_id" => $bnco_id,
                "banco" => $banco, 
                "tipo_cuenta" => $tipo_cuenta, 
                "monto" => $monto
            );
     
            array_push($ingresos, $ingreso_item);       
        }        
    }
    return $ingresos;
}

function getCheques($idingreso, $db){    
    $ingresos_cheque = new IngresosCheque($db);
    $stmt = $ingresos_cheque->getById($idingreso);
    $num = $stmt->rowCount();
    $ingresos = array();
    if($num>0){ 
    
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
            $ingreso_item=array(
                "id" => $id,
                "ingresos_id" => $ingresos_id,
                "fecha" => $fecha,
                "banco_id" => $banco_id,
                "banco" => $banco,
                "numero" => $numero,
                "titular" => $titular,
                "monto" => $monto
            );
     
            array_push($ingresos, $ingreso_item);       
        }        
    }
    return $ingresos;
}

echo json_encode($ingresos_arr);
 
?>