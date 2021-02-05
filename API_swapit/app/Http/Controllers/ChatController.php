<?php

namespace App\Http\Controllers;


use App\Events\SendMessage;
use Illuminate\Http\Request;
use App\Models\Chat;
use App\Http\Resources\GetMessageCollection;
class ChatController extends Controller 
{


    public function SendMessage(Request $request){
            $from = auth()->id();
            $to = $request->to;
            Chat::create([
                'to'=>$to,
                'from'=>$from,
                'message'=>$request->message
            ]);

        broadcast(new SendMessage($request->message,$to));
        return response()->json('message sent',200); //

    
    }

    public function AuthenticatedUser(){
        return auth()->id();
    }

    public function getMessage(Request $request){
           
           return  GetMessageCollection::collection(Chat::whereIn('from', [auth()->id(), $request->user_id])->whereIn('to', [auth()->id(), $request->user_id])->get() );
    }
}
