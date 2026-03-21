<?php

namespace App\Exceptions;

use DomainException;
use Exception;

class NoMoreThanThreeShopException extends DomainException
{
    public static function noMoreThanThreeShop(int $userId){
        return new self("User [{$userId}] already has three shop.");
    }
}
