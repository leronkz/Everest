<?php

namespace App\Controller;

use App\Entity\Category;
use Doctrine\Persistence\ManagerRegistry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/api", name="api_")
 */

class CategoryController extends AbstractController
{

    #[Route('/get_categories', name: 'get_categories', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function getCategories(ManagerRegistry $doctrine): JsonResponse{

        $user = $this->getUser();
        $categories = $doctrine->getRepository(Category::class)->getAllCategories($user);

        return $this->json($categories,200,['Content-type: application/json']);
    }

    #[Route('/add_category', name:'add_category', methods: 'POST')]
    #[Security("is_granted('ROLE_USER')")]
    public function addCategory(ManagerRegistry $doctrine, Request $request): JsonResponse{

        $user = $this->getUser();
        $decoded = json_decode($request->getContent());
        $category = new Category();
        $category->setCategoryName($decoded->name);
        $category->setIdUser($user);

        $doctrine->getRepository(Category::class)->addCategory($category);

        return $this->json(['message'=>'Category added successfully'],200,['Content-type: application/json']);
    }
}
