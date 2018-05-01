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

// products array
$login_arr=array();
$login_arr["data"]=array();

// query de lectura
$stmt = $login->getEmpresa($info[0]['id']);
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
            "empresa_id" => $empresa_id,
            "nombre_legal" => $nombre_legal,
            "nombre_comercial" => $nombre_comercial,
            "empresa_email" => $empresa_email,
            "empresa_RUC" => $empresa_RUC,
            "empresa_direccion" => $empresa_direccion,
            "empresa_telefono" => $empresa_telefono,
            "empresa_celular" => $empresa_celular
        );
 
        array_push($login_arr["data"], $login_item);
    }
 
    echo json_encode($login_arr);
}
 
else{
    echo json_encode($login_arr);
}

?>