<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }

    public function index() {
        $posts = Post::paginate(10)->load('category');
        return response()->json($posts, 200);
    }

    public function show($id)
    {
        $post = Post::find($id);

        if(is_object($post)) {
            $data = [
                'code' => 200,
                'status' => 'success',
                'post' => $post->load('category')
            ];
        } else {
            $data = [
                'code' => 404,
                'status' => 'NotFound',
                'message' => 'El post no se ha encontrado'
            ];
        }

        return response()->json($data, $data['code']);
    }
}
