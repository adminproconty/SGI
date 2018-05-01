<?php
class IVA {

    // conexión a la base de datos y nombre de la tabla
    private $conn;
    private $table_name = "iva";

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $fecha;
    public $nombre;
    public $cantidad;
    PUBLIC $estado;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener el log del iva
    function read(){
    
        // select all query
        $query = "SELECT `id`, `empresa_id`, `fecha`, `nombre`, `cantidad`, `estado`
                    FROM iva 
                    WHERE `empresa_id` = 1
                    ORDER BY `fecha` DESC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function readActivos(){
    
        // select all query
        $query = "SELECT `id`, `empresa_id`, `fecha`, `nombre`, `cantidad`, `estado`
                    FROM iva 
                    WHERE `empresa_id` = 1
                    AND `estado` = 1
                    ORDER BY `fecha` DESC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById($idiva) {
        // select all query
        $query = "SELECT `id`, `empresa_id`, `fecha`, `nombre`, `cantidad`, `estado`
                    FROM iva 
                    WHERE `empresa_id` = 1 
                    AND `id` = ".$idiva;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // insertar una cuenta
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO `iva`(`empresa_id`, `fecha`, `nombre`, 
                    `cantidad`, `estado`) VALUES (
                        ".$this->empresa_id.",
                        NOW(),
                        '".$this->nombre."',
                        ".$this->cantidad.",
                        ".$this->estado."
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

    // actualizar datos de la cuenta
    function update(){
    
        // query 
        $query = "UPDATE `iva` SET 
                    `nombre`= '".$this->nombre."',
                    `cantidad`= ".$this->cantidad.",
                    `estado`= ".$this->estado."
                    WHERE `id` = ".$this->id;
    
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