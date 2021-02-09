<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;
use App\Models\Ad;
use App\Models\Image;
use File;

class ImageController extends Controller
{
    //Get all images
    public function images()
    {
        return Image::all();
    }

    //Store all image upload
    public function upload(Request $request)
    {
        $validation = Validator::make($request->all(),
        [
            'image'=>'required|mimes:jpeg,jpg,png,gif|max:10000'
        ]);

        if ($validation->fails()){
            $response=array('status'=>'error','errors'=>$validation->errors()->toArray());  
            return response()->json($response);
        }

     if($request->hasFile('image')){

        $image = $request->file('image');
        $uniqueid=uniqid();
        $original_name=$request->file('image')->getClientOriginalName(); 
        $size=$request->file('image')->getSize();
        $extension=$request->file('image')->getClientOriginalExtension();

        $name=$image->getClientOriginalName();
        $path=$image->storeAs('public/upload',$name);
        $articleId=$request->ads_id;

        Image::create([
            'name' => $name,
            'path' => $path,
            'ads_id' =>$articleId,
          ]);
          
        if($path){
            return response()->json(array('status'=>'success','message'=>'Image successfully uploaded','image'=>'/storage/uploads/'.$name));
        }else{
            return response()->json(array('status'=>'error','message'=>'failed to upload image'));
        }
    }
    }

    //Get image by ad ib
    public function post(Request $request)
    {
        return Ad::where('images_id', $request->id)->get();
    }

    public function picture($id)
    {
        return Image::find($id);
    }

    //Update images
    public function update(Request $request, $id)
    {
        $images = Image::find($id);
        $images->update($request->all());
        return $images;
    }

    //Delete images
    public function delete($id)
    {
        return Image::destroy($id);
    }

}
