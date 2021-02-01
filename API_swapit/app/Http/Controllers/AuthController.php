<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Mail\ActiveEmail;
use App\Mail\ResetPasswordEmail;
use Mail;

class AuthController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register','resetPassword','changePassword']]);

    }//end __construct()


    public function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email'    => 'required|email',
                'password' => 'required|string|min:6',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $token_validity = (24 * 60);

        $this->guard()->factory()->setTTL($token_validity);

        if (!$token = $this->guard()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);

    }//end login()


    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name'     => 'required|string|between:2,100',
                'email'    => 'required|email|unique:users',
                'password' => 'required|confirmed|min:6',
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [$validator->errors()],
                422
            );
        }

        $user = User::create(
            array_merge(
                $validator->validated(),
                ['password' => bcrypt($request->password)]
            )
        );

        if($user){
            
            $token = time()  .'_'. uniqid() . '_' . uniqid() .  '_' .  $user->email;
            $user->remember_token = $token;
            $user->save();
            Mail::to($user->email)->send(new ActiveEmail($token,$user->email));
        }

        return response()->json(['message' => 'User created successfully', 'user' => $user]);

    }//end register()


    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'User logged out successfully']);

    }//end logout()


    public function profile()
    {
        return response()->json($this->guard()->user());

    }//end profile()


    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());

    }//end refresh()


    protected function respondWithToken($token)
    {
        return response()->json(
            [
                'token'          => $token,
                'token_type'     => 'bearer',
                'token_validity' => ($this->guard()->factory()->getTTL() * 60),
            ]
        );

    }//end respondWithToken()


    protected function guard()
    {
        return Auth::guard();

    }//end guard()


    public function resetPassword(Request $request){
        $validator = Validator::make(
            $request->all(),
            [
              
                'email'    => 'required|email',
              
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [$validator->errors()],
                422
            );
        }
          $user =   User::where('email',$request->email)->first();
            if($user){
                    //send email reset password 
                    $code = rand(10000,99999);
                    $user->remember_token = $code;
                    $user->save();
                    Mail::to($user->email)->send(new ResetPasswordEmail($code));

            }else{
                //error
            }
    }

    public function changePassword(Request $request){
        $validator = Validator::make(
            $request->all(),
            [
                'code'=>'required',
                'email'    => 'required|email',
                'password' => 'required|confirmed|min:6',
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [$validator->errors()],
                422
            );
        } ;

        $user = User::where('email',$request->email)->first();
        if($user){
                   
                    if($user->remember_token == $request->code){
                                //reset password
                                $user->password =  bcrypt($request->password);
                                $user->remember_token = "";
                                $user->save();
                                return "password reset";
                    }else{
                         return   response()->json('Wrong code',401);
                    }
        }else{
           return response()->json('The email does not exist',401);
        }
    }
  



}//end class
