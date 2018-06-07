<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Content-Type:application/json");

/**
 * Backend App entery point
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */

// Load Dependecies
require "vendor/autoload.php";
require 'core/bootstrap.php';
$dec = base64_decode('NDA4ZDhhOWMxMTI2MzVlZWU4MmE4NmQzOGQ4ODE4MTRhY2YyZTQ3MTM5NTc4NTBmOTYzYzI2ZjZjMWZjNjllZQ==', true);
die(var_dump($dec));

// handle traffic and endpoints
Router::load('routes.php')->direct(Request::uri(), Request::type());
