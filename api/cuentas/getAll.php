<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/cuentas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$cuentas = new Cuentas($db);
 
// query de lectura
$stmt = $cuentas->read();
$num = $stmt->rowCount();

$stmtCuentas = $cuentas->getElectronica();
$cantidad = $stmtCuentas->rowCount();

// cuentas array
$cuentas_arr=array();
$cuentas_arr["data"]=array();

if($cantidad>0){
    while ($filas = $stmtCuentas->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($filas);
    
        $cuenta_item=array(
            "id" => $id, 
            "empresa_id" => $empresa_id,
            "nombre" => $nombre,
            "tipo_fuente" => $tipo_fuente,
            "bnco_numero" => "NULL", 
            "bnco_id" => "NULL",
            "bnco_tipo_cuenta" => "NULL",
            "bnco_saldo_inicial" => "NULL",
            "email" => $email
        );
     
        array_push($cuentas_arr["data"], $cuenta_item);         
    }
}
 
// check if more than 0 record found
if($num>0){
    
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        $cuenta_item=array(
            "id" => $id,
            "empresa_id" => $empresa_id,
            "nombre" => $nombre,
            "tipo_fuente" => $tipo_fuente,
            "fuente_cuenta" => $fuente_cuenta,
            "bnco_numero" => $bnco_numero,
            "bnco_id" => $bnco_id,
            "banco" => $banco,
            "bnco_tipo_cuenta" => $bnco_tipo_cuenta,
            "tipo_cuenta" => $tipo_cuenta,
            "bnco_saldo_inicial" => $bnco_saldo_inicial,
            "email" => $email
        );

        for($i = 0; $i < count($cuentas_arr["data"]); $i++){
            if($id == $cuentas_arr["data"][$i]["id"]){
                array_splice($cuentas_arr["data"], $i, 1);
                array_push($cuentas_arr["data"], $cuenta_item);
            }            
        }  
    }   
}


echo json_encode($cuentas_arr);
?>