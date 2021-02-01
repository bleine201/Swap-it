<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use PhpParser\Builder\Function_;

// use App\Models\Product;



class ProductController extends Controller
{
    //
    public function addProducts(){
        $products = [

            ["name"=>"Phone"],
            ["name"=>"Tablet"],
            ["name"=>"laptops"],
            ["name"=>"watch"],
            ["name"=>"Television"],
            ["name"=>"Freeze"],
        ];

        return Product::insert($products);
        // return "Product has been inserted successfullyl";
    }

    // public function search(){
    //     return view('search');
    // }


   public function autocomplete(Request $request){
       $datas = Product::select("name")

               ->where("name","LIKE","%{$request->terms}%")
               ->get();
     return response()->json($datas);

   }

}
