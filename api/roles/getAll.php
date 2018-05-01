<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/roles.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$roles = new Roles($db);
 
// query de lectura
$stmt = $roles->read();
$num = $stmt->rowCount();

// roles array
$roles_arr=array();
$roles_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $rol_item=array(
            "id" => $id,
            "empresa_id" => $empresa_id,
            "nombre" => $nombre,
            "descripcion" => $descripcion
        );
 
        array_push($roles_arr["data"], $rol_item);
    }
 
    echo json_encode($roles_arr);
}
 
else{
    echo json_encode($roles_arr);
}
?>