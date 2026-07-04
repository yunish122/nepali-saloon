<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class StrongPassword implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match('/[A-Z]/',$value)){
            $fail('The password must contain atleast one Upper Case letter');
        }

        if(!preg_match('/[a-z]{3,}/',$value)){
                $fail('The password must contain atleast 3 alphabetletter');

        }

        if (!preg_match('/[0-9]/', $value)) {
            $fail('The password must contain at least one number.');
        }

        if (!preg_match('/[@$!%*?&]/', $value)) {
            $fail('The password must contain at least one special character (@$!%*?&).');
        }
    }
}
