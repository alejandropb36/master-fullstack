<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function pruebas(Request $request) {
        return "Accion de pruebas user controller";
    }

    public function register(Request $request) {
        $name = $request->input('name');
        $surname = $request->input('surname');
        return "Accion de registro usuario: " . $name . " " . $surname;
    }

    public function login(Request $request) {
        return "Accion de login de usuario";
    }
}
