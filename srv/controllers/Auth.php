<?php

/**
 * Products Controller
 * 
 * @author Ricardo Lapa (ricardo.j.lapa@gmail.com)
 */
class Auth
{
    public function login()
    {
        $body = file_get_contents("php://input");

        if($body) {
            $body_params = json_decode($body);
            //die(var_dump($body_params));

            $key = 'secret';
            $signature = hash_hmac('SHA256',$key,true);
            $signature_encoded = base64_encode($signature);
            
            //build and return the token
            $token = "$signature_encoded";
            Api::response($token) ;
        }
        
    }
}