<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/tipo_documento.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$tipoDocumento = new TipoDocumento($db);
 
// query de lectura
$stmt = $tipoDocumento->read();
$num = $stmt->rowCount();

// products array
$tipoDocumento_arr=array();
$tipoDocumento_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){    
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $tipoDocumento_item=array(
            "id" => $id,
            "nombre" => $nombre
        );
 
        array_push($tipoDocumento_arr["data"], $tipoDocumento_item);
    }
 
    echo json_encode($tipoDocumento_arr);
}
 
else{
    echo json_encode($tipoDocumento_arr);
}
?>