<?php

namespace App\Http\Requests;

use App\Models\Service;
use App\Models\Shop;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        // return $this->user()->can('update', Service::class);
        return true;
    }

    public function rules(): array
    {
        return [
            'service_name' => [
                'string',
                'max:255',
                Rule::unique('services', 'service_name')
                    ->where('shop_id', $this->shop_id)
                    ->ignore($this->route('service')),
            ],
            'cost'     => ['numeric', 'min:0'],
            'duration' => ['integer', 'min:1'],
        ];
    }
}