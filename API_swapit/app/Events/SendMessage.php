<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */

    public $message;
    public $to;
    public $from;
    public $username;

    public function __construct($message,$to,$from,$username)
    {
        $this->to = $to;
        $this->message = $message;
        $this->from = $from;
        $this->username = $username;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */


//     public function broadcastAs()
// {
//     return 'ChatMessages.' . $this->to;
// }


    public function broadcastOn()
    {
       return  new Channel('ChatMessages.' .  $this->to);
        // return new PrivateChannel('ChatMessages.' . $this->to);
    }
}
