<?php

/**
 * Products Controller
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */
class Products
{
    public $products;

    public function getAll()
    {   
        try {
            $this->products = App::get('database')->selectAll("users", "User");
            Api::response($this->products);
        } catch ( Exception $e ) {
            throw new Exception("Error Processing Request", 1);
        }
    }

    public function getItem()
    {
        $id = Request::param();
        try {
            $this->product = App::get('database')->whereFrom("id", $id, "users", "User");
            return Api::response($this->product);
        } catch ( Exception $e ) {
            throw new Exception("Error Processing Request", 1);
        }
    }

    
}
