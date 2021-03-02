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
use App\Services\JwtAuth;

class UserController extends AbstractController
{

    private $jwtAuthService;

    public function __construct(JwtAuth $jwtAuthService)
    {
        $this->jwtAuthService = $jwtAuthService;
    }

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

        $data = [
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ];


        return new JsonResponse($users);
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

        // Comprobar y validar datos
        $name = (!empty($content->name)) ? $content->name : null;
        $surname = (!empty($content->surname)) ? $content->surname : null;
        $email = (!empty($content->email)) ? $content->email : null;
        $password = (!empty($content->password)) ? $content->password : null;

        $validator = Validation::createValidator();
        $validateEmail = $validator->validate($email, [
            new Email()
        ]);

        if (!empty($email) && count($validateEmail) == 0 && $name && $password && $surname) {

            // Si la validacion es correcta, crear el onjeto de usuario
            $user = new User();
            $user->setName($name);
            $user->setSurname($surname);
            $user->setEmail($email);
            $user->setRole('ROLE_USER');
            $user->setCreatedAt(new \Datetime('now'));

            // Cifrar contra
            $pwd = \hash('sha256', $password);
            $user->setPassword($pwd);

            $data = $user;

            // Comprobar si el usuario existe
            $doctrine = $this->getDoctrine();
            $em = $doctrine->getManager();
            $userRepo = $doctrine->getRepository(User::class);
            $issetUser = $userRepo->findBy([
                'email' => $user->getEmail()
            ]);

            // Si no existe, guardarlo en la base de datos
            if (count($issetUser) == 0) {
                // Guardo el usuario
                $em->persist($user);
                $em->flush();

                $data = [
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Usuario guardado correctamente',
                    'user' => $user
                ];
            } else {
                $data = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'El usuario ya existe'
                ];
            }
        }
        
        // Hacer respuesta en json
        return new JsonResponse($data, Response::HTTP_CREATED);
    }

    public function login(Request $request): Response
    {
        $content = $request->getContent();
        $content = json_decode($content);

        
        if (!$content || $content == null) {
            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => 'Error al enviar los datos'
            ];
            return new JsonResponse($data, Response::HTTP_BAD_REQUEST);
        }

        $email = (!empty($content->email)) ? $content->email : null;
        $password = (!empty($content->password)) ? $content->password : null;
        $getToken = (!empty($content->getToken)) ? $content->getToken : null;

        $validator = Validation::createValidator();
        $validateEmail = $validator->validate($email, [
            new Email()
        ]);

        if ($email != null && $password != null && count($validateEmail) == 0) {
            $pwd = hash('sha256', $password);
            if ($getToken) {
                $signup = $jwtAuthService->signup($email, $pwd, $getToken);
            } else {
                $signup = $jwtAuthService->signup($email, $pwd);
            }
    
            return new JsonResponse($signup, Response::HTTP_OK);

        } else {
            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => 'Los datos no son validos'
            ];
            return new JsonResponse($data, Response::HTTP_BAD_REQUEST);
        }
    }

    public function edit(Request $request): Response
    {
        $authorizationHeader = $request->headers->get('Authorization');

        $authCheck = $this->jwtAuthService->checkToken($authorizationHeader);

        if ($authCheck) {
            
        }

        $data = [
            'status' => 'success',
            'message' => 'Metodo de edit del controlador de usuarios',
            'auth' => $authCheck,
        ];

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
