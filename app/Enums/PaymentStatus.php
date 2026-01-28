<?
namespace App\Enums;

enum PaymentStatus: int{
    case complete = 1;
    case inProcess = 2;
    case pending = 3;
    case failed = 4;
}