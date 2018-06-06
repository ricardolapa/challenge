<?php

/**
 * APP Dependecy Injection Container
 * API methods
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */
class App
{
    protected static $registry = [];

    public static function bind($key, $value)
    {
        self::$registry[$key] = $value;
    }

    public static function get($key)
    {
        if ( ! array_key_exists($key, self::$registry) ) {
            throw new Exception("No Key registred", 1);
        }
        return self::$registry[$key];
    }

}