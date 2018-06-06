<?php

/**
 * Routes Register
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */

$router->post("/challenge/api/getproducts", "Products@getAll");
$router->post(sprintf("/challenge/api/getproducts/%s", Request::param()), "Products@getItem");


//services
$router->post("/challenge/api/discount/category1", "Discount@readHeader");


