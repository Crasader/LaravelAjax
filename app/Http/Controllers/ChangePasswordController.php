<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ChangePasswordController extends Controller
{
    public function getChangePassword()
    {
        return view('changePassword');
    }

    public function postChangePassword(Request $request)
    {
        $email = $request->get('email');
        $user = User::where('email', $email)->first();
        $user->password = Hash::make($request->get('password'));
        $user->save();

        return response()->json($user);
    }

}


