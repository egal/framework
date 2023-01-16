<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Orion\Http\Requests\Request;
use Illuminate\Validation\Rule;
use App\ValueTypes\Movement as ValueTypes;

class MovementRequest extends Request
{

    public function rules(): array
    {
        return [
            'status' => Rule::enum(ValueTypes\Status::class),
            'type' => Rule::enum(ValueTypes\Type::class),
        ];
    }

}
