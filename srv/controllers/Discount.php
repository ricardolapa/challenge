<?php

class Discount
{
    public function readHeader()
    {
        var_dump(Api::fetchBodyParams());
        
        foreach (getallheaders() as $name => $value) {
            $header[] =  "$name: $value\n";
        }
        return Api::response($header);
    }
}
