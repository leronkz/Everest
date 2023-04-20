<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Controller\CategoryController;
use Doctrine\ORM\Mapping as ORM;

/**
 * Category
 *
 * @ORM\Table(name="category", indexes={@ORM\Index(name="category_user_ID_user_fk", columns={"ID_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\CategoryRepository")
 */
#[ApiResource(operations:[
    new Get(
        name: 'get_categories',
        uriTemplate: '/get_categories',
        controller: CategoryController::class,
        openapiContext: [
            'summary' => 'Retrieves category',
            'description' => 'Retrieves category',
        ]
    ),
    new Post(
        name: 'add_category',
        uriTemplate: '/add_category',
        controller: CategoryController::class,
        openapiContext: [
            'summary' => 'Creates a new category',
            'description' => 'Creates a new category',
        ]
    ),
    new Post(
        name: 'delete_category',
        uriTemplate: '/delete_category',
        controller: CategoryController::class,
        openapiContext: [
            'summary' => 'Deletes category',
            'description' => 'Deletes category',
        ]
    ),
])]
class Category
{
    /**
     * @var int
     *
     * @ORM\Column(name="ID_category", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idCategory;

    /**
     * @var string
     *
     * @ORM\Column(name="category_name", type="string", length=100, nullable=false)
     */
    private $categoryName;

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
    public function getIdCategory(): int
    {
        return $this->idCategory;
    }

    /**
     * @param int $idCategory
     */
    public function setIdCategory(int $idCategory): void
    {
        $this->idCategory = $idCategory;
    }

    /**
     * @return string
     */
    public function getCategoryName(): string
    {
        return $this->categoryName;
    }

    /**
     * @param string $categoryName
     */
    public function setCategoryName(string $categoryName): void
    {
        $this->categoryName = $categoryName;
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
