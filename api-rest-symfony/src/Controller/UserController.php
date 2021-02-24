<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
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


        return new JsonResponse($videos);
    }


    public function register(Request $request) {
        // Recoger los dattos por post
        $content = $request->getContent();
        $content = \json_decode($content);

        // Decodificar el json

        // Respuesta por defecto
        $data = [
            'status' => 'error',
            'code' => 400,
            'message' => 'El usuario no se ha creado',
            'body' => $content
        ];

        // Comprobar y validar datos

        // Si la validacion es correcta, crear el onjeto de usuario

        // Cifrar contra

        // Comprobar si el usuario existe

        // Si no existe, guardarlo en la base de datos

        // Hacer respuesta en json
        return new JsonResponse($data, Response::HTTP_CREATED);
    }
}
