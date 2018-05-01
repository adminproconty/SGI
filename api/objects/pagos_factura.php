<?php
class PagosFactura {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $factura_id;
    public $cxc_id;
    public $metodo_id;
    public $cantidad_cancelada;
    public $cuenta_id;
    public $banco;
    public $tipo_tarjeta_id;
    public $marca_tarjeta_id;
    public $numero_tarjeta;
    public $fecha_vencimiento_tarjeta;
    public $seguridad_tarjeta;
    public $autorizacion_tarjeta;
    public $titular;
    public $numero_cheque;
    public $codigo_transferencia;
    public $referencia;
    public $email;
    public $telefono;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas las facturas
    function read(){
    
        // select all query
        $query = "SELECT * FROM `facturas` WHERE `empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById($idfactura){

        $query = "SELECT * FROM `facturas` WHERE `id` = ".$idfactura;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function insert(){
       
    
         // query to insert record
         $query = "INSERT INTO `pagos_facturas`(`factura_id`, `cxc_id`, `metodo_id`, 
                    `cantidad_cancelada`, `cuenta_id`, `banco`, `tipo_tarjeta_id`, 
                    `marca_tarjeta_id`, `numero_tarjeta`, `fecha_vencimiento_tarjeta`, 
                    `seguridad_tarjeta`, `autorizacion_tarjeta`, `titular`, `numero_cheque`, 
                    `codigo_transferencia`, `email`, `telefono`) VALUES (
                        ".$this->factura_id.",
                        ".$this->cxc_id.",
                        ".$this->metodo_id.",
                        ".$this->cantidad_cancelada.",
                        ".$this->cuenta_id.",
                        '".$this->banco."',
                        ".$this->tipo_tarjeta_id.",
                        ".$this->marca_tarjeta_id.",
                        '".$this->numero_tarjeta."',
                        '".$this->fecha_vencimiento_tarjeta."',
                        ".$this->seguridad_tarjeta.",
                        ".$this->autorizacion_tarjeta.",
                        '".$this->titular."',
                        '".$this->numero_cheque."',
                        '".$this->codigo_transferencia."',
                        '".$this->email."',
                        '".$this->telefono."'
                    )";

        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);

        // execute query
        if($stmt->execute()){
            return $this->conn->lastInsertId();;
        }else{
            return false;
        }   
    }

}
?>