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

use Knp\Component\Pager\PaginatorInterface;

class VideoController extends AbstractController
{
    private $jwtAuthService;
    private $paginatorService;

    public function __construct(JwtAuth $jwtAuthService, PaginatorInterface $paginatorService)
    {
        $this->jwtAuthService = $jwtAuthService;
        $this->paginatorService = $paginatorService;
    }

    public function index(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/VideoController.php',
        ]);
    }

    public function newVideo(Request $request, $id = null): Response
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

                if ($id == null) {
    
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
                    $video = $doctrine->getRepository(Video::class)->findOneBy([
                        'id' => $id,
                        'user' => $identity->sub
                    ]);

                    if (!$video || !is_object($video)) {
                        $data = [
                            'status' => 'Not found',
                            'meesage' => 'Video No de ha encontrado'
                        ];
                        return new JsonResponse($data, Response::HTTP_NOT_FOUND);
                    }
                    $video->setTitle($title);
                    $video->setUrl($url);
                    $video->setDescription($description);
                    $updatedAt = new \Datetime('now');
                    $video->setUpdatedAt($updatedAt);

                    $em->persist($video);
                    $em->flush();
                    $data = [
                        'status' => 'success',
                        'meesage' => 'Video actualizado correctamente',
                        'video' => $video
                    ];
                    return new JsonResponse($data, Response::HTTP_OK);
                }

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

    public function list(Request $request): Response
    {
        $token = $request->headers->get('Authorization', null);

        $authCheck = $this->jwtAuthService->checkToken($token);
        
        if ($authCheck) {
            $identity = $this->jwtAuthService->checkToken($token, true);
            $doctrine = $this->getDoctrine();
            $em = $doctrine->getManager();

            $dql = "SELECT v FROM App\Entity\Video v WHERE v.user = {$identity->sub} ORDER BY v.id DESC";
            $query = $em->createQuery($dql);


            $page = $request->query->getInt('page', 1);
            $itemsPerPage = 5;

            $pagination = $this->paginatorService->paginate($query, $page, $itemsPerPage);
            $total = $pagination->getTotalItemCount();

            $data = [
                'status' => 'success',
                'pagination' => [
                    'total' => $total,
                    'page' => $page,
                    'itemsPerPage' => $itemsPerPage,
                    'totalPages' => ceil($total / $itemsPerPage),
                ],
                'videos' => $pagination,
                'user_id' => $identity->sub
            ];
            return $this->json($data, Response::HTTP_OK);


        } else {
            $data = [
                'status' => 'Unauthorized',
                'message' => 'Token no valido'
            ];
            return $this->json($data, Response::HTTP_UNAUTHORIZED);
        }
    }

    public function video(Request $request, $id): Response 
    {
        $token = $request->headers->get('Authorization', null);

        $authCheck = $this->jwtAuthService->checkToken($token);

        if ($authCheck) {
            $identity = $this->jwtAuthService->checkToken($token, true);

            $video = $this->getDoctrine()->getRepository(Video::class)->findOneBy([
                'id' => $id,
                'user' => $identity->sub
            ]);

            if ($video && is_object($video)) {

                $data = [
                    'status' => 'success',
                    'video' => $video
                ];
        
                return $this->json($data, Response::HTTP_OK);

            } else {
                $data = [
                    'status' => 'Not Found',
                    'meesage' => 'El video no se ha encontrado'
                ];
                return $this->json($data, Response::HTTP_NOT_FOUND); 
            }


        } else {
            $data = [
                'status' => 'unauthorized',
                'meesage' => 'Unauthorized, token no valido'
            ];
            return $this->json($data, Response::HTTP_UNAUTHORIZED); 
        }
    }

    public function remove(Request $request, $id): Response
    {
        $token = $request->headers->get('Authorization', null);

        $authCheck = $this->jwtAuthService->checkToken($token);

        if ($authCheck) {
            $identity = $this->jwtAuthService->checkToken($token, true);
            $doctrine = $this->getDoctrine();
            $em = $doctrine->getManager();

            $video = $doctrine->getRepository(Video::class)->findOneBy(['id' => $id]);

            if ($video && is_object($video) && $identity->sub == $video->getUser()->getId()) {
                $em->remove($video);
                $em->flush();
                $data = [
                    'status' => 'success',
                    'meesage' => 'El video fue eliminado correctamente',
                    'video' => $video
                ];
                return $this->json($data, Response::HTTP_OK); 
            } else {
                $data = [
                    'status' => 'not found',
                    'meesage' => 'El video no se ha encontrado'
                ];
                return $this->json($data, Response::HTTP_NOT_FOUND);
            }

        } else {
            $data = [
                'status' => 'unauthorized',
                'meesage' => 'Unauthorized, token no valido'
            ];
            return $this->json($data, Response::HTTP_UNAUTHORIZED); 
        }
    }

}
