<?php

namespace App\Controller;

use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\TextUI\XmlConfiguration\File;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
    public function getUserData(ManagerRegistry $doctrine, FileUploader $fileUploader): JsonResponse{
        $user = $this->getUser();
        $userData = $doctrine->getRepository(UserData::class)->getUserData($user);
        return $this->json($userData,200,['Content-type: application/json']);
    }
    #[Route('/api/user_image', name:'get_user_image', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function getUserImage(ManagerRegistry $doctrine, FileUploader $fileUploader): Response{
        $user = $this->getUser();
        $userData = $doctrine->getRepository(UserData::class)->getUserData($user);
        $filePath = $fileUploader->getTargetDirectory().'/'.$userData['image'];
        return new BinaryFileResponse($filePath);
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
        $birthdate = DateTime::createFromFormat('Y-m-d',$decoded->birthdate);
        $userData['name'] = $name;
        $userData['surname'] = $surname;
        $userData['birthdate'] = $birthdate;
        $doctrine->getRepository(UserData::class)->updateUserData($user,$userData);
        return $this->json(['message'=>'User data saved successfully'],200,['Content-type: application/json']);
    }
    #[Route('/api/save_image', name:'save_image', methods: 'POST')]
    #[Security("is_granted('ROLE_USER')")]
    public function saveUserImage(ManagerRegistry $doctrine, Request $request, FileUploader $fileUploader): JsonResponse{

        $user = $this->getUser();
        $file = $request->files->get('image');
        if(!$file){
            return $this->json(['message'=>'No file uploaded'],400,['Content-type: application/json']);
        }
        $fileName = $fileUploader->upload($file);
        $doctrine->getRepository(UserData::class)->updateUserImage($user,$fileName);
        return $this->json(['message'=>'Photo saved successfully'],200,['Content-type: application/json']);
    }
}