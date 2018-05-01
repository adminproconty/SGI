<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/empleados.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$empleados = new Empleados($db);
 
// query de lectura
$stmt = $empleados->read();
$num = $stmt->rowCount();

// empleados array
$empleados_arr=array();
$empleados_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $empleado_item=array(
            "id" => $id,
            "persona_id" => $persona_id,
            "nombre" => $nombre,
            "apellido" => $apellido,
            "tipo_documento" => $tipo_documento,
            "num_documento" => $num_documento,
            "direccion" => $direccion,
            "email" => $email,
            "convencional" => $convencional,
            "celular" => $celular,
            "opcional" => $opcional
        );
 
        array_push($empleados_arr["data"], $empleado_item);
    }
 
    echo json_encode($empleados_arr);
}
 
else{
    echo json_encode($empleados_arr);
}
?>