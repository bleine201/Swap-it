<?php

namespace App\Http\Controllers;

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
        $request->validate([
            'images' => 'required',
        ]);

        if ($request->hasFile('images')) {
            $image = $request->file('images');

            //foreach($images as $image) {
                $name = $image->getClientOriginalName();
                $path = $image->storeAs('uploads', $name, 'public');

                Image::create([
                    'name' => $name,
                    'path' => '/storage/'.$path
                  ]);
            //}
        } else {
            return response()->json(['Failure'], 400);
        }
        return response()->json(['Images uploaded successfully'], 200);
    }

    //Get image by ad ib
    public function post(Request $request)
    {
        return Ad::where('images_id', $request->id)->get();
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

    public function getPubliclyStorgeFile($filename)

    {
        $path = storage_path('public/storage/uploads'. $filename);
        if (!File::exists($path)) {
            abort(404);
        }
        $file = File::get($path);
        $type = File::mimeType($path);
        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);
        return $response;

    }
}
