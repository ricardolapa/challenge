<?php

/**
 * Router Class
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */
class Router
{
    /**
     * @var array collection of Route Types
     */
    protected $routes = [
        "GET" => [],
        "POST" => []
    ];

    public static function load(STRING $file)
    {
        $router = new self;
        require $file;
        return $router;
    }

    /**
     * Appends GET requests
     */
    public function get($route, $controller)
    {
        $this->routes["GET"][$route] = $controller;
    }

    /**
     * Appends POST requests
     */
    public function post($route, $controller)
    {
        $this->routes["POST"][$route] = $controller;
    }

    /**
     * Direct trafic
     * @param string $uri
     * @param string $requestMethod
     */
    public function direct($uri, $requestMethod)
    {   
        if (array_key_exists($uri, $this->routes[$requestMethod])) {
            return $this->callAction(
                ...explode('@', $this->routes[$requestMethod][$uri])
            );
        }
        throw new Exception("No Route found", 1);
        
    }

    /**
     * Instanciate new Controller and call a method
     */
    protected function callAction($controller, $method)
    {
        $controller = new $controller;
       
        if ( ! method_exists($controller, $method)) {
            throw new Exception("No Method found", 1);
        }
        return $controller->$method();
    }
}
