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
            try {
                $body_params = json_decode($body);
                $user = App::get('database')->whereFrom('name', $body_params->Body->user, 'customers', 'User');
                Api::response($this->setSecret($user[0]));
            } catch (Exeption $e) {
                Api::response($e->getMessage());
            }
        }
    }

    private function setSecret($user)
    {   
        $secret = base64_encode($user->id.":".$user->name);
        return $secret;
    }
}