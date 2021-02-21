<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Entity\Video;

class UserController extends AbstractController
{
    public function index(): Response
    {
        $user_repo = $this->getDoctrine()->getRepository(User::class);
        $video_repo = $this->getDoctrine()->getRepository(Video::class);

        $users = $user_repo->findAll();
        // $videos = $video_repo->findAll();

        foreach($users as $user) {
            echo "<h1>" . $user->getName() . "</h1>";

            foreach($user->getVideos() as $video) {
                echo "<h3>" . $video->getTitle() . " - " . $video->getUser()->getEmail() . "</h3>";
            }
        }

        die();

        return $this->json([
            'users' => [],
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ]);
    }
}
