<?php

namespace App\Http\Controllers;

use App\Http\Resources\Comments as ResourcesComments;
use App\Models\Comments;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentsController extends Controller
{
    public function create(Request $request)
    {
        if ($request->comment_target !== $request->comment_author){
            if(Comments::create($request->all())) {
                $this->updateRating($request);
                return "Rating successfull published";
            } else {
                return "error";
            }
        }
        else{
            return "Target can't be the author";
        }
    }
    private function updateRating($request)
    {
        $user = User::find($request->comment_target);
        $user->avg_ratings = Comments::where('comment_target', '=', $request->comment_target)->get()->avg('ratings');
        $user->update();
    }

    public function getOne(Request $request)
    {
        if ($request->comment_id !== "null") {
            return Comments::find($request->comment_id);
        } else {
            return 'missing header:"comment_id"';
        }
    }

    public function getAllById($id, $number = 10) //valeur par défaut
    {
        return Comments::where('comment_target', '=', $id)->paginate($number); //paramètre => chiffre pour la pagination
    }

    public function updateOne(Request $request)
    {
        if ($request->comment_id !== "null") {
            $comment = Comments::find($request->comment_id);
            if ($comment->update($request->all())) {
                $this->updateRating($request);
                return "update successfull";
            } else {
                return "oups, something went wrong, check your body request";
            }
        } else {
            return 'missing "comment_id"';
        }
    }
    public function deleteOne(Request $request)
    {
        if (Comments::find($request->comment_id)->delete()) {
            return "Comment has been deleted";
        }
    }
}
