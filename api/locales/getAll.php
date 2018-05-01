<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/locales.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$locales = new Locales($db);
 
// query de lectura
$stmt = $locales->read();
$num = $stmt->rowCount();

// products array
$locales_arr=array();
$locales_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){    
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $local_item=array(
            "id" => $id,
            "empresa_id" => $empresa_id,
            "nombre" => $nombre,
            "direccion" => $direccion,
            "email" => $email,            
            "telefono" => $telefono,
            "celular" => $celular
        );
 
        array_push($locales_arr["data"], $local_item);
    }
 
    echo json_encode($locales_arr);
}
 
else{
    echo json_encode($locales_arr);
}
?>