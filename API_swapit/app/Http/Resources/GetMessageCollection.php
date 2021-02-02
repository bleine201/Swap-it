<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


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
        ];
    }
}
