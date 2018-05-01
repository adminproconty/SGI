<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/usuarios.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$usuarios = new Usuarios($db);
 
// query de lectura
$stmt = $usuarios->read();
$num = $stmt->rowCount();

// usuarios array
$usuarios_arr=array();
$usuarios_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        if($empleado == '0'){
            $empleado = false;
        }else{
            $empleado = true;
        }
 
        $usuario_item=array(
            "id" => $id * 1,
            "persona_id" => $persona_id * 1,
            "nombre" => $nombre,
            "apellido" => $apellido,
            "tipo_documento" => $tipo_documento,
            "num_documento" => $num_documento,
            "direccion" => $direccion,
            "email" => $email,
            "convencional" => $convencional,
            "celular" => $celular,
            "opcional" => $opcional,
            "clave" => $clave,
            "empleado" => $empleado
        );
 
        array_push($usuarios_arr["data"], $usuario_item);
    }
 
    echo json_encode($usuarios_arr);
}
 
else{
    echo json_encode($usuarios_arr);
}
?>