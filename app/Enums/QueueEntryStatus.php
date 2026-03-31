<?php
namespace App\Enums;

enum QueueEntryStatus: int{
    case pending = 1;
    case in_progress = 2;
    case complete = 3;
    case cancelled = 4;
    case no_show = 5;
}