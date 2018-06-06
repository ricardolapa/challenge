<?php

/**
 * Database Connector
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */
class Connection
{
    public static function make($config)
    {
        try {
            return new PDO(
                $config['dns'].':host='.$config['host'].';dbname='.$config['dbname'],
                $config['user'],
                $config['password'],
                $config['options']
            );
        } catch (PDOException $e) {
            die("could not connect: " .$e->getMessage() );
        }
    }
}