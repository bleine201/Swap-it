<?php

namespace App\Http\Controllers;


use App\Events\SendMessage;
use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\User;
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

        broadcast(new SendMessage($request->message,$to,$from ,User::findOrFail($to)->username))->toOthers();
        return response()->json('message sent',200); //

    
    }

    public function AuthenticatedUser(){
        return auth()->id();
    }

    public function getMessage(Request $request){
           
           return  GetMessageCollection::collection(Chat::whereIn('from', [auth()->id(), $request->user_id])->whereIn('to', [auth()->id(), $request->user_id])->get() );
    }

     public function auth(Request $request) {
        $user = $request->user();
        $socket_id = $request->socket_id;
        $channel_name = $request->channel_name;
        $pusher = new Pusher(
            config('broadcasting.connections.pusher.key'),
            config('broadcasting.connections.pusher.secret'),
            config('broadcasting.connections.pusher.app_id'),
            [
                'cluster' => config('broadcasting.connections.pusher.options.cluster'),
                'encrypted' => false
            ]
        );
        return response(
            $pusher->presence_auth($channel_name, $socket_id, $user->id)
        );
    }

    
}
