<?php
class Bancos {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $nombre;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas las cuentras bancarias
    function read(){
    
        // select all query
        $query = "SELECT `id`, `nombre` FROM `bancos`";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById($idbanco) {
        // select all query
        $query = "SELECT `id`, `nombre` FROM `bancos` WHERE `id` = ".$idbanco;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }    

}
?>