<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/login.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$login = new Login($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$login->email = $info[0]['correo'];

// products array
$login_arr=array();
$login_arr["data"]=array();

// query de lectura
$stmt = $login->getUsuarioByEmail($login->email);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){    
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $login_item=array(
            "id" => $id * 1,
            "empresa_id" => $empresa_id * 1,
            "nombre_comercial" => $nombre_comercial,
            "nombre" => $nombre,
            "apellido" => $apellido,
            "tipo_documento_id" => $tipo_documento_id * 1,
            "tipo_documento" => $tipo_documento,
            "num_documento" => $num_documento,
            "email" => $email,
            "celular" => $celular,
            "empleado_id" => $empleado_id * 1,
            "clave" => $clave
        );
 
        array_push($login_arr["data"], $login_item);
    }
 
    echo json_encode($login_arr);
}
 
else{
    echo json_encode($login_arr);
}

?>