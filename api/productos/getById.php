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
include_once '../objects/costos.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$productos = new Productos($db);
$costos = new Costos($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);

// query de lectura
$stmt = $productos->getById($info[0]["id"]);
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
        if($activo == 0){
            $activo = false;
        }else{
            $activo = true;
        }
        $producto_item=array(
            "id" => $id,
            "tipo_producto_id" => $tipo_producto_id,
            "tipo_producto" => $tipo_producto,
            "categoria_id" => $categoria_id, 
            "categoria" => $categoria, 
            "nombre" => $nombre, 
            "unidad" => $unidad,
            "codigo" => $codigo, 
            "descripcion" => $descripcion,
            "activo" => $activo, 
            "iva_id" => $iva_id,
            "cantidad" => $cantidad
        );
 
        array_push($productos_arr["data"], $producto_item);
    }
 
    for($i = 0; $i < count($productos_arr["data"]); $i++){
        $costos->producto_id = $productos_arr["data"][$i]["id"];
        $stmt = $costos->readByProducto();
        $num = $stmt->rowCount();

        if($num > 0){
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $productos_arr["data"][$i]["costo"] = $costo;
            }
        } else {
            $productos_arr["data"][$i]["costo"] = 0.0;
        }
    }

    echo json_encode($productos_arr);
}
 
else{
    echo json_encode($productos_arr);
}

?>