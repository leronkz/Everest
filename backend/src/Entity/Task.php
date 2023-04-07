<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Task
 *
 * @ORM\Table(name="task", indexes={@ORM\Index(name="task_category_ID_category_fk", columns={"ID_category"}), @ORM\Index(name="task_user_ID_user_fk", columns={"ID_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\TaskRepository")
 */
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
