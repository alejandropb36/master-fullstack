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

    public function update(Request $request)
    {
        $data = array(
            'status' => 'bad request',
            'code' => 400,
            'message' => 'bad request',
            'user' => null
        );
        $jwt = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checkToken = $jwtAuth->checkToken($jwt);
        $params = $request->all();

        if($checkToken && !empty($params)) {
            
            $user = $jwtAuth->checkToken($jwt, true);
            $validate = \Validator::make($params, [
                'name' => 'required|string',
                'surname' => 'required|string',
                'email' => 'required|email|unique:users,email,' . $user->sub
            ]);

            if($validate->fails()) {
                $data['message'] = $validate->errors();
                $data['status'] = 'Error de validacion';
                return response()->json($data, $data['code']);
            }
    

            unset($params['id']);
            unset($params['role']);
            unset($params['password']);
            unset($params['created_at']);
            unset($params['remember_token']);

            $user_update = User::where('id', $user->sub)->update($params);
            $user_update = User::where('id', $user->sub)->ftp_rawlist();
            $data = [
                'code' => 200,
                'status' => 'success',
                'user' => $user_update
            ];
            
        } else {
            $data = [
                'code' => 401,
                'status' => 'Unauthorized',
                'message' => 'Usuario no esta autenticado correctamente'
            ];   
        }

        return response()->json(
            $data,
            $data['code']
        );
    }

    public function upload(Request $request)
    {
        $data = [
            'code' => 401,
            'status' => 'Unauthorized',
            'message' => 'Usuario no esta autenticado correctamente'
        ];
        return response(
            $data,
            $data['code']
        )->header('Content-Type', 'text/plain');
    }
}
