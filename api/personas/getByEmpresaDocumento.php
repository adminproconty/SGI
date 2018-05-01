<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/personas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$personas = new Personas($db);

// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$personas->empresa_id= $info[0]["empresa_id"];
$personas->num_documento = $info[0]["num_documento"];
 
// query de lectura
$stmt = $personas->readByEmpresaDocumento($personas->empresa_id,$personas->num_documento);
$num = $stmt->rowCount();

// personas array
$personas_arr=array();
$personas_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $persona_item=array(
            "id" => $id,
            "empresa_id" => $empresa_id,
            "nombre" => $nombre,
            "apellido" => $apellido,
            "tipo_documento" => $tipo_documento,
            "num_documento" => $num_documento,
            "direccion" => $direccion,
            "descripcion" => $descripcion,
            "email" => $email,
            "convencional" => $convencional,
            "celular" => $celular,
            "opcional" => $opcional
        );
 
        array_push($personas_arr["data"], $persona_item);
    }
 
    echo json_encode($personas_arr);
}
 
else{
    echo json_encode($personas_arr);
}
?>