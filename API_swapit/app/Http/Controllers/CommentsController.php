<?php

namespace App\Http\Controllers;

use App\Http\Resources\Comments as ResourcesComments;
use App\Models\Comments;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentsController extends Controller
{
    public function create(Request $request){
        if (Comments::create([ 
            'comment_author' => $request->comment_author,
            'comment_target' => $request->comment_target,
            'content' => $request->content,
            'ratings' => $request->ratings,
        ])) {
            $user = User::find($request->comment_target);
            $user->avg_ratings = Comments::where('comment_target', '=', $request->comment_target)->get()->avg('ratings');
            $user->update();
            return "Rating successfull published";
        } else {
            return "error";
        }
    }

    public function getOne(Request $request)
    {
        if ($request->comment_id !== "null") {
            return Comments::find($request->comment_id);
        } else {
            return 'missing header:"comment_id"';
        }
    }
    public function getAllById($id,$number=10)//valeur par défaut
    {
        return Comments::where('comment_target', '=', $id)->paginate($number); //paramètre => chiffre pour la pagination
    }
}
