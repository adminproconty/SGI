<?php
class TiposTarjetas {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $nombre;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los tipos de tarjetas
    function read(){
    
        // select all query
        $query = "SELECT * FROM `tipos_tarjetas`";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById($idtarjeta) {
        // select all query
        $query = "SELECT * FROM `tipos_tarjetas` WHERE `id` = ".$idtarjeta;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }    

}
?>