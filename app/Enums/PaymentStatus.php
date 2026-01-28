<?php
namespace App\Enums;

enum PaymentStatus: int{
    case pending = 1;
    case inProcess = 2;
    case complete = 3;
    case failed = 4;
}