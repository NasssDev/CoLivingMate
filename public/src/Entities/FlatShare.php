<?php

namespace App\Entities;

class FlatShare extends BaseEntity
{
    private int $id;
    private string $name;
    private string $address;
    private \DateTime $start_date;
    private \DateTime $end_date;
    private string $image;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @param string $address
     */
    public function setAddress(string $address): void
    {
        $this->address = $address;
    }

    /**
     * @return \DateTime
     */
    public function getStartDate(): \DateTime
    {
        return $this->start_date;
    }

    /**
     * @param \DateTime
     * /^([0-9]{4})[\-\/]([0-9]{2})[\-\/]([0-9]{2})$/
     */
    public function setStartDate($start_date): void
    {
        $this->start_date = new \DateTime($start_date);
    }

    /**
     * @return \DateTime
     */
    public function getEndDate(): \DateTime
    {
        return $this->end_date;
    }

    /**
     * @param \DateTime $end_date
     */
    public function setEndDate($end_date): void
    {
        $this->end_date = new \DateTime($end_date);
    }

    /**
     * @return string
     */
    public function getImage(): string|null
    {
        return $this->image;
    }

    /**
     * @param string $image
     */
    public function setImage(string|null $image): void
    {
        $this->image = '$image';
    }


}