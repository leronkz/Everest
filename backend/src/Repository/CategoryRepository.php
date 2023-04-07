<?php

namespace App\Repository;

use App\Entity\Category;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Category>
 *
 * @method Category|null find($id, $lockMode = null, $lockVersion = null)
 * @method Category|null findOneBy(array $criteria, array $orderBy = null)
 * @method Category[]    findAll()
 * @method Category[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

    public function addCategory(Category $category): void{

        $this->getEntityManager()->persist($category);
        $this->getEntityManager()->flush();

    }

    public function getCategoryByName(User $user, string $name): ?Category{
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('c')
            ->from(Category::class,'c')
            ->where('c.categoryName = :name')
            ->andWhere('c.idUser = :ID_user')
            ->setParameter('name',$name)
            ->setParameter('ID_user',$user)
            ->getQuery()
            ->getOneOrNullResult();
    }
    public function getAllCategories(User $user): ?Array{
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('c.categoryName')
            ->from(Category::class,'c')
            ->where('c.idUser = :ID_user')
            ->setParameter('ID_user',$user)
            ->getQuery()
            ->getArrayResult();
    }
}
