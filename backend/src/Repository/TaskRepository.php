<?php

namespace App\Repository;

use App\Entity\Category;
use App\Entity\Task;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Task>
 *
 * @method Task|null find($id, $lockMode = null, $lockVersion = null)
 * @method Task|null findOneBy(array $criteria, array $orderBy = null)
 * @method Task[]    findAll()
 * @method Task[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TaskRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Task::class);
    }

    public function addTask(Task $task): void{
        $this->getEntityManager()->persist($task);
        $this->getEntityManager()->flush();
    }

    public function getTasksByCategory(User $user, Category $category): ?Array{
       return $this->getEntityManager()
            ->createQueryBuilder()
            ->select("t.title", "t.description", "t.priority", "t.deadline")
            ->from(Task::class,"t")
            ->join(User::class,"u",'WITH',"t.idUser = u.idUser")
            ->join(Category::class,"c",'WITH',"t.idCategory = c.idCategory")
            ->where('t.idUser = :ID_user')
            ->andWhere('c.categoryName = :cat_name')
            ->setParameter('ID_user',$user)
            ->setParameter('cat_name',$category->getCategoryName())
            ->getQuery()
            ->getArrayResult();
    }
    public function getAllTasks(User $user): ?Array{
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select("t.title", "t.description", "t.priority", "t.deadline")
            ->from(Task::class,"t")
            ->join(User::class,"u","WITH","t.idUser = u.idUser")
//            ->join(Category::class,"c","WITH","t.idCategory = c.idCategory")
            ->where('u.idUser = :ID_user')
            ->setParameter('ID_user',$user)
            ->getQuery()
            ->getArrayResult();
    }
    public function getTodaysTasks(User $user, DateTime $date): ?Array{
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select("t.title", "t.description", "t.priority", "t.deadline")
            ->from(Task::class, "t")
            ->join(User::class,"u","WITH","t.idUser = u.idUser")
//            ->join(Category::class, "c","WITH","t.idCategory = c.idCategory")
            ->where('u.idUser = :ID_user')
            ->andWhere('t.deadline = :date')
            ->setParameter('ID_user',$user)
            ->setParameter('date',$date)
            ->getQuery()
            ->getArrayResult();
    }
}
