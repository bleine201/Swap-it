<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserSettings extends Controller
{
    public function activeEmail($token,$email)
    {
       $user =  User::where('email',$email)->first();
       if($user){
            if($user->remember_token == $token){
                //activate email
                $user->email_verified_at = now();
                $user->remember_token = "";
                $user->save();
                return "email verified";
            }else{
              return abort(401);
            }
       }else{
        return abort(401);
       }
    }

  


}
