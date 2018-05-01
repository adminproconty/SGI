<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/formas_pago.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$formas_pago = new FormasPago($db);
 
// query de lectura
$stmt = $formas_pago->read();
$num = $stmt->rowCount();

// formas_pago array
$formas_pago_arr=array();
$formas_pago_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $formas_pago_item=array(
            "id" => $id,
            "nombre" => $nombre
        );
 
        array_push($formas_pago_arr["data"], $formas_pago_item);
    }
 
    echo json_encode($formas_pago_arr);
}
 
else{
    echo json_encode($formas_pago_arr);
}
?>