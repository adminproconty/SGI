<?php
class EmpleadoLocal {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $empleado_id;
    public $local_id;
    public $nombre;
    public $persona_nombre;
    public $persona_apellido;
    public $persona_documento;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los empleados
    function read(){
    
        // select all query
        $query = "SELECT ul.`id`, ul.`empleado` as empleado_id, 
                    ul.`local` as local_id, loc.`nombre` as nombre, 
                    per.`nombre` as persona_nombre, per.`apellido` as persona_apellido, 
                    per.`num_documento` as persona_documento
                    FROM `detalle_usuario_local` as ul 
                    JOIN `locales` as loc ON (loc.id = ul.`local`) 
                    JOIN `empleados` as emp ON (emp.`id` = ul.`empleado`) 
                    JOIN `personas` as per ON (per.`id` = emp.`persona_id`) 
                    WHERE loc.`empresa_id` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getByEmpleado($empleado){

        $query = "SELECT ul.`id`, ul.`empleado` as empleado_id, 
                    ul.`local` as local_id, loc.`nombre` as nombre, 
                    per.`nombre` as persona_nombre, per.`apellido` as persona_apellido, 
                    per.`num_documento` as persona_documento 
                    FROM `detalle_usuario_local` as ul 
                    JOIN `locales` as loc ON (loc.id = ul.`local`) 
                    JOIN `empleados` as emp ON (emp.`id` = ul.`empleado`) 
                    JOIN `personas` as per ON (per.`id` = emp.`persona_id`) 
                    WHERE ul.`empleado` = ".$empleado;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getByEmpledoLocal($empleado,$local){
        $query = "SELECT * FROM `detalle_usuario_local` 
                    WHERE `empleado` = ".$empleado." 
                    AND `local` = ".$local;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query        
        if($stmt->execute()){
            $num = $stmt->rowCount();
            if($num>0){ 
                return 1;
            }else{
                return 0;
            }
        }
        
    }

    function delete($detalle){
        $query = "DELETE FROM `detalle_usuario_local` WHERE `id` = ".$detalle;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }  
    }

    function insert(){
        // query to insert record
        $query = "INSERT INTO `detalle_usuario_local`(`local`, `empleado`) VALUES (
            :local_id,
            :empleado_id
            )";
    
        // prepara la sentencia del query
        $stmt = $this->conn->prepare($query);
    
        // limpieza de los datos
        $this->local_id=htmlspecialchars(strip_tags($this->local_id));
        $this->empleado_id=htmlspecialchars(strip_tags($this->empleado_id));

        // bind values
        $stmt->bindParam(":local_id", $this->local_id);
        $stmt->bindParam(":empleado_id", $this->empleado_id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }   
    }

}
?>