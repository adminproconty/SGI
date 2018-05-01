<?php
class MarcasTarjetas {

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
        $query = "SELECT `id`, `nombre` FROM `marcas_tarjetas`";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }   

}
?>