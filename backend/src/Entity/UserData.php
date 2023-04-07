<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserData
 *
 * @ORM\Table(name="user_data", indexes={@ORM\Index(name="user_data_user_ID_user_fk", columns={"ID_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\UserDataRepository")
 */
class UserData
{
    /**
     * @var int
     *
     * @ORM\Column(name="ID_user_data", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idUserData;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name", type="string", length=100, nullable=true)
     */
    private $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="surname", type="string", length=100, nullable=true)
     */
    private $surname;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="birth_date", type="date", nullable=true)
     */
    private $birthDate;

    /**
     * @var string|null
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ID_user", referencedColumnName="ID_user")
     * })
     */
    private $idUser;

    /**
     * @return int
     */
    public function getIdUserData(): int
    {
        return $this->idUserData;
    }

    /**
     * @param int $idUserData
     */
    public function setIdUserData(int $idUserData): void
    {
        $this->idUserData = $idUserData;
    }

    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string|null $name
     */
    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string|null
     */
    public function getSurname(): ?string
    {
        return $this->surname;
    }

    /**
     * @param string|null $surname
     */
    public function setSurname(?string $surname): void
    {
        $this->surname = $surname;
    }

    /**
     * @return \DateTime|null
     */
    public function getBirthDate(): ?\DateTime
    {
        return $this->birthDate;
    }

    /**
     * @param \DateTime|null $birthDate
     */
    public function setBirthDate(?\DateTime $birthDate): void
    {
        $this->birthDate = $birthDate;
    }

    /**
     * @return string|null
     */
    public function getImage(): ?string
    {
        return $this->image;
    }

    /**
     * @param string|null $image
     */
    public function setImage(?string $image): void
    {
        $this->image = $image;
    }

    /**
     * @return User
     */
    public function getIdUser(): User
    {
        return $this->idUser;
    }

    /**
     * @param User $idUser
     */
    public function setIdUser(User $idUser): void
    {
        $this->idUser = $idUser;
    }


}
