<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/empresa.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$empresa = new Empresa($db);
 
// query de lectura
$stmt = $empresa->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // products array
    $empresa_arr=array();
    $empresa_arr["data"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $empresa_item=array(
            "id" => $id,
            "nombre_legal" => $nombre_legal,
            "nombre_comercial" => $nombre_comercial,
            "email" => $email,
            "RUC" => $RUC,
            "direccion" => $direccion,
            "telefono" => $telefono,
            "celular" => $celular
        );
 
        array_push($empresa_arr["data"], $empresa_item);
    }
 
    echo json_encode($empresa_arr);
}
 
else{
    echo json_encode(
        array("message" => "Problema con la conexión.")
    );
}
?>