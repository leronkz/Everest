<?php

namespace App\Controller;

use App\Message\DeleteConfirmation;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\FileUploader;
use App\Entity\User;
use App\Entity\UserData;


/**
 * @Route("/api", name="api_")
 */
#[AsController]
class UserController extends AbstractController
{
    #[Route('/api/user', name:'get_user', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function getUserData(ManagerRegistry $doctrine): JsonResponse{
        $user = $this->getUser();
        $userData = $doctrine->getRepository(UserData::class)->getUserData($user);
        return $this->json($userData,200,['Content-type: application/json']);
    }
    #[Route('/api/user_image/{id}', name:'get_user_image', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function getUserImage(ManagerRegistry $doctrine, FileUploader $fileUploader, int $id): Response{
        $user = $doctrine->getRepository(User::class)->find($id);
        $userData = $doctrine->getRepository(UserData::class)->getUserData($user);
        if(!is_null($userData['image']) && $userData['image'] != "") {
            $filePath = $fileUploader->getTargetDirectory() . '/' . $userData['image'];
            $response = new BinaryFileResponse($filePath,200);
            $response->setCache([
                'must_revalidate'  => false,
                'no_cache'         => false,
                'no_store'         => false,
                'no_transform'     => false,
                'public'           => true,
                'private'          => false,
                'proxy_revalidate' => false,
                'max_age'          => 0,
                's_maxage'         => 0,
                'immutable'        => true,
                'last_modified'    => new \DateTime(),
                'etag'             => 'abcdef'
            ]);
            return $response;
        }
        else{
            return new Response('No file found',400,['Content-type: application/json']);
        }
    }
    #[Route('/api/delete_account', name: 'delete_account', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function deleteUser(ManagerRegistry $doctrine, MessageBusInterface $bus): JsonResponse{
        $user = $this->getUser();
        $doctrine->getRepository(User::class)->removeUser($user);
        $bus->dispatch(new DeleteConfirmation($user));
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
        $userData = $doctrine->getRepository(UserData::class)->getUserData($user);
        if(!is_null($userData['image']) && $userData['image'] != "") {
            $oldFilePath = $fileUploader->getTargetDirectory() . '/' . $userData['image'];
            unlink($oldFilePath);
        }
        $doctrine->getRepository(UserData::class)->updateUserImage($user,$fileName);
        return $this->json(['message'=>'Photo saved successfully'],200,['Content-type: application/json']);
    }
    #[Route('/delete_image', name:'delete_image', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function deleteUserImage(ManagerRegistry $doctrine, FileUploader $fileUploader): JsonResponse{

        $user = $this->getUser();
        $userData = $doctrine->getRepository(UserData::class)->getUserData($user);
        $fileName = $fileUploader->getTargetDirectory().'/'.$userData['image'];
        if(!is_null($userData['image']) && $userData['image'] != "") {
            try {
                unlink($fileName);
                $doctrine->getRepository(UserData::class)->updateUserImage($user, "");
            } catch (\Exception $e) {
                return $this->json(['message' => 'Failed to delete file'], 400, ['Content-type: application/json']);
            }
        }
        return $this->json(['message'=>'File deleted successfully'],200,['Content-type: application/json']);
    }
}