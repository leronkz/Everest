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

/**
 * @Route("/api", name="api_")
 */

class UserController extends AbstractController
{
    #[Route('/api/user', name:'get_user', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function getUserData(): JsonResponse{

        $user = $this->getUser();

        return new JsonResponse(['user' => $user], Response::HTTP_OK);
    }
}