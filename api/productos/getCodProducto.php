<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/productos.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$productos = new Productos($db);
 
// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);

// consultar código
$codigo = $productos->getAbreviaturaCategoria($info[0]["categoria_id"]);
$suma = $productos->sumaProductosCategoria($info[0]["categoria_id"]);

while ($row = $codigo->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $abv = $abreviatura;
}

if($suma->rowCount() > 0){
    while ($row = $suma->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $sumatoria =  $SUM;
        if($sumatoria == null) {
            $sumatoria = 1;
        }else{
            $sumatoria = $SUM;
            $sumatoria = $sumatoria + 1;
        }        
    }
}

if($sumatoria < 10){
    $sumatoria = "000".$sumatoria;
}else if($sumatoria > 9 && $sumatoria < 100){
    $sumatoria = "00".$sumatoria;
}else if($sumatoria > 99 && $sumatoria < 1000){
    $sumatoria = "0".$sumatoria;
}
$cod_arr = array();
$cod_arr["data"] = array(
    "codigo" => $abv,
    "numero" => $sumatoria
);
echo json_encode($cod_arr);



?>