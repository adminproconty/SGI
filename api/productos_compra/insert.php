<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/productos_compra.php';
include_once '../objects/inventario.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$productos_compra = new ProductosCompra($db);

// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$productos_compra->compras_id = $info[0]["compras_id"];
$productos_compra->producto_id = $info[0]["producto_id"];
$productos_compra->cantidad = $info[0]["cantidad"];
$productos_compra->precio_unitario = $info[0]["precio_unitario"];
$productos_compra->subtotal = $info[0]["subtotal"];
$productos_compra->iva = $info[0]["iva"];
$productos_compra->total_iva = $info[0]["total_iva"];
$productos_compra->total = $info[0]["total"];
$productos_compra->local_id = $info[0]["local_id"];

// insert productos compra
$response = $productos_compra->insert();
if($response == true){
    $respuesta = getInvenatario($db,$info[0]["local_id"],$info[0]["producto_id"],$info[0]["cantidad"]);
    if($respuesta == true) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}else{
    // Error en caso de que no se pueda modificar
    echo json_encode(false); 
}

function getInvenatario($db,$local,$producto,$agregar){
    $inventario = new Inventario($db);
    $stmt = $inventario->getByLocalProducto($local, $producto);
    $num = $stmt->rowCount();
    if($num>0){ 
    
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
     
            $disponible = $cantidad;            
            $id = $id;
        }

        $cantidad = $disponible + $agregar;

        $inventario->id = $id;
        $inventario->cantidad = $cantidad;
        $inventario->minimo_stock = 1;

        $response = $inventario->update();
        if($response == true){
            return true;
        }else{
            return false; 
        }
    } else {
        $inventario->local_id = $local;
        $inventario->producto_id = $producto;
        $inventario->cantidad = $agregar;
        $inventario->minimo_stock = 1;

        $response = $inventario->insert();
        if($response == true){
            return true;
        }else{
            return false; 
        }
    }
}
?>