<?php
class TipoDocumento {

    // conexión a la base de datos y nombre de la tabla
    private $conn;
    private $table_name = "tipo_documento";

    // Propiedades del objeto
    public $id;
    public $nombre;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // consultar todos los tipos de documentos
    function read(){
    
        // select all query
        $query = "SELECT * FROM ". $this->table_name;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }   

}
?>