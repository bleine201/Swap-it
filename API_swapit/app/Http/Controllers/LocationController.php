<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{
    //

    public function cities()
    {
        return Location::all();
    }

    public function locations(Request $request)
    {
        return Location::create($request->all());
    }
}
