<?php
class Facturas {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $persona_id;
    public $local_id;
    public $nombre_local;
    public $usuario_id;        
    public $serie;    
    public $autorizacion;
    public $subtotal;
    public $total_iva;
    public $total;
    public $estatus_id;
    public $estatus;
    public $tipo_factura;
    public $fecha;
    public $nombre_cliente;
    public $apellido_cliente;
    public $tipo_documento_id;
    public $tipo_documento;
    public $num_documento_cliente;
    public $direccion_cliente;
    public $descripcion_cliente;
    public $email_cliente;
    public $convencional_cliente;
    public $celular_cliente;
    public $opcional_cliente;
    public $producto_id;
    public $nombre_producto;
    public $unidad_producto;
    public $codigo_producto;
    public $cantidad;
    public $descripcion;
    public $precio_unitario;
    public $subtotal_producto;
    public $iva;
    public $total_iva_producto;
    public $pago_id;
    public $metodo_pago_id;
    public $metodo_pago;
    public $cantidad_cancelada;
    public $cuenta_id;
    public $cuenta;
    public $banco;
    public $tipo_tarjeta_id;
    public $tipo_tarjeta;
    public $marca_tarjeta_id;
    public $numero_tarjeta;
    public $fecha_vencimiento_tarjeta;
    public $seguridad_tarjeta;
    public $autorizacion_tarjeta;
    public $titular;
    public $numero_cheque;
    public $codigo_transferencia;
    public $email_pago;
    public $telefono_pago;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas las facturas
    function read(){
    
        // select all query
        $query = "SELECT fac.`id`, fac.`persona_id`, per.`nombre` as nombre_cliente, 
                    per.`apellido` as apellido_cliente, per.`tipo_documento` as tipo_documento_id, 
                    td.`nombre` as tipo_documento,  per.`num_documento` as num_documento_cliente, 
                    per.`direccion` as direccion_cliente, per.`descripcion` as descripcion_cliente, 
                    per.`email` as email_cliente, per.`convencional` as convencional_cliente, 
                    per.`celular` as celular_cliente, per.`opcional` as opcional_cliente, 
                    fac.`empresa_id` as empresa_id, fac.`local_id` as local_id, 
                    loc.`nombre` as nombre_local, fac.`fecha`, fac.`usuario_id` as usuario_id, 
                    fac.`serie`, fac.`autorizacion`, fac.`subtotal`, fac.`total_iva`, fac.`total`, 
                    fac.`estatus_id` as estatus_id, est.`nombre` as estatus
                    FROM `facturas` as fac
                    JOIN `personas` as per ON (fac.`persona_id` = per.`id`)
                    JOIN `tipo_documento`as td ON (per.`tipo_documento` = td.`id`)
                    JOIN `empresa` as emp ON (fac.`empresa_id` = emp.`id`)
                    JOIN `locales` as loc ON (fac.`local_id` = loc.`id`)
                    JOIN `estatus` as est ON (fac.`estatus_id` = est.`id`)
                    WHERE fac.`empresa_id` = 1";  
                    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById($idfactura){

        $query = "SELECT fac.`id`, fac.`persona_id`, per.`nombre` as nombre_cliente, 
                    per.`apellido` as apellido_cliente, per.`tipo_documento` as tipo_documento_id, 
                    td.`nombre` as tipo_documento,  per.`num_documento` as num_documento_cliente, 
                    per.`direccion` as direccion_cliente, per.`descripcion` as descripcion_cliente, 
                    per.`email` as email_cliente, per.`convencional` as convencional_cliente, 
                    per.`celular` as celular_cliente, per.`opcional` as opcional_cliente, 
                    fac.`empresa_id` as empresa_id, fac.`local_id` as local_id, 
                    loc.`nombre` as nombre_local, fac.`fecha`, fac.`usuario_id` as usuario_id, 
                    fac.`serie`, fac.`autorizacion`, fac.`subtotal`, fac.`total_iva`, fac.`total`, 
                    fac.`estatus_id` as estatus_id, est.`nombre` as estatus
                    FROM `facturas` as fac
                    JOIN `personas` as per ON (fac.`persona_id` = per.`id`)
                    JOIN `tipo_documento`as td ON (per.`tipo_documento` = td.`id`)
                    JOIN `empresa` as emp ON (fac.`empresa_id` = emp.`id`)
                    JOIN `locales` as loc ON (fac.`local_id` = loc.`id`)
                    JOIN `estatus` as est ON (fac.`estatus_id` = est.`id`)
                    WHERE fac.`empresa_id` = 1 AND fac.`id` = ".$idfactura;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getProductosFactura($idfactura){
        $query = "SELECT pf.`id` as producto_factura_id, pf.`factura_id`, pf.`producto_id` as producto_id, 
                    prod.`unidad` as unidad_producto, prod.`nombre` as nombre_producto, 
                    prod.`codigo` as codigo_producto, pf.`cantidad`, pf.`descripcion`, 
                    pf.`precio_unitario`, pf.`subtotal` as subtotal_producto, pf.`iva`, 
                    pf.`total_iva` as total_iva_producto
                    FROM `productos_factura` as pf
                    JOIN `productos` as prod ON (pf.`producto_id` = prod.`id`)
                    WHERE pf.`factura_id` = ".$idfactura;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getPagosFactura($idfactura){
        $query = "SELECT pf.`id` as pago_id, pf.`metodo_id` as metodo_pago_id, 
                    fp.`nombre` as metodo_pago, pf.`cantidad_cancelada`, pf.`cuenta_id`, pf.`banco`, 
                    pf.`tipo_tarjeta_id`, pf.`marca_tarjeta_id`, pf.`numero_tarjeta`, 
                    pf.`fecha_vencimiento_tarjeta`, pf.`seguridad_tarjeta`, pf.`autorizacion_tarjeta`, 
                    pf.`titular`, pf.`numero_cheque`, pf.`codigo_transferencia`, pf.`email` as email_pago, 
                    pf.`telefono` as telefono_pago
                    FROM `pagos_facturas` as pf 
                    JOIN `formas_pago` as fp ON (fp.`id` = pf.`metodo_id`) 
                    WHERE pf.`factura_id` = ".$idfactura;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function insert(){
       
    
         // query to insert record
         $query = "INSERT INTO `facturas`(`persona_id`, `empresa_id`, `local_id`, `tipo_factura`, 
                    `fecha`, `usuario_id`, `serie`, `autorizacion`, `subtotal`, `total_iva`, `total`, `estatus_id`) 
                    VALUES (
                        ".$this->persona_id.",
                        1,
                        ".$this->local_id.",
                        1,
                        now(),
                        ".$this->usuario_id.",
                        '".$this->serie."',
                        ".$this->autorizacion.",
                        ".$this->subtotal.",
                        ".$this->total_iva.",
                        ".$this->total.",
                        ".$this->estatus_id."
                        )";

        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);

        // execute query
        if($stmt->execute()){
            return $this->conn->lastInsertId();
        }else{
            return false;
        }   
    }

}
?>