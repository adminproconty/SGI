<?php
class Login {

    // conexión a la base de datos y nombre de la tabla
    private $conn;

    // Propiedades del objeto
    public $id;
    public $empresa_id;
    public $nombre_comercial;
    public $nombre;
    public $apellido;
    public $tipo_documento_id;
    public $tipo_documento;
    public $num_documento;
    public $email;
    public $celular;
    public $empleado_id;
    public $clave;

    public $detalle_local_id;
    public $local_id;
    public $local_nombre;
    public $local_direccion;
    public $local_email;
    public $local_telefono;
    public $local_celular;

    public $nombre_legal;
    public $empresa_email;
    public $empresa_RUC;
    public $empresa_direccion;
    public $empresa_telefono;
    public $empresa_celular;

    //constructor con base de datos como conexión
    public function __construct($db){
        $this->conn = $db;
    }

    // obtener todos los datos de una persona
    function getUsuarioByEmail($correo){
    
        // select one query
        $query = "SELECT per.`id`, per.`empresa_id`, emp.`nombre_comercial`, per.`nombre`, 
                    per.`apellido`, per.`tipo_documento` as tipo_documento_id, td.`nombre` 
                    as tipo_documento, per.`num_documento`, per.`email`, per.`celular`, 
                    emple.`id` as empleado_id, emple.`clave`
                    FROM `personas` as per
                    JOIN `tipo_documento` as td ON(td.`id` = per.`tipo_documento`)
                    JOIN `empresa` as emp ON(emp.`id` = per.`empresa_id`)
                    JOIN `empleados` as emple ON(emple.`persona_id` = per.`id`)
                    WHERE per.`email` = '".$correo."'";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getEmpresa($persona){
        // select one query
        $query = "SELECT emp.`id`as empresa_id, emp.`nombre_legal`, emp.`nombre_comercial`, 
                    emp.`email` as empresa_email, emp.`RUC` as empresa_RUC, 
                    emp.`direccion` as empresa_direccion, emp.`telefono` as empresa_telefono, 
                    emp.`celular` as empresa_celular
                    FROM `empresa` as emp 
                    JOIN `personas` as per ON (per.`empresa_id` = emp.`id`) 
                    WHERE per.`id` = ".$persona;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function getSucursalesUsuario($empleado) {

        // select one query
        $query = "SELECT dl.`id` as detalle_local_id, dl.`local` as local_id, 
                    loc.`nombre` as local_nombre, 
                    loc.`direccion` as local_direccion, loc.`email` as local_email, 
                    loc.`telefono` as local_telefono, loc.`celular` as local_celular
                    FROM `detalle_usuario_local` as dl
                    JOIN `locales`as loc ON(loc.`id` = dl.`local`)
                    WHERE dl.`empleado` = ".$empleado;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }   

}
?>