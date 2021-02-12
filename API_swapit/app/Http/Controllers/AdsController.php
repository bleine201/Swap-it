<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ad;
use App\Models\Category;
use App\Models\Condition;

class AdsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Ad::all();
        // return Ad::all()->paginate(5);
    }

    public function adsAdmin()
    {
        return Ad::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Ad::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Ad::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $ads = Ad::find($id);
        $ads->update($request->all());
        return $ads;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Ad::destroy($id);
    }

   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function categories(Request $request) {
        return Category::all();
    }

    public function CatCreate(Request $request)
    {
        return Category::create($request->all());
    }
    //FILTER SECTION

        //CATEGORY

     /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function CatById(Request $request)
    {
        return Ad::where('category_id', $request->id)->get();
    }

        //CONDITION

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function conditions(Request $request) {
        return Condition::all();
    }

    public function CondCreate(Request $request)
    {
        return Condition::create($request->all());
    }

     /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function CondById(Request $request)
    {
        return Ad::where('condition_id', $request->id)->get();
    }
    public function search($name){

        return Ad::where('title',"like","%".$name."%")->get();

   }
   public function userAds(Request $request){
       return Ad::where('user_id', $request->id)->get();
   }
}

