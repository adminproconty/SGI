<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/iva.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$iva = new IVA($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);

// query de lectura
$stmt = $iva->getById($info[0]["id"]);
$num = $stmt->rowCount();

// productos array
$iva_arr=array();
$iva_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        if($estado == 1) {
            $estado = true;
        } else {
            $estado = false;
        }
 
        $iva_item=array(
            "id" => $id, 
            "empresa_id" => $empresa_id, 
            "fecha" => $fecha, 
            "nombre" => $nombre, 
            "cantidad" => $cantidad, 
            "estado" => $estado
        );
 
        array_push($iva_arr["data"], $iva_item);
    }

    echo json_encode($iva_arr["data"][0]);
}
 
else{
    echo json_encode($iva_arr["data"][0]);
}

?>