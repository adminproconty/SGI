<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/productos.php';
include_once '../objects/costos.php';
include_once '../objects/producto_ivas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$productos = new Productos($db);
$costos = new Costos($db);
$ivas = new ProductoIvas($db);
 
// query de lectura
$stmt = $productos->read();
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
        if($materia_prima == 0){
            $materia_prima = false;
        }else{
            $materia_prima = true;
        }
        if($producto_final == 0){
            $producto_final = false;
        }else{
            $producto_final = true;
        }
        $producto_item=array(
            "id" => $id, 
            "categoria_id" => $categoria_id, 
            "categoria" => $categoria, 
            "nombre" => $nombre, 
            "unidad" => $unidad, 
            "codigo" => $codigo, 
            "descripcion" => $descripcion, 
            "materia_prima" => $materia_prima, 
            "producto_final" => $producto_final
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

    for($i = 0; $i < count($productos_arr["data"]); $i++){
        $ivas->producto_id = $productos_arr["data"][$i]["id"];
        $stmt = $ivas->getByProducto();
        $num = $stmt->rowCount();
        $productos_arr["data"][$i]["iva"] = array();
        $productos_arr["data"][$i]["ivas"] = array();

        if($num > 0){            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);                
                $add = array(
                    "id" => $id,
                    "producto_id" => $producto_id,
                    "iva_id" => $iva_id,
                    "nombre" => $nombre,
                    "cantidad" => $cantidad
                );
                array_push($productos_arr["data"][$i]["iva"], $add);
                array_push($productos_arr["data"][$i]["ivas"], $iva_id);
            }
        }
    }

    echo json_encode($productos_arr);
}
 
else{
    echo json_encode($productos_arr);
}
?>