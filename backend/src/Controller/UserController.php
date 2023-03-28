<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\User;

/**
 * @Route("/api", name="api_")
 */

class UserController extends AbstractController
{
    public function hash_password(string $password): string{
        $hash = password_hash($password, PASSWORD_BCRYPT);
        return $hash;
    }

    #[Route('/create', name: "new_user", methods: 'POST')]
    public function newUser(ManagerRegistry $doctrine, Request $request): Response
    {
        $data = json_decode($request->getContent(),true);
        $entityManager = $doctrine->getManager();
        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword($this->hash_password($data['password']));

        $entityManager->persist($user);
        $entityManager->flush();
        return $this->json('Rejestracja przebiegła pomyślnie, możesz się teraz zalogować na swoje konto');
    }
}