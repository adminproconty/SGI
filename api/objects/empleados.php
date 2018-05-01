<?php
class Empleados {

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
    public $convencional;
    public $email;
    public $celular;
    public $opcional;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los empleados
    function read(){
    
        // select all query
        $query = "SELECT em.`id` as id, per.`id` as persona_id, per.`nombre`, per.`apellido`, 
                    per.`tipo_documento`, per.`num_documento`, per.`direccion`, 
                    per.`email`, per.`convencional`, per.`celular`, per.`opcional`           
                    FROM `empleados` as em
                    JOIN `personas` as per ON (per.`id` = em.`persona_id`)
                    WHERE per.`empresa_id` = 1 AND em.`empleado` = 1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

}
?>