<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/tipo_cuentas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$tipoCuentas = new TipoCuentas($db);
 
// query de lectura
$stmt = $tipoCuentas->read();
$num = $stmt->rowCount();

// products array
$tipoCuentas_arr=array();
$tipoCuentas_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){    
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $cuenta_item=array(
            "id" => $id,
            "tipo_fuente" => $tipo_fuente,
            "nombre" => $nombre
        );
 
        array_push($tipoCuentas_arr["data"], $cuenta_item);
    }
 
    echo json_encode($tipoCuentas_arr);
}
 
else{
    echo json_encode($tipoCuentas_arr);
}
?>