<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\UserMeta;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $user = Auth::user();
        $products = $user->product()->get();
        return response()->json(['status'=>200,'products'=>$products]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $userId = Auth::id();
        $data = $request->products;
        $userMeta = UserMeta::where(['user_id'=>$userId])->first();
        $charge = $userMeta->charge;
        $total = $charge - $request->total;
        $userMeta->update([
            'charge'=>$total
        ]);
        for($i=0;$i < count($data);$i++) {
            $product = Product::create([
                'user_id'=>$userId,
                'name'=>$data[$i]['title'],
                'count'=>$data[$i]['count'],
                'price'=>$data[$i]['price'],
            ]);
        }

        
        return response()->json(['status'=>200]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
