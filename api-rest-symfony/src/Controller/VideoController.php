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
        $data = [
            'status' => 'success',
            'meesage' => 'respuesta desde new video'
        ];
        return new JsonResponse($data, Response::HTTP_OK);
    }

}
