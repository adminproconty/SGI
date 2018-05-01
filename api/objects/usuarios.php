<?php
class Usuarios {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $persona_id;
    public $nombre;
    public $apellido;
    public $tipo_documento;
    public $num_documento;
    public $direccion;
    public $email;
    public $convencional;
    public $celular;
    public $opcional;
    public $clave;
    public $empleado;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los usuarios
    function read(){
    
        // select all query
        $query = "SELECT em.`id` as id, per.`id` as persona_id, per.`nombre`, per.`apellido`, 
                    per.`tipo_documento`, per.`num_documento`, per.`direccion`, per.`email`, 
                    per.`convencional`,
                    per.`celular`, per.`opcional`,
                    em.`clave`, em.`empleado`
                    FROM `empleados` as em
                    JOIN `personas` as per ON (per.`id` = em.`persona_id`)
                    WHERE per.`empresa_id` = 1 AND em.`clave` != 'NULL'";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // obtener todos los datos de un usuario
    function readById($idper){
    
        // select one query
        $query = "SELECT em.`id` as id, per.`id` as persona_id, per.`nombre`, 
                    per.`apellido`, per.`tipo_documento`, per.`num_documento`, 
                    per.`direccion`, per.`email`, per.`convencional`, per.`celular`, per.`opcional`,
                    em.`clave`, em.`empleado` 
                    FROM `empleados` as em
                    JOIN `personas` as per ON (per.`id` = em.`persona_id`)
                    WHERE per.`empresa_id` = 1 AND per.`id` = ".$idper;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // insertar un usuario
    function insert(){
    
        // query to insert record
        $query = "INSERT INTO `empleados`(`persona_id`, `clave`, `empleado`) VALUES (
            :persona_id,
            :clave,
            :empleado
        )";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // limpieza de los datos
        $this->persona_id=htmlspecialchars(strip_tags($this->persona_id));
        $this->clave=htmlspecialchars(strip_tags($this->clave)); 
    
        // bind values
        $stmt->bindParam(":persona_id", $this->persona_id);
        $stmt->bindParam(":clave", $this->clave);
        $stmt->bindParam(":empleado", $this->empleado);

        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
        
        
    }

    // actualizar datos de la persona
    function update($c,$i,$e){      
        // query 
        $query = "UPDATE `empleados` SET 
            `clave`= '".$c."',
            `empleado`= ".$e." 
            WHERE `id` = ".$i;
    
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