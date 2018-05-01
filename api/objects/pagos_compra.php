<?php
class PagosCompra {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $compras_id;
    public $cxp_id;
    public $metodo_id;
    public $cantidad_cancelada;
    public $tarjeta_id;
    public $autorizacion_tarjeta;
    public $cuenta_id;
    public $numero_cheque;
    public $codigo_transferencia;
    public $banco_receptor_id;
    public $institucion;
    public $observacion;

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
         $query = "INSERT INTO `pagos_compra`(`compras_id`, `cxp_id`, `metodo_id`, 
                    `cantidad_cancelada`, `tarjeta_id`, `autorizacion_tarjeta`, 
                    `cuenta_id`, `numero_cheque`, `codigo_transferencia`, 
                    `banco_receptor_id`, `institucion`, `observacion`) VALUES (
                        ".$this->compras_id.",
                        ".$this->cxp_id.",
                        ".$this->metodo_id.",
                        ".$this->cantidad_cancelada.",
                        ".$this->tarjeta_id.",
                        '".$this->autorizacion_tarjeta."',
                        ".$this->cuenta_id.",
                        '".$this->numero_cheque."',
                        '".$this->codigo_transferencia."',
                        ".$this->banco_receptor_id.",
                        '".$this->institucion."',
                        '".$this->observacion."'
                    )";

        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);

        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
    }

}
?>