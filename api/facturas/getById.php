<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// incluye la configuración de la base de datos y la conexión
include_once '../config/database.php';
include_once '../objects/facturas.php';
 
// inicia la conexión a la base de datos
$database = new Database();
$db = $database->getConnection();
 
// inicia el objeto
$facturas = new Facturas($db);

// get posted data
$data = json_decode(file_get_contents('php://input'), true);

$info = array($data);
 
// configura los valores recibidos en post de la app
$facturas->id = $info[0]["id"] * 1;
 
// query de lectura
$stmt = $facturas->getById($facturas->id);
$num = $stmt->rowCount();

// facturas array
$facturas_arr=array();
$facturas_arr["data"]=array();
 
// check if more than 0 record found
if($num>0){ 
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);        
 
        $factura_item=array(
            "id" => $id,
            "persona_id" => $persona_id,
            "nombre_cliente"=> $nombre_cliente,
            "apellido_cliente" => $apellido_cliente,
            "tipo_documento_id" => $tipo_documento_id,
            "tipo_documento" => $tipo_documento,
            "num_documento_cliente" => $num_documento_cliente,
            "direccion_cliente" => $direccion_cliente,
            "descripcion_cliente" => $descripcion_cliente,
            "email_cliente" => $email_cliente,
            "convencional_cliente" => $convencional_cliente,
            "celular_cliente" => $celular_cliente,
            "opcional_cliente" => $opcional_cliente,
            "empresa_id" => $empresa_id,
            "local_id" => $local_id,
            "nombre_local" => $nombre_local,
            "fecha" => $fecha,
            "usuario_id" => $usuario_id,
            "serie" => $serie,
            "autorizacion" => $autorizacion,
            "subtotal" => $subtotal,
            "total_iva" => $total_iva,
            "total" => $total,                        
            "estatus_id" => $estatus_id,
            "estatus" => $estatus,
            "productos" => array(),
            "pagos" => array()
        );

        $stmtProductos = $facturas->getProductosFactura($id);
        while ($filas = $stmtProductos->fetch(PDO::FETCH_ASSOC)){
            extract($filas);
            $producto=array(
                "producto_factura_id" => $producto_factura_id,
                "factura_id" => $factura_id,
                "producto_id" => $producto_id,
                "unidad_producto" => $unidad_producto,
                "nombre_producto" => $nombre_producto,
                "codigo_producto" => $codigo_producto,
                "cantidad" => $cantidad,
                "descripcion" => $descripcion,
                "precio_unitario" => $precio_unitario,
                "subtotal_producto" => $subtotal_producto,
                "iva" => $iva,
                "total_iva_producto" => $total_iva_producto
            );
            array_push($factura_item["productos"], $producto);
        }

        $stmtPagos = $facturas->getPagosFactura($id);
        while ($fila = $stmtPagos->fetch(PDO::FETCH_ASSOC)){
            extract($fila);
            $pago=array(
                "pago_id" => $pago_id,
                "metodo_pago_id" => $metodo_pago_id,
                "metodo_pago" => $metodo_pago,
                "cantidad_cancelada" => $cantidad_cancelada,
                "cuenta_id" => $cuenta_id,
                "banco" => $banco,
                "tipo_tarjeta_id" => $tipo_tarjeta_id,
                "marca_tarjeta_id" => $marca_tarjeta_id,
                "numero_tarjeta" => $numero_tarjeta,
                "fecha_vencimiento_tarjeta" => $fecha_vencimiento_tarjeta,
                "seguridad_tarjeta" => $seguridad_tarjeta,
                "autorizacion_tarjeta" => $autorizacion_tarjeta,
                "titular" => $titular,
                "numero_cheque" => $numero_cheque,
                "codigo_transferencia" => $codigo_transferencia,
                "email_pago" => $email_pago,
                "telefono_pago" => $telefono_pago
            );
            array_push($factura_item["pagos"], $pago);
        }
 
        array_push($facturas_arr["data"], $factura_item);
    }
    echo json_encode($facturas_arr);
}
 
else{
    echo json_encode($facturas_arr);
}
?>