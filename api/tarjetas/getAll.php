<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/tarjetas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$tarjetas = new Tarjetas($db);
 
// query de lectura
$stmt = $tarjetas->read();
$num = $stmt->rowCount();

// tarjetas array
$tarjetas_arr=array();
$tarjetas_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){
    
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        $tarjeta_item=array(
            "id" => $id,
            "empresa_id" => $empresa_id,
            "nombre" => $nombre,
            "numero" => $numero,
            "tipo_tarjeta_id" => $tipo_tarjeta_id,
            "tipo_tarjeta" => $tipo_tarjeta,
            "marca_tarjeta_id" => $marca_tarjeta_id,
            "marca_tarjeta" => $marca_tarjeta,
            "cuenta_id" => $cuenta_id,
            "bnco_id" => $bnco_id,
            "banco" => $banco
        );

        array_push($tarjetas_arr["data"], $tarjeta_item);
    }   
}

echo json_encode($tarjetas_arr);

?>