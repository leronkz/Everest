<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\UserData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function addUser(User $user) : void{
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }
    public function getUserByEmail(string $email) : User{
       return $this->getEntityManager()
            ->createQueryBuilder()->select('u')
            ->from(User::class,'u')
            ->where('u.email = :email')
            ->setParameter('email',$email)
            ->getQuery()
            ->getOneOrNullResult();
    }
    public function updateUserPassword(User $user, string $newPassword): void{
        $this->getEntityManager()
            ->createQueryBuilder()
            ->update(User::class,'u')
            ->set('u.password',':new_password')
            ->where('u.idUser = :ID_user')
            ->setParameter('new_password',$newPassword)
            ->setParameter('ID_user',$user->getIdUser())
            ->getQuery()
            ->execute();
    }
    public function removeUser(User $user): void{
        $this->getEntityManager()->remove($user);
        $this->getEntityManager()->flush();
    }
//    public function remove(User $entity, bool $flush = false): void
//    {
//        $this->getEntityManager()->remove($entity);
//
//        if ($flush) {
//            $this->getEntityManager()->flush();
//        }
//    }

//    /**
//     * @return User[] Returns an array of User objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?User
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
