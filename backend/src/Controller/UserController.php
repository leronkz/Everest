<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\UserData;

/**
 * @Route("/api", name="api_")
 */

class UserController extends AbstractController
{
    #[Route('/api/user', name:'get_user', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function getUserData(ManagerRegistry $doctrine): JsonResponse{
        $user = $this->getUser();
        $userData = $doctrine->getRepository(UserData::class)->getUserData($user);
        return $this->json($userData,200,['Content-type: application/json']);
    }
    #[Route('/api/delete_account', name: 'delete_account', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function deleteUser(ManagerRegistry $doctrine): JsonResponse{
        $user = $this->getUser();
        $doctrine->getRepository(User::class)->removeUser($user);
        return $this->json(['message'=>'Account deleted successfully'],200,['Content-type: application/json']);
    }
}