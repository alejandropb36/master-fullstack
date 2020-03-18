<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function pruebas(Request $request) {
        return "Accion de pruebas user controller";
    }

    public function register(Request $request) {
        // Recoger datos por post
        $json = $request->input('json', null);
        $params = json_decode($json); // Object
        $params_array = json_decode($json, true); // array

        var_dump($params);exit;



        // Validar datos

        // Cifrar contra

        // Copmporbar si el usuario existe
        
        // Crear usuario


        $data = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'El usuario no se ha creado'
        );

        return response()->json($data, $data['code']);
    }

    public function login(Request $request) {
        return "Accion de login de usuario";
    }
}
