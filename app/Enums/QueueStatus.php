<?php
namespace App\Enums;

enum QueueStatus: int{
    case open = 1;
    case close = 2;
}