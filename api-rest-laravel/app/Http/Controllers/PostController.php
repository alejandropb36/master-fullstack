<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Helpers\JwtAuth;

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

    public function store(Request $request)
    {
        $user = $this->getIdentity($request);

        $validate = \Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'category_id' => 'required',
            'image' => 'required'
        ]);

        if($validate->fails()) {
            $data = [
                'code' => 400,
                'status' => 'Badrequest',
                'errors' => $validate->errors()
            ];

            return response()->json($data, $data['code']);
        }

        $post = new Post();
        $post->user_id = $user->sub;
        $post->content = $request->input('content');
        $post->category_id = $request->input('category_id');
        $post->title = $request->input('title');
        $post->image = $request->input('image');
        $post->save();

        $data = [
            'code' => 201,
            'status' => 'success',
            'post' => $post
        ];

        return response()->json($data, $data['code']);
    }

    public function update(Request $request, $id)
    {
        $user = $this->getIdentity($request);
        $params = $request->all();

        $validate = \Validator::make($params, [
            'title' => 'required',
            'content' => 'required',
            'category_id' => 'required'
        ]);

        if($validate->fails()) {
            $data = [
                'code' => 422,
                'status' => 'Badrequest',
                'errors' => $validate->errors()
            ];

            return response()->json($data, $data['code']);
        }

        unset($params['id']);
        unset($params['user_id']);
        unset($params['created_at']);
        unset($params['user']);

        $post = Post::where('id', $id)
            ->where('user_id', $user->sub)
            ->first();

        if(!$post) {
            $data = [
                'code' => 404,
                'status' => 'NotFound',
                'message' => 'El post no existe'
            ];
        } else {
            $post->update($params);
            $data = [
                'code' => 200,
                'status' => 'success',
                'message' => 'El post se ha actualizado correctamente',
                'post' => $post
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $user = $this->getIdentity($request);

        $post = Post::where('id', $id)
            ->where('user_id', $user->sub)
            ->first();

        if(!$post) {
            $data = [
                'code' => 404,
                'status' => 'NotFound',
                'message' => 'El post no existe'
            ];
        } else {
            $post->delete();
            $data = [
                'code' => 200,
                'status' => 'success',
                'message' => 'El post se ha eliminado correctamente',
                'post' => $post
            ];
        }

        return response($data, $data['code']);
    }

    private function getIdentity($request)
    {
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization', null);
        $user = $jwtAuth->checkToken($token, true);

        return $user;
    }
}
