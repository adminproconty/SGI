<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/bancos.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$bancos = new Bancos($db);
 
// query de lectura
$stmt = $bancos->read();
$num = $stmt->rowCount();

// bancos array
$bancos_arr=array();
$bancos_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);        
 
        $bancos_item=array(
            "id" => $id,
            "nombre" => $nombre
        );
 
        array_push($bancos_arr["data"], $bancos_item);
    }
    echo json_encode($bancos_arr);
}
 
else{
    echo json_encode($bancos_arr);
}
?>