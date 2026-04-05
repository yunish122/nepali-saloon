<?php

namespace App\Exceptions;

use DomainException;
use Exception;

class DuplicateServiceException extends DomainException
{
    public static function duplicateServiceException(string $service_name, string $shop_name){
        return new self("Service [{$service_name}] already exisits in shop [{$shop_name}]");
    }
}
