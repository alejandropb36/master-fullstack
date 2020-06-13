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

        $validate = \Validator::make($request->all(), [
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

        $password = hash('sha256', $request->input('password'));

        $user = new User();
        $user->name = $request->input('name');
        $user->surname = $request->input('surname');
        $user->email = $request->input('email');
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

        $data = array(
            'status' => 'bad request',
            'code' => 400,
            'message' => 'bad request'
        );

        $validate = \Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validate->fails()) {
            $data['message'] = $validate->errors();
            $data['status'] = 'Error de validacion';
            return response()->json($data, $data['code']);
        }

        $email = $request->input('email');
        $pwd = hash('sha256', $request->input('password'));

        $singup = $jwtAuth->singup($email, $pwd);
        if(!empty($request->input('getToken'))) {
            $singup = $jwtAuth->singup($email, $pwd, true);
        }
        
        return response()->json($singup, 200);
    }
}
