<?php

declare(strict_types=1);

namespace Egal\Model\Metadata;

use Egal\Model\Enums\RelationType;
use Egal\Model\Exceptions\RelatedModelNotFoundException;
use Egal\Model\Facades\ModelMetadataManager;

class RelationMetadata
{

    protected readonly string $name;

    protected string $related;

    protected bool $guarded = false;

    protected readonly RelationType $type;

    /**
     * @throws RelatedModelNotFoundException
     */
    protected function __construct(string $name, string $related, RelationType $type)
    {
        if (!class_exists($related)) {
            throw RelatedModelNotFoundException::make($related);
        }

        $this->name = $name;
        $this->type = $type;
        $this->related = $related;
    }

    /**
     * @throws RelatedModelNotFoundException
     */
    public static function make(string $name, string $related, RelationType $type): self
    {
        return new static($name, $related, $type);
    }

    public function toArray(bool $loadRelatedMetadata = false): array
    {
        return $loadRelatedMetadata
            ? [
                'name' => $this->name,
                'type' => $this->type->value,
                'related' => $this->getRelatedMetadata()->toArray()
            ]
            : [
                'name' => $this->name,
                'type' => $this->type->value,
            ];
    }

    public function guarded(): self
    {
        $this->guarded = true;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getType(): RelationType
    {
        return $this->type;
    }

    public function getRelated(): string
    {
        return $this->related;
    }

    public function getRelatedMetadata(): ModelMetadata
    {
        return ModelMetadataManager::getModelMetadata($this->related);
    }

}
