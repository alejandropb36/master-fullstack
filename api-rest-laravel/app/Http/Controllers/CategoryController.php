<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{

    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }

    public function index() {
        $categories = Category::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'categories' => $categories
        ], 200);
    }

    public function show($id) {

        $category = Category::find($id);

        if(is_object($category)) {
            $data = [
                'code' => 200,
                'status' => 'success',
                'category' => $category
            ];
        } else {
            $data = [
                'code' => 404,
                'status' => 'NotFound',
                'message' => 'No se ha encontrado la categoria'
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function store(Request $request) {
        $validate = \Validator::make($request->all(), [
            'name' => 'required|string'
        ]);


        if($validate->fails()) {
            $data = [
                'code' => 400,
                'status' => 'badrequest',
                'errors' => $validate->errors()
            ];
            return response()->json($data, $data['code']);
        }

        $category = Category::make($request->all());
        $category->save();

        $data = [
            'code' => 201,
            'status' => 'success',
            'category' => $category
        ];
        return response()->json($data, $data['code']);
    }

    public function update($id, Request $request) {
        $validate = \Validator::make($request->all(), [
            'name' => 'required|string'
        ]);


        if($validate->fails()) {
            $data = [
                'code' => 400,
                'status' => 'badrequest',
                'errors' => $validate->errors()
            ];
            return response()->json($data, $data['code']);
        }

        $params = $request->all();
        unset($params['id']);
        unset($params['created_at']);

        $category = Category::find($id);
        $category->update($params);

        $data = [
            'code' => 200,
            'status' => 'success',
            'category' => $category
        ];
        return response()->json($data, $data['code']);
    }
}
