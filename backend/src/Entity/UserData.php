<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Controller\UserController;
use Doctrine\ORM\Mapping as ORM;

/**
 * UserData
 *
 * @ORM\Table(name="user_data", indexes={@ORM\Index(name="user_data_user_ID_user_fk", columns={"ID_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\UserDataRepository")
 */

#[ApiResource(operations:[
    new Get(
        name: 'get_user',
        uriTemplate: '/user',
        controller: UserController::class,
        openapiContext: [
            'summary' => 'Retrieves user data',
            'description' => 'Retrieves user data',
        ]
    ),
    new Get(
        name: 'get_user_image',
        uriTemplate: '/user_image/{id}',
        controller: UserController::class,
        openapiContext: [
            'summary' => 'Retrieves user profile picture',
            'description' => 'Retrieves user profile picture',
            'parameters' => [
                'name' => 'id',
                'in' => 'path',
                'required' => true,
                'type' => 'int',
                'description' => 'User ID'
            ],
        ],
    ),
    new Get(
        name: 'delete_account',
        uriTemplate: '/delete_account',
        controller: UserController::class,
        openapiContext: [
            'summary' => 'Deletes user',
            'description' => 'Deletes user',
        ]
    ),
    new Get(
        name: 'delete_image',
        uriTemplate: '/delete_image',
        controller: UserController::class,
        openapiContext:[
            'summary'=>'Deletes user profile picture',
            'description' => 'Deletes user profile picture',
        ]
    ),
    new Post(
        name: 'save_user_data',
        uriTemplate: '/save_user',
        controller: UserController::class,
        openapiContext: [
            'summary' => 'Creates/updates user data',
            'description' => 'Retrieves tasks by category',
        ]
    ),
    new Post(
        name: 'save_image',
        uriTemplate: '/save_image',
        controller: UserController::class,
        openapiContext: [
            'summary' => 'Saves user profile picture',
            'description' => 'Saves user profile picture',
        ]
    )
])]
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
