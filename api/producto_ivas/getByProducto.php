<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/producto_ivas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$producto_ivas = new ProductoIvas($db);

// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$producto_ivas->producto_id = $info[0]["producto_id"];
 
// query de lectura
$stmt = $producto_ivas->getByProducto();
$num = $stmt->rowCount();

// producto_ivas array
$producto_ivas_arr=array();
$producto_ivas_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $producto_ivas_item=array(
            "id" => $id, 
            "producto_id" => $producto_id, 
            "iva_id" => $iva_id, 
            "nombre" => $nombre, 
            "cantidad" => $cantidad
        );
 
        array_push($producto_ivas_arr["data"], $producto_ivas_item);
    }
 
    echo json_encode($producto_ivas_arr);
}
 
else{
    echo json_encode($producto_ivas_arr);
}
?>