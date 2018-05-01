<?php
class Personas {

    // conexión a la base de datos y nombre de la tabla
    private $conn;
    private $table_name = "personas";

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $nombre;
    public $apellido;
    public $tipo_documento;
    public $num_documento;
    public $direccion;
    public $descripcion;
    public $email;
    public $convencional;
    public $celular;
    public $opcional;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todas las personas
    function read(){
    
        // select all query
        $query = "SELECT * FROM `personas` WHERE `empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // obtener todos los datos de una persona
    function readById($idper){
    
        // select one query
        $query = "SELECT * FROM ".$this->table_name." WHERE `id` =" .$idper;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function readByEmpresaDocumento($empresa,$documento) {

        // select one query
        $query = "SELECT * FROM ".$this->table_name." 
                    WHERE `empresa_id` = ".$empresa." AND `num_documento` = '".$documento."'";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function readByTipoDocDocumento($td, $documento){
        $query = "SELECT * FROM ".$this->table_name." 
                    WHERE `tipo_documento` = ".$td." AND `num_documento` = '".$documento."'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // insertar una cuenta
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO `personas`(`empresa_id`, `nombre`, `apellido`, 
                    `tipo_documento`, `num_documento`, `direccion`, `descripcion`, `email`, 
                    `convencional`, `celular`, `opcional`) VALUES (
                        ".$this->empresa_id.",
                        '".$this->nombre."',
                        '".$this->apellido."',
                        ".$this->tipo_documento.",
                        '".$this->num_documento."',
                        '".$this->direccion."',
                        '".$this->descripcion."',
                        '".$this->email."',
                        '".$this->convencional."',
                        '".$this->celular."',
                        '".$this->opcional."'
                    )";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);    
        
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }

    // actualizar datos de la persona
    function update(){
    
        // query 
        $query = "UPDATE `personas` SET 
                    `nombre`= '".$this->nombre."',
                    `apellido`= '".$this->apellido."',
                    `tipo_documento`= ".$this->tipo_documento.",
                    `num_documento`= ".$this->num_documento.",
                    `direccion`= '".$this->direccion."',
                    `descripcion`= '".$this->descripcion."',
                    `email`= '".$this->email."',
                    `convencional`= '".$this->convencional."',
                    `celular`= '".$this->celular."',
                    `opcional`= '".$this->opcional."' 
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