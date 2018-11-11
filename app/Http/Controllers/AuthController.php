<?php

namespace App\Http\Controllers;

use Session;
use Redirect;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function getLogin()
    {
        return view('login');
    }

    public function postLogin(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        if (Auth::attempt(['email' => $email,'password' => $password])) {
            return response()->json('Login Successfully');
        }

        return response()->json('Login Fail!');
    }

    public function logout()
    {
        Session::flush();
        Auth::logout();

        return Redirect::back();
    }
}
