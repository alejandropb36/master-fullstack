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

class VideoController extends AbstractController
{
    private $jwtAuthService;

    public function __construct(JwtAuth $jwtAuthService)
    {
        $this->jwtAuthService = $jwtAuthService;
    }

    public function index(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/VideoController.php',
        ]);
    }

    public function newVideo(Request $request): Response
    {
        $token = $request->headers->get('Authorization', null);

        $authCheck = $this->jwtAuthService->checkToken($token);

        if ($authCheck) {
            $content = $request->getContent();
            $content = json_decode($content);
            $identity = $this->jwtAuthService->checkToken($token, true);

            $user_id = ($identity->sub != null) ? $identity->sub : null;
            $title = (!empty($content->title)) ? $content->title : null;
            $description = (!empty($content->description)) ? $content->description : null;
            $url = (!empty($content->url)) ? $content->url : null;

            if (!empty($user_id) && !empty($title) && !empty($url)) {
                $doctrine = $this->getDoctrine();
                $em = $doctrine->getManager();

                $user = $doctrine->getRepository(User::class)->findOneBy([
                    'id' => $user_id
                ]);

                $video = new Video();
                $video->setUser($user);
                $video->setTitle($title);
                $video->setUrl($url);
                $video->setDescription($description);
                $video->setStatus('normal');

                $createdAt = new \Datetime('now');
                $video->setCreatedAt($createdAt);
                $video->setUpdatedAt($createdAt);

                $em->persist($video);
                $em->flush();

                $data = [
                    'status' => 'success',
                    'meesage' => 'Video creado correctamente',
                    'video' => $video
                ];
                return new JsonResponse($data, Response::HTTP_OK);

            } else {
                $data = [
                    'status' => 'error',
                    'meesage' => 'Datos no validos'
                ];
                return new JsonResponse($data, Response::HTTP_BAD_REQUEST); 
            }

        } else {
            $data = [
                'status' => 'unauthorized',
                'meesage' => 'Unauthorized, token no valido'
            ];
            return new JsonResponse($data, Response::HTTP_UNAUTHORIZED); 
        }
    }

}
