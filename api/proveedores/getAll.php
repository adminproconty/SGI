<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/proveedores.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$proveedores = new Proveedores($db);
 
// query de lectura
$stmt = $proveedores->read();
$num = $stmt->rowCount();

// proveedores array
$proveedores_arr=array();
$proveedores_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        if ($nota_pedido == 1) {
            $nota_pedido = true;
        }else{
            $nota_pedido = false;
        } 
        if ($parte_relacionada == 1) {
            $parte_relacionada = true;
        }else{
            $parte_relacionada = false;
        }
        if ($automatico == 1) {
            $automatico = true;
        }else{
            $automatico = false;
        }
 
        $proveedores_item=array(
            "id" => $id,
            "RUC" => $RUC, 
            "nombre" => $nombre, 
            "direccion" => $direccion, 
            "email" => $email, 
            "convencional" => $convencional, 
            "celular" => $celular, 
            "opcional" => $opcional, 
            "credito" => $credito, 
            "web" => $web, 
            "contacto" => $contacto, 
            "nota_pedido" => $nota_pedido, 
            "parte_relacionada" => $parte_relacionada, 
            "automatico" => $automatico
        );
 
        array_push($proveedores_arr["data"], $proveedores_item);
    }
 
    echo json_encode($proveedores_arr);
}
 
else{
    echo json_encode($proveedores_arr);
}
?>