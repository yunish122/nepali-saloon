<?php

namespace App\Exceptions;

use App\Models\QueueEntry;
use App\Models\Service;
use Exception;

class DuplicateQueueEntryException extends Exception
{
    public static function duplicateQueueEntryException(){
        return new self("Cannot enter this Queue Entry");
    }
}
