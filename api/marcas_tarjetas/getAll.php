<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/marcas_tarjetas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$marcas_tarjetas = new MarcasTarjetas($db);
 
// query de lectura
$stmt = $marcas_tarjetas->read();
$num = $stmt->rowCount();

// tarjetas array
$marcas_tarjetas_arr=array();
$marcas_tarjetas_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){
    
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        $marcas_tarjetas_item=array(
            "id" => $id,
            "nombre" => $nombre
        );

        array_push($marcas_tarjetas_arr["data"], $marcas_tarjetas_item);
    }   
}

echo json_encode($marcas_tarjetas_arr);

?>