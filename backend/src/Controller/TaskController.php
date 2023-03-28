<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Task;

/**
 * @Route("/api", name="api_")
 */

class TaskController extends AbstractController
{
    #[Route('/task', name: 'new_task', methods: "GET")]
    public function new(ManagerRegistry $doctrine,Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();


        $data =[
            'controller_name' =>'TaskController',
            'czy_dziala' =>'dziala',
        ];
        return $this->json($data);
    }
}
