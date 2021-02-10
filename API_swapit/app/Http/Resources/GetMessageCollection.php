<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;


class GetMessageCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'to'=>$this->to,
            'from'=>$this->from,
            'message'=>$this->message,  
            'is_my_message'=>$this->from == auth()->id() ? true : false,
            'created_at'=>Carbon::createFromFormat('Y-m-d H:i:s',$this->created_at)->diffForHumans()
        
        ];    }
}
