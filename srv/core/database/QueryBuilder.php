<?php

/**
 * Database Querys Class
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */
class QueryBuilder
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function selectAll($table, $intoClass)
    {
        $statement = $this->pdo->prepare("SELECT * FROM {$table}");
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_CLASS, $intoClass);
    }

    public function insert($tableName, $parameters)
    {
        $query = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)', 
            $tableName, 
            implode(", ", array_keys($parameters)), 
            ":".implode(", :", array_keys($parameters))
        ); 

        try {
            $statement = $this->pdo->prepare($query);
            $statement->execute($parameters);
        } catch (Exception $e) {
            die('Error executing query');
        }
    }

    public function whereFrom($neddle, $haystack, $table, $intoClass)
    {
        try {
            $statement = $this->pdo->prepare(
                "SELECT * FROM {$table} WHERE {$neddle} = '{$haystack}'"
            );
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_CLASS, $intoClass);
        }  catch (Exception $e) {
            die('Error executing query' .$e->getMessage());
        }
    }
}