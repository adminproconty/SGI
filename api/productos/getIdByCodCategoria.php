<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/productos.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$productos = new Productos($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);

// query de lectura
$stmt = $productos->getIdByCodCategoria($info[0]["codigo"], $info[0]["categoria_id"]);
$num = $stmt->rowCount();

// productos array
$productos_arr=array();
$productos_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $producto_item=array(
            "id" => $id
        );
 
        array_push($productos_arr["data"], $producto_item);
    }
 
    echo json_encode($productos_arr);
}
 
else{
    echo json_encode($productos_arr);
}

?>