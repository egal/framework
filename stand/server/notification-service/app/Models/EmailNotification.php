<?php

declare(strict_types=1);

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

class EmailNotification extends Model
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('to', VariableType::STRING)
                    ->addValidationRule('email')
                    ->required(),
                FieldMetadata::make('subject', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('body', VariableType::STRING)
                    ->required(),
            ])
            ->addActions([
                ActionMetadataBlanks::getMetadata(),
                ActionMetadataBlanks::create(),
            ]);
    }

    protected static function boot()
    {
        parent::boot();
        static::created(fn(self $notification) => $notification->send());
    }

    protected function send(): void
    {
        Mail::send([], [], function (Message $message) {
            $body = $this->getAttribute('body');
            $message->to($this->getAttribute('to'))
                ->subject($this->getAttribute('subject'))
                ->html($body);
        });
    }

}
