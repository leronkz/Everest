<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\TaskController;
use Doctrine\ORM\Mapping as ORM;

/**
 * Task
 *
 * @ORM\Table(name="task", indexes={@ORM\Index(name="task_category_ID_category_fk", columns={"ID_category"}), @ORM\Index(name="task_user_ID_user_fk", columns={"ID_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\TaskRepository")
 */
#[ApiResource(operations:[
    new Get(
        name: 'get_tasks',
        uriTemplate: '/get_tasks/{category}',
        controller: TaskController::class,
        openapiContext: [
            'summary' => 'Retrieves tasks by category',
            'description' => 'Retrieves tasks by category',
            'parameters' => [
                [
                    'name' => 'category',
                    'in' => 'path',
                    'required' => true,
                    'type' => 'string',
                    'description' => 'Category name',
                ],
            ],
        ]
    ),
    new Post(
        name: 'new_task',
        uriTemplate: '/add_task',
        controller: TaskController::class,
        openapiContext: [
            'summary' => 'Creates a new task',
            'description' => 'Creates a new task',
        ]
    ),
    new Put(
        name: 'update_task',
        uriTemplate: '/update_task/{id}',
        controller: TaskController::class,
        openapiContext: [
            'summary' => 'Updates task',
            'description' => 'Updates task',
            'parameters' => [
                [
                    'name' => 'id',
                    'in' => 'path',
                    'required' => true,
                    'type' => 'int',
                    'description' => 'Task id',
                ],
            ],
        ]
    ),
    new Delete(
        name: 'delete_task',
        uriTemplate: '/delete_task/{id}',
        controller: TaskController::class,
        openapiContext: [
            'summary' => 'Deletes task',
            'description' => 'Deletes task',
            'parameters' => [
                [
                    'name' => 'id',
                    'in' => 'path',
                    'required' => true,
                    'type' => 'int',
                    'description' => 'Task id',
                ],
            ],
        ]
    )
])]
class Task
{
    /**
     * @var int
     *
     * @ORM\Column(name="ID_task", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idTask;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="deadline", type="date", nullable=true)
     */
    private $deadline;

    /**
     * @var string
     *
     * @ORM\Column(name="priority", type="string", length=100, nullable=false)
     */
    private $priority;

    /**
     * @var \Category
     *
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ID_category", referencedColumnName="ID_category")
     * })
     */
    private $idCategory;

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
    public function getIdTask(): int
    {
        return $this->idTask;
    }

    /**
     * @param int $idTask
     */
    public function setIdTask(int $idTask): void
    {
        $this->idTask = $idTask;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     */
    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return \DateTime|null
     */
    public function getDeadline(): ?\DateTime
    {
        return $this->deadline;
    }

    /**
     * @param \DateTime|null $deadline
     */
    public function setDeadline(?\DateTime $deadline): void
    {
        $this->deadline = $deadline;
    }

    /**
     * @return string
     */
    public function getPriority(): string
    {
        return $this->priority;
    }

    /**
     * @param string $priority
     */
    public function setPriority(string $priority): void
    {
        $this->priority = $priority;
    }

    /**
     * @return Category
     */
    public function getIdCategory(): Category
    {
        return $this->idCategory;
    }

    /**
     * @param Category $idCategory
     */
    public function setIdCategory(Category $idCategory): void
    {
        $this->idCategory = $idCategory;
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
