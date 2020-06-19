<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
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
}
