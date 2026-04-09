<?php

namespace App\Exceptions;

use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use DomainException;
use Exception;

class CanNotDeleteServiceException extends DomainException
{
    public static function unauthorizeServiceDeletion(User $user, Shop $shop, Service $service) {
        return new self("This User [{$user}] of Shop [{$shop}] cannot delete Service [{$service}]");
    }
}
