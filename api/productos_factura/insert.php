<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/productos_factura.php';
include_once '../objects/inventario.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$productos_facturas = new ProductosFactura($db);
$inventario = new Inventario($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);

for($i = 0; $i < count($info[0]["productos"]); $i++){   
    $productos_facturas->factura_id = $info[0]["factura_id"];
    $productos_facturas->producto_id = $info[0]["productos"][$i]["id"] * 1;
    $productos_facturas->cantidad = $info[0]["productos"][$i]["cantidad"];
    $productos_facturas->descripcion = $info[0]["productos"][$i]["desc"];
    $productos_facturas->precio_unitario = $info[0]["productos"][$i]["costo"];
    $productos_facturas->subtotal = $info[0]["productos"][$i]["pt"];
    $productos_facturas->iva = $info[0]["productos"][$i]["iva"];
    $productos_facturas->total_iva = $info[0]["productos"][$i]["total_iva"];
    $productos_facturas->insert();

    $stmt = $inventario->getByLocalProducto($info[0]["local_id"], $productos_facturas->producto_id);
    $contador = 0;
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        if($contador == 0) {
            extract($row);
            $stock = $cantidad * 1;
            $stock = $stock - ($info[0]["productos"][$i]["cantidad"] * 1);
            $inventario->id = $id * 1;
            $inventario->minimo_stock = $minimo_stock * 1;
            $inventario->cantidad = $stock;
            $inventario->update();
        }

        $contador++;
    }

}

echo json_encode(true); 
?>