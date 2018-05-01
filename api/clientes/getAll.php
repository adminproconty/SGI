<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/clientes.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$clientes = new Clientes($db);
 
// query de lectura
$stmt = $clientes->readPersonas();
$num = $stmt->rowCount();

// personas array
$personas_arr=array();
$personas_arr["data"]=array();

$clientes_arr = array();
$clientes_arr['data'] = array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        if($nombre!='Consumidor final'){
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
    }
}

// query de lectura
$stmt = $clientes->readUsuarios();
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
 
        $usuario_item=array(
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
            "opcional" => $opcional,
            "clave" => $clave
        );
 
        array_push($usuarios_arr["data"], $usuario_item);
    }
}

// query de lectura
$stmt = $clientes->readEmpleados();
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
}

$num_personas = count($personas_arr["data"]);
$num_usuarios = count($usuarios_arr["data"]);
$num_empleados = count($empleados_arr["data"]);

if($num_personas > 0){
    if($num_usuarios > 0){
        for($i = 0; $i < $num_personas; $i++){
            $coincidencia = 0;
            for($j = 0; $j < $num_usuarios; $j++){
                if($personas_arr["data"][$i]["id"] == $usuarios_arr["data"][$j]["persona_id"]){
                    $coincidencia = 1;
                }
            }
            if($coincidencia == 0){
                array_push($clientes_arr["data"], $personas_arr["data"][$i]);
            }
        }  
        if($num_empleados > 0){
            for($i = 0; $i < count($clientes_arr["data"]); $i++){
                for($j = 0; $j < $num_empleados; $j++){
                    if($clientes_arr["data"][$i]["id"] == $empleados_arr["data"][$j]["persona_id"]){
                        unset($clientes_arr["data"][$i]);
                    }
                }
            }  
        }      
    }else{
        if($num_empleados > 0){
            for($i = 0; $i < $num_personas; $i++){
                $coincidencia = 0;
                for($j = 0; $j < $num_empleados; $j++){
                    if($personas_arr["data"][$i]["id"] == $empleados_arr["data"][$j]["persona_id"]){
                        $coincidencia = 1;
                    }
                }
                if($coincidencia == 0){
                    array_push($clientes_arr["data"], $personas_arr["data"][$i]);
                }
            }
        }
    }    
}


echo json_encode($clientes_arr);
 
?>