<?php

namespace App\Controller;

use App\Entity\UserData;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;

/**
 * @Route("/api", name="api_")
 */


class SecurityController extends AbstractController
{
    #[Route('/register', name: 'register', methods: 'POST')]
    public function register(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $decoded = json_decode($request->getContent());
        $email = $decoded->email;
        $plaintextPassword = $decoded -> password;
        $user = new User();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $user->setEmail($email);
        $doctrine->getRepository(User::class)->addUser($user);
        $registeredUser = $doctrine->getRepository(User::class)->getUserByEmail($email);
        $userData = new UserData();
        $userData->setName("Imie");
        $userData->setSurname("Nazwisko");
        $userData->setBirthDate(null);
        $userData->setImage(null);
        $userData->setIdUser($registeredUser);
        $doctrine->getRepository(UserData::class)->addUserData($userData);

        return $this->json(['message' =>'Registered Successfully']);
    }
    #[Route('/change_password',name:'change_password', methods: 'POST')]
    #[Security("is_granted('ROLE_USER')")]
    public function changePassword(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse{

        $user = $this->getUser();
        $decoded = json_decode($request->getContent());
        $plaintextPassword = $decoded->new_password;
        $oldPlaintextPassword = $decoded->old_password;

        if(!$passwordHasher->isPasswordValid($user,$oldPlaintextPassword)){
            return $this->json(['message'=>'Thats not your password'],401,['Content-type: application/json']);
        }else{
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $plaintextPassword
            );
            $doctrine->getRepository(User::class)->updateUserPassword($user,$hashedPassword);
            return $this->json(['message'=>'Password has been changed'],200,['Content-type: application/json']);
        }
    }
}
