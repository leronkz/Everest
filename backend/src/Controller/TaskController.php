<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Task;
use Doctrine\Persistence\ManagerRegistry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use DateTime;


/**
 * @Route("/api", name="api_")
 */

#[AsController]
class TaskController extends AbstractController
{
    #[Route('/add_task', name: 'new_task', methods: "POST")]
    #[Security("is_granted('ROLE_USER')")]
    public function createTask(ManagerRegistry $doctrine,Request $request): JsonResponse
    {
        $user = $this->getUser();
        $decoded = json_decode($request->getContent());
        $title = $decoded->title;
        $description = $decoded->description;
        $deadline = DateTime::createFromFormat('Y-m-d',$decoded->deadline);
        $priority = $decoded->priority;
        $category = $decoded->category;
        $category_obj = $doctrine->getRepository(Category::class)->getCategoryByName($user,$category);
        $task = new Task();
        $task->setTitle($title);
        $task->setDescription($description);
        $task->setDeadline($deadline);
        $task->setPriority($priority);
        $task->setIdUser($user);
        $task->setIdCategory($category_obj);
        $doctrine->getRepository(Task::class)->addTask($task);
        return $this->json(['message' =>'New task added successfully']);
    }

    #[Route('/get_tasks/{category}', name: 'get_tasks', methods: 'GET')]
    #[Security("is_granted('ROLE_USER')")]
    public function getTasks(ManagerRegistry $doctrine, Request $request, string $category): JsonResponse{

        $user= $this->getUser();
        $category_obj = $doctrine->getRepository(Category::class)->getCategoryByName($user,$category);
        $tasks = array();
        if($category === 'all'){
            $tasks = $doctrine->getRepository(Task::class)->getAllTasks($user);
        }
        else if($category==='today'){
            $now = date('Y-m-d', strtotime('today'));
            $today = new DateTime($now);
            $tasks = $doctrine->getRepository(Task::class)->getTodaysTasks($user,$today);
        }
        else{
            $tasks = $doctrine->getRepository(Task::class)->getTasksByCategory($user,$category_obj);
        }
        if(is_null($tasks)){
            return $this->json(['error'=>'No tasks'],200,['Content-type: application/json']);
        }
        else
            return $this->json($tasks,200,['Content-type: application/json']);
    }
    #[Route('/delete_task/{id}', name:'delete_task', methods: 'DELETE')]
    #[Security("is_granted('ROLE_USER')")]
    public function deleteTask(ManagerRegistry $doctrine, int $id): JsonResponse{

        $task = $doctrine->getRepository(Task::class)->find($id);
        $doctrine->getRepository(Task::class)->removeTask($task);
        return $this->json('Task deleted successfully',200,['Content-type: application/json']);
    }

    #[Route('/update_task/{id}', name: 'update_task', methods:'PUT')]
    #[Security("is_granted('ROLE_USER')")]
    public function updateTask(ManagerRegistry $doctrine, Request $request, int $id): JsonResponse{

        $user = $this->getUser();
        $decoded = json_decode($request->getContent());
        $category_obj = $doctrine->getRepository(Category::class)->getCategoryByName($user,$decoded->category);
        $deadline = DateTime::createFromFormat('Y-m-d',$decoded->deadline);

        $updatedTask = new Task();
        $updatedTask->setIdUser($user);
        $updatedTask->setTitle($decoded->title);
        $updatedTask->setDescription($decoded->description);
        $updatedTask->setDeadline($deadline);
        $updatedTask->setPriority($decoded->priority);
        $updatedTask->setIdCategory($category_obj);

        $doctrine->getRepository(Task::class)->updateTask($updatedTask, $id);

        return $this->json(['message'=>'Task updated successfully'],200,['Content-type: application/json']);
    }

}
