<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/categorias.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$categorias = new Categorias($db);
 
// query de lectura
$stmt = $categorias->read();
$num = $stmt->rowCount();

// categorias array
$categorias_arr=array();
$categorias_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $categoria_item=array(
            "id" => $id, 
            "nombre" => $nombre, 
            "abreviatura" => $abreviatura, 
            "descripcion" => $descripcion
        );
 
        array_push($categorias_arr["data"], $categoria_item);
    }
 
    echo json_encode($categorias_arr);
}
 
else{
    echo json_encode($categorias_arr);
}
?>