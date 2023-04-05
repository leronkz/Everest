<?php

namespace App\Controller;

use App\Entity\UserData;
use Doctrine\ORM\EntityManagerInterface;
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
}
