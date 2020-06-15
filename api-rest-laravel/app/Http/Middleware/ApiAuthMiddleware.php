<?php

namespace App\Http\Middleware;

use Closure;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $jwt = $request->header('Authorization') ? $request->header('Authorization') : '';
        $jwtAuth = new \JwtAuth();
        $checkToken = $jwtAuth->checkToken($jwt);
        if($checkToken) {
            return $next($request);
        }

        $data = [
            'code' => 401,
            'status' => 'Unauthorized',
            'message' => 'Unauthorized, token invalid'
        ];

        return response()->json(
            $data,
            $data['code']
        );
    }
}
