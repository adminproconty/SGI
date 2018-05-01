<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/tipos_tarjetas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$tipos_tarjetas = new TiposTarjetas($db);
 
// query de lectura
$stmt = $tipos_tarjetas->read();
$num = $stmt->rowCount();

// tipos_tarjetas array
$tipos_tarjetas_arr=array();
$tipos_tarjetas_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $tipos_tarjetas_item=array(
            "id" => $id,
            "nombre" => $nombre
        );
 
        array_push($tipos_tarjetas_arr["data"], $tipos_tarjetas_item);
    }
 
    echo json_encode($tipos_tarjetas_arr);
}
 
else{
    echo json_encode($tipos_tarjetas_arr);
}
?>