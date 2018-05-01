<?php
class Locales {

    // conexión a la base de datos y nombre de la tabla
    private $conn;
    private $table_name = "locales";

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $nombre;
    public $direccion;
    public $email;
    public $telefono;
    public $celular;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // leer la información de la empresa
    function read(){
    
        // select all query
        $query = "SELECT * FROM ". $this->table_name;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // insertar un local
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO 
                ".$this->table_name." (`empresa_id`, `nombre`, `direccion`, `email`, `telefono`, `celular`) 
                VALUES (
                    :empresa_id,
                    :nombre,
                    :direccion,
                    :email,
                    :telefono,
                    :celular
                )";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->empresa_id=htmlspecialchars(strip_tags($this->empresa_id));
        $this->nombre=htmlspecialchars(strip_tags($this->nombre));
        $this->direccion=htmlspecialchars(strip_tags($this->direccion));
        $this->email=htmlspecialchars(strip_tags($this->email));        
        $this->telefono=htmlspecialchars(strip_tags($this->telefono));
        $this->celular=htmlspecialchars(strip_tags($this->celular));
    
        // bind values
        $stmt->bindParam(":empresa_id", $this->empresa_id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":email", $this->email);        
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":celular", $this->celular);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }

    // actualizar datos del local
    function update(){
    
        // query to insert record
        $query = "UPDATE ".$this->table_name." SET
                    `nombre`=:nombre,
                    `direccion`=:direccion,
                    `email`=:email,
                    `telefono`=:telefono,
                    `celular`=:celular WHERE `id`= :id";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->nombre=htmlspecialchars(strip_tags($this->nombre));
        $this->direccion=htmlspecialchars(strip_tags($this->direccion));
        $this->email=htmlspecialchars(strip_tags($this->email));        
        $this->telefono=htmlspecialchars(strip_tags($this->telefono));
        $this->celular=htmlspecialchars(strip_tags($this->celular));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind values        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":email", $this->email);        
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":celular", $this->celular);
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