<?php

/**
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */
class Request
{
    /**
     * @return REQUEST_URI
     */
    public static function uri()
    {
        return parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    }

    /**
     * @return REQUEST_METHOD
     */
    public static function type()
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    /**
     * @return REQUEST_METHOD
     */
    public static function param()
    {
        $param = explode('/',parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
        return $param[count($param) -1];
    }
}