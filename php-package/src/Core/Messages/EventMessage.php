<?php

declare(strict_types=1);

namespace Egal\Core\Messages;

class EventMessage extends Message
{

    protected string $type = MessageType::EVENT;

    protected string $serviceName;

    protected string $modelName;

    protected string $key;

    protected string $name;

    protected ?array $data = null;

    public function __construct(string $modelName, string $key, string $name, ?array $data = null)
    {
        parent::__construct();

        $this->modelName = $modelName;
        $this->name = $name;
        $this->data = $data;
        $this->key = $key;
        $this->serviceName = config('app.service_name');
    }

    public static function fromArray(array $array): EventMessage
    {
        $result = new static($array['model_name'], $array['id'], $array['name'], $array['data']);
        $result->serviceName = $array['service_name'];

        return $result;
    }

    public function getServiceName(): string
    {
        return $this->serviceName;
    }

    public function getModelName(): string
    {
        return $this->modelName;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getKey(): string
    {
        return $this->key;
    }

    /**
     * @return array|null
     */
    public function getData(): ?array
    {
        return $this->data;
    }

}
