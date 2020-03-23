<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function pruebas(Request $request) {
        return "Accion de pruebas user controller";
    }

    public function register(Request $request) {
        $data = array(
            'status' => 'bad request',
            'code' => 400,
            'message' => 'bad request',
            'user' => null
        );

        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(empty($params_array)) {
            return response()->json($data, $data['code']);
        }

        $params_array = array_map('trim', $params_array);

        $validate = \Validator::make($params_array, [
            'name' => 'required|alpha',
            'surname' => 'required|alpha',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if($validate->fails()) {
            $data['message'] = $validate->errors();
            $data['status'] = 'Error de validacion';
            return response()->json($data, $data['code']);
        }

        $password = hash('sha256', $params_array['password']);

        $user = new User();
        $user->name = $params_array['name'];
        $user->surname = $params_array['surname'];
        $user->email = $params_array['email'];
        $user->password = $password;
        $user->role = 'ROLE_USER';

        $user->save();

        $data['status'] = 'success';
        $data['code'] = 200;
        $data['message'] = 'El usuario fue creado correctamente';
        $data['user'] = $user;
        
        return response()->json($data, $data['code']);
    }

    public function login(Request $request) {
        $jwtAuth = new \JwtAuth();

        $email = 'alexponce36@hotmail.com';
        $password = 'password';

        $pwd = hash('sha256', $password);

        
        return response()->json($jwtAuth->singup($email, $pwd, true));
    }
}
