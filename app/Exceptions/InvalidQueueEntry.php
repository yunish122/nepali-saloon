<?php

namespace App\Exceptions;

use DomainException;

class InvalidQueueEntry extends DomainException
{
    public static function invalidQueueEntryDelete(){
        return new self("Already deleted queue entry cannot get deleted again");
    }
}
