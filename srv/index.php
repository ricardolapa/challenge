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

// handle traffic and endpoints
Router::load('routes.php')->direct(Request::uri(), Request::type());
