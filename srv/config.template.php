<?php

/**
 * Config File 
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */

 // Duplicate or rename this file to 'config.php'
 // Place your DB configurations here

return [
    // Database Connection params
    "database" => [
        "dns"       => "mysql",
        "host"      => "127.0.0.1",
        "dbname"    => "",
        "user"      => "",
        "password"  => "",
        "options"   => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    ]
];