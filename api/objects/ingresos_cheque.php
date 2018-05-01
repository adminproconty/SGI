<?php
class IngresosCheque {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $ingresos_id;
    public $fecha;
    public $banco_id;
    public $banco;
    public $numero;
    public $titular;
    public $monto;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los ingresos por cheques
    function getById($idingreso){

        $query = "SELECT che.`id`, che.`ingresos_id`, che.`fecha`, che.`banco_id`, 
                    ban.`nombre` as banco, che.`numero`, che.`titular`, che.`monto` 
                    FROM `ingresos_cheque` as che
                    JOIN `bancos` as ban ON (che.`banco_id` = ban.`id`)
                    WHERE che.`ingresos_id` =".$idingreso;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function insert(){
       
    
         // query to insert record
         $query = "INSERT INTO `ingresos_cheque`(`ingresos_id`, `fecha`, `banco_id`, 
                    `numero`, `titular`, `monto`) VALUES (
                        ".$this->ingresos_id.",
                        '".$this->fecha."',
                        ".$this->banco_id.",
                        '".$this->numero."',
                        '".$this->titular."',
                        ".$this->monto."
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