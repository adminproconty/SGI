<?php
class Compras {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $proveedor_id;
    public $tipo_documento_id;
    public $tipo_documento;
    public $documento_proveedor;
    public $nombre;
    public $serie;
    public $documento;
    public $autorizacion;
    public $fecha_comprobante;
    public $fecha_ingreso;
    public $fecha_caducidad;
    public $vencimiento;
    public $descripcion;
    public $subtotal;
    public $iva;
    public $total_iva;
    public $total;
    public $stock_inicial;


    public $id_pc;
    public $compras_id_pc;
    public $producto_id;
    public $producto;
    public $codigo;
    public $cantidad_pc;
    public $local_id;
    public $local;
    public $precio_unitario_pc;
    public $subtotal_pc;
    public $iva_pc;
    public $total_iva_pc;
    public $total_pc;
    
    public $metodo_id;
    public $compras_id;
    public $metodo_pago;
    public $cantidad_cancelada;

    public $tarjeta_id; 
    public $nombre_tarjeta; 
    public $numero_tarjeta;
    public $tipo_tarjeta_id;
    public $tipo_tarjeta;
    public $marca_tarjeta_id;
    public $marca_tarjeta;
    public $cuenta_tarjeta_id;
    public $nombre_cuenta;
    public $autorizacion_tarjeta;
    public $observacion;

    public $cuenta_id;
    public $bnco_id;
    public $nombre_banco;
    public $bnco_tipo_cuenta;
    public $tipo_cuenta;
    public $codigo_transferencia;
    public $banco_receptor_id;
    public $nombre_banco_receptor;

