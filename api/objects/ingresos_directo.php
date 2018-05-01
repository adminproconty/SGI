<?php
class IngresosDirecto {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $ingresos_id;
    public $cuenta;
    public $debe;
    public $haber;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    function getById($idingreso){

        $query = "SELECT id.`id`, id.`ingresos_id`, id.`cuenta`, id.`debe`, id.`haber` 
                    FROM `ingresos_directos` as id
                    WHERE id.`ingresos_id` = ".$idingreso;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function insert(){
       
    
         // query to insert record
         $query = "INSERT INTO `ingresos_directos`(`ingresos_id`, `cuenta`, 
                    `debe`, `haber`) VALUES (
                        ".$this->ingresos_id.",
                        '".$this->cuenta."',
                        ".$this->debe.",
                        ".$this->haber."
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