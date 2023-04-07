<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\UserData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserData>
 *
 * @method UserData|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserData|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserData[]    findAll()
 * @method UserData[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserDataRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserData::class);
    }

    public function addUserData(UserData $userData): void{
        $this->getEntityManager()->persist($userData);
        $this->getEntityManager()->flush();
    }

    public function getUserData(User $user): Array{
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('ud.name', 'ud.surname', 'ud.birthDate','ud.image')
            ->from(UserData::class, 'ud')
            ->join(User::class,'u','WITH','ud.idUser = u.idUser')
            ->andWhere('u.idUser = :ID_user')
            ->setParameter('ID_user',$user)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