    public $numero_cheque;
    public $institucion;



    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas los stock iniciales
    function getAllStockInicial(){
    
        // select all query
        $query = "SELECT com.`id`, com.`serie`, com.`documento`, com.`autorizacion`, 
                    com.`fecha_comprobante`, com.`fecha_ingreso`, com.`fecha_caducidad`, 
                    com.`vencimiento`, com.`descripcion`, com.`subtotal`, com.`iva`, com.`total_iva`, 
                    com.`total` 
                    FROM `compras` as com
                    WHERE com.`stock_inicial` = 1 AND com.`empresa_id` = 1";  
                    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getAllCompras(){

        $query = "SELECT com.`id`, com.`proveedor_id`, prov.`tipo_documento_id`, 
                    td.`nombre` as tipo_documento, prov.`documento` as documento_proveedor, prov.`nombre`, 
                    com.`serie`, com.`documento`, com.`autorizacion`, com.`fecha_comprobante`, 
                    com.`fecha_ingreso`, com.`fecha_caducidad`, com.`vencimiento`, com.`descripcion`, 
                    com.`subtotal`, com.`iva`, com.`total_iva`, com.`total`
                    FROM `compras` as com
                    JOIN `proveedores` as prov ON (com.`proveedor_id` = prov.`id`)
                    JOIN `tipo_documento` as td ON (prov.`tipo_documento_id` = td.`id`)
                    WHERE com.`stock_inicial` = 0 AND com.`empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getProductosCompra($idcompra){
        $query = "SELECT pc.`id` as id_pc, pc.`compras_id` as compras_id_pc, pc.`producto_id`, 
                    pro.`nombre` as producto, pro.`codigo`, pc.`cantidad` as cantidad_pc, 
                    pc.`local_id`, loc.`nombre` as local, pc.`precio_unitario` as precio_unitario_pc, 
                    pc.`subtotal` as subtotal_pc, pc.`iva` as iva_pc, pc.`total_iva` as total_iva_pc, 
                    pc.`total` as total_pc
                    FROM `productos_compra` as pc
                    JOIN `productos` as pro ON (pc.`producto_id` = pro.`id`)
                    JOIN `locales` as loc ON (pc.`local_id` = loc.`id`)
                    WHERE pc.`compras_id` = ".$idcompra;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getPagosCompra($idcompra){
        $query = "SELECT `id` as id_pc, `metodo_id` FROM `pagos_compra` WHERE `compras_id` = ".$idcompra;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getPagosEfectivo($idpago) {
        $query = "SELECT pc.`id` as id_pc, pc.`compras_id`, pc.`metodo_id`, fp.`nombre` as metodo_pago, 
                    pc.`cantidad_cancelada` 
                    FROM `pagos_compra` as pc
                    JOIN `formas_pago` as fp ON (pc.`metodo_id` = fp.`id`)
                    WHERE pc.`id` =  ".$idpago;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getPagosTarjeta($idpago) {
        $query = "SELECT pc.`id` as id_pc, pc.`compras_id`, pc.`metodo_id`, fp.`nombre` as metodo_pago, 
                    pc.`cantidad_cancelada`, pc.`tarjeta_id`, tar.`nombre` as nombre_tarjeta, 
                    tar.`numero` as numero_tarjeta, tar.`tipo_tarjeta_id`, tt.`nombre` as tipo_tarjeta, 
                    tar.`marca_tarjeta_id`, mt.`nombre` as marca_tarjeta, 
                    tar.`cuenta_id` as cuenta_tarjeta_id, cue.`nombre` as nombre_cuenta, 
                    pc.`autorizacion_tarjeta`, pc.`observacion` 
                    FROM `pagos_compra` as pc
                    JOIN `formas_pago` as fp ON (pc.`metodo_id` = fp.`id`)
                    JOIN `tarjetas` as tar ON (pc.`tarjeta_id` = tar.`id`)
                    JOIN `tipos_tarjetas` as tt ON (tar.`tipo_tarjeta_id` = tt.`id`)
                    JOIN `marcas_tarjetas` as mt ON (tar.`marca_tarjeta_id` = mt.`id`)
                    JOIN `cuentas` as cue ON (tar.`cuenta_id` = cue.`id`)
                    WHERE pc.`id` = ".$idpago;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getPagosTransferencia($idpago) {
        $query = "SELECT pc.`id` as id_pc, pc.`compras_id`, pc.`metodo_id`, fp.`nombre` as metodo_pago, 
                    pc.`cantidad_cancelada`, pc.`cuenta_id`, cue.`nombre` as nombre_cuenta, 
                    cue.`bnco_id`, ban.`nombre` as nombre_banco, cue.`bnco_tipo_cuenta`, 
                    tc.`nombre` as tipo_cuenta, pc.`codigo_transferencia`, pc.`banco_receptor_id`, 
                    banc.`nombre` as nombre_banco_receptor, pc.`observacion` 
                    FROM `pagos_compra` as pc
                    JOIN `formas_pago` as fp ON (pc.`metodo_id` = fp.`id`)
                    JOIN `cuentas` as cue ON (pc.`cuenta_id` = cue.`id`)
                    JOIN `bancos` as ban ON (cue.`bnco_id` = ban.`id`)
                    JOIN `bancos` as banc ON (pc.`banco_receptor_id` = banc.`id`)
                    JOIN `tipo_cuentas` as tc ON (cue.`bnco_tipo_cuenta` = tc.`id`)
                    WHERE pc.`id` = ".$idpago;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getPagosCheque($idpago) {
        $query = "SELECT pc.`id` as id_pc, pc.`compras_id`, pc.`metodo_id`, fp.`nombre` as metodo_pago, 
                    pc.`cantidad_cancelada`, pc.`cuenta_id`, cue.`nombre` as nombre_cuenta, 
                    pc.`numero_cheque`, pc.`observacion` 
                    FROM `pagos_compra` as pc
                    JOIN `formas_pago` as fp ON (pc.`metodo_id` = fp.`id`)
                    JOIN `cuentas` as cue ON (pc.`cuenta_id` = cue.`id`)
                    WHERE pc.`id` = ".$idpago;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getPagosElectronicos($idpago) {
        $query = "SELECT pc.`id` as id_pc, pc.`compras_id`, pc.`metodo_id`, 
                    fp.`nombre` as metodo_pago, pc.`cantidad_cancelada`, 
                    pc.`institucion`, pc.`observacion` 
                    FROM `pagos_compra` as pc
                    JOIN `formas_pago` as fp ON (pc.`metodo_id` = fp.`id`)
                    WHERE pc.`id` = ".$idpago;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function insert(){
       
    
         // query to insert record
         $query = "INSERT INTO `compras`(`empresa_id`, `proveedor_id`, `serie`, 
                    `documento`, `autorizacion`, `fecha_comprobante`, `fecha_ingreso`, 
                    `fecha_caducidad`, `vencimiento`, `descripcion`, `subtotal`, `iva`, 
                    `total_iva`, `total`, `stock_inicial`) VALUES (
                        1,
                        ".$this->proveedor_id.",
                        '".$this->serie."',
                        '".$this->documento."',
                        '".$this->autorizacion."',
                        '".$this->fecha_comprobante."',
                        '".$this->fecha_ingreso."',
                        '".$this->fecha_caducidad."',
                        '".$this->vencimiento."',
                        '".$this->descripcion."',
                        ".$this->subtotal.",
                        ".$this->iva.",
                        ".$this->total_iva.",
                        ".$this->total.",
                        ".$this->stock_inicial."
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