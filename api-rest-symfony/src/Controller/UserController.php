<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use App\Entity\Video;

class UserController extends AbstractController
{

    private function restjson($data) {
        $json = $this->get('serializer')->serialize($data, 'json');

        $response = new Response();

        $response->setContent($json);

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function index(): Response
    {
        $user_repo = $this->getDoctrine()->getRepository(User::class);
        $video_repo = $this->getDoctrine()->getRepository(Video::class);

        $users = $user_repo->findAll();
        $user = $user_repo->find(1);

        $data = [
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ];
        $videos = $video_repo->findAll();

        // foreach($users as $user) {
        //     echo "<h1>" . $user->getName() . "</h1>";

        //     foreach($user->getVideos() as $video) {
        //         echo "<h3>" . $video->getTitle() . " - " . $video->getUser()->getEmail() . "</h3>";
        //     }
        // }


        return $this->restjson($videos);
    }
}
