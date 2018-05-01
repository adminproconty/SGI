<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/empleado_local.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$empleado_local = new EmpleadoLocal($db);
 
// query de lectura
$stmt = $empleado_local->read();
$num = $stmt->rowCount();

// empleado_local array
$empleado_local_arr=array();
$empleado_local_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){    
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $empleado_local_item=array(
            "id" => $id,
            "empleado_id" => $empleado_id,
            "persona_nombre" => $persona_nombre,
            "persona_apellido" => $persona_apellido,
            "persona_documento" => $persona_documento,
            "local_id" => $local_id,
            "nombre" => $nombre
        );
 
        array_push($empleado_local_arr["data"], $empleado_local_item);
    }
 
    echo json_encode($empleado_local_arr);
}
 
else{
    echo json_encode($empleado_local_arr);
}
?>