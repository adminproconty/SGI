<?php
class FormasPago {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $nombre;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos las formas de pago
    function read(){
    
        // select all query
        $query = "SELECT * FROM `formas_pago`";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getById($idpago) {
        // select all query
        $query = "SELECT * FROM `formas_pago` WHERE `id` = ".$idpago;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }    

}
?>