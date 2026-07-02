<?php

namespace App\Http\Requests;

use App\Models\Service;
use App\Models\Shop;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateServiceRequest extends FormRequest
{
    public function authorize(): bool
    {

        // $shops = Shop::findOrFail($this->shop_id);
        // $this->merge(['shop'=>$shops]);
        // return $this->user()->can('create', Service::class);
        return true;
    }

    public function rules(): array
    {
        return [
            'service_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('services', 'service_name')
                    ->where('shop_id', $this->shop_id),
            ],
            'cost'     => ['required', 'numeric', 'min:0'],
            'duration' => ['required', 'numeric', 'min:1'],
            'shop_id'  => ['required', 'exists:shops,id'],
        ];
    }
}