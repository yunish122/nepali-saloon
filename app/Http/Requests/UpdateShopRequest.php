<?php

namespace App\Http\Requests;

use App\Models\Shop;
use Illuminate\Foundation\Http\FormRequest;

class UpdateShopRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $shop = $this->route('shop');
        return $this->user()->can('update', $shop);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'shop_name'=>['unique:shops,shop_name', 'string'],
            'location'=>  ['string'],
            'phone'=> ['string'],
            'opening_time'=> ['date_format:H:i:s'],
            'closing_time' => ['date_format:H:i:s','after:opening_time'],
            'default_duration'=>['integer']
        ];
    }
}
