<?php
class Ingresos {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $fecha;
    public $recibo;
    public $cuenta_id;
    public $descripcion;
    public $referencia;
    public $documento;
    public $total;
    public $tipo_ingreso;
    public $ingreso;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas las facturas
    function read(){
    
        // select all query
        $query = "SELECT ing.`id`, ing.`empresa_id`, ing.`fecha`, ing.`recibo`, ing.`cuenta_id`, 
                    ing.`descripcion`, ing.`referencia`, ing.`documento`, ing.`total`, 
                    ing.`tipo_ingreso`, tie.`nombre` as ingreso
                    FROM `ingresos` as ing
                    JOIN `tipos_ingresos_egresos` as tie ON (ing.`tipo_ingreso` = tie.`id`)
                    WHERE ing.`empresa_id` = 1";
    
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
         $query = "INSERT INTO `ingresos`(`empresa_id`, `fecha`, `recibo`, `cuenta_id`, 
                    `descripcion`, `referencia`, `documento`, `total`, `tipo_ingreso`) VALUES (
                        ".$this->empresa_id.",
                        '".$this->fecha."',
                        '".$this->recibo."',
                        ".$this->cuenta_id.",
                        '".$this->descripcion."',
                        '".$this->referencia."',
                        '".$this->documento."',
                        ".$this->total.",
                        ".$this->tipo_ingreso."
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