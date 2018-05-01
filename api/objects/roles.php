<?php
class Roles {

    // conexión a la base de datos y nombre de la tabla
    private $conn;
    private $table_name = "roles";

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $nombre;
    public $descripcion;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los roles
    function read(){
    
        // select all query
        $query = "SELECT * FROM ".$this->table_name." WHERE `empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // insertar una cuenta
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO ".$this->table_name." (`empresa_id`, `nombre`, `descripcion`) 
                    VALUES (
                        :empresa_id,
                        :nombre,
                        :descripcion
                    )";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // limpieza de los datos
        $this->empresa_id=htmlspecialchars(strip_tags($this->empresa_id));
        $this->nombre=htmlspecialchars(strip_tags($this->nombre));        
        $this->descripcion=htmlspecialchars(strip_tags($this->descripcion));        
    
        // bind values
        $stmt->bindParam(":empresa_id", $this->empresa_id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }

    // actualizar datos del rol
    function update(){
    
        // query 
        $query = "UPDATE ".$this->table_name." SET 
                    `nombre`=:nombre,
                    `descripcion`=:descripcion
                    WHERE `id` =:id";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->nombre=htmlspecialchars(strip_tags($this->nombre));
        $this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind values        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":id", $this->id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }

}
?>