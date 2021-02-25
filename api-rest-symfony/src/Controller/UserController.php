<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\Email;
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


    public function register(Request $request): Response
    {
        // Recoger los dattos por post
        $content = $request->getContent();
        
        // Decodificar el json
        $content = \json_decode($content);

        // Respuesta por defecto
        $data = [
            'status' => 'error',
            'code' => 400,
            'message' => 'El usuario no se ha creado'
        ];

        if ($content == null) {
            return new JsonResponse($data, 400);
        }

        $name = (!empty($content->name)) ? $content->name : null;
        $surname = (!empty($content->surname)) ? $content->surname : null;
        $email = (!empty($content->email)) ? $content->email : null;
        $password = (!empty($content->password)) ? $content->password : null;

        $validator = Validation::createValidator();
        $validateEmail = $validator->validate($email, [
            new Email()
        ]);

        if (!empty($email) && count($validateEmail) == 0 && $name && $password && $surname) {
            $data = [
                'status' => 'success',
                'code' => 200,
                'message' => 'Validacion correcta'
            ];
        }

        // Comprobar y validar datos

        // Si la validacion es correcta, crear el onjeto de usuario

        // Cifrar contra

        // Comprobar si el usuario existe

        // Si no existe, guardarlo en la base de datos

        // Hacer respuesta en json
        return new JsonResponse($data, Response::HTTP_CREATED);
    }
}
