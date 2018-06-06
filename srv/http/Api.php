<?php

/**
 * REST API response builder
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */
class Api
{
    public static function response($data)
    {
        $response = [];
        header("HTTP/1.1 ".http_response_code());
        // foreach (getallheaders() as $name => $value) {
        //     $response['header'][] =  "$name: $value\n";
        // }
        
        $response['status'] = http_response_code();
        $response['data'] = $data;
        
        $json_response = json_encode($response, true);
        //die(var_dump($data));
        echo $json_response;
    }

    public static function fetchBodyParams()
    {
        $body = file_get_contents("php://input");
        $body_params = json_decode($body);
        return $body_params;
    }
}