<?php

namespace App\Http\Requests;

use App\Models\Shop;
use Illuminate\Foundation\Http\FormRequest;

class CreateShopRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create',Shop::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'shop_name'=>['required','unique:shops,shop_name', 'string'],
            'location'=>  ['required','string'],
            'phone'=> ['required','string'],
            'opening_time'=> ['date_format:H:i:s','required'],
            'closing_time' => ['date_format:H:i:s','required','after:opening_time'],
            'default_duration'=>['integer']
        ];
    }   
}
