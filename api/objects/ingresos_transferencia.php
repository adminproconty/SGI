<?php
class IngresosTransferencia {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $ingresos_id;
    public $fecha;
    public $banco_receptor_id;
    public $banco_receptor;
    public $banco_emisor_id;
    public $banco_emisor;
    public $monto;
    public $referencia;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los ingresos por transferencia
    function getById($idingreso){

        $query = "SELECT it.`id`, it.`ingresos_id`, it.`fecha`, it.`banco_receptor_id`, 
                    ban.`nombre` as banco_receptor, it.`banco_emisor_id`, 
                    bane.`nombre` as banco_emisor, it.`monto`, it.`referencia` 
                    FROM `ingresos_transferencia` as it
                    JOIN `bancos` as ban ON (it.`banco_receptor_id` = ban.`id`)
                    JOIN `bancos` as bane ON (it.`banco_emisor_id` = bane.`id`)
                    WHERE it.`ingresos_id` = ".$idingreso;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function insert(){
       
    
         // query to insert record
         $query = "INSERT INTO `ingresos_transferencia`(`ingresos_id`, `fecha`, 
                    `banco_receptor_id`, `banco_emisor_id`, `monto`, `referencia`) 
                    VALUES (
                        ".$this->ingresos_id.",
                        '".$this->fecha."',
                        ".$this->banco_receptor_id.",
                        ".$this->banco_emisor_id.",
                        ".$this->monto.",
                        '".$this->referencia."'
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