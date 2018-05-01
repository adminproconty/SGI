<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/inventario.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$inventario = new Inventario($db);

// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// query de lectura
$stmt = $inventario->getByLocalProducto($info[0]["local_id"], $info[0]["producto_id"]);
$num = $stmt->rowCount();

// inventario array
$inventario_arr=array();
$inventario_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $inventario_item=array(
            "id" => $id,
            "local_id" => $local_id,
            "local_nom" => $local_nom,
            "producto_id" => $producto_id,
            "codigo" => $codigo,
            "nombre" => $nombre,
            "cantidad" => $cantidad,
            "minimo_stock" => $minimo_stock,
            "iva_id" => $iva_id * 1,
            "iva" => $iva * 1
        );
 
        array_push($inventario_arr["data"], $inventario_item);
    }
 
    echo json_encode($inventario_arr);
}
 
else{
    echo json_encode($inventario_arr);
}
?>