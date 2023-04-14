<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\FileUploader;
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
    #[Route('/api/save_user', name:'save_user_data', methods: 'POST')]
    #[Security("is_granted('ROLE_USER')")]
    public function saveUserData(ManagerRegistry $doctrine, Request $request, FileUploader $fileUploader): JsonResponse{

        $decoded = json_decode($request->getContent());
        $user = $this->getUser();
        $userData = $doctrine->getRepository(UserData::class)->getUserData($user);
        $name = $decoded->name;
        $surname = $decoded->surname;
        $birthdate = $decoded->birthdate;
//        $image = $decoded->image;
//        $imageFilename = $fileUploader->upload($image);

        $userData['name'] = $name;
        $userData['surname'] = $surname;
        $userData['birthdate'] = $birthdate;
//        $userData['image'] = $imageFilename;
        $doctrine->getRepository(UserData::class)->updateUserData($user,$userData);
        return $this->json(['message'=>'User data saved successfully'],200,['Content-type: application/json']);
    }
}