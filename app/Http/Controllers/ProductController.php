<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\UserMeta;
use App\Models\Customer;
use App\Models\Bill;
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
        $products = $request->products;
        $userMeta = UserMeta::where(['user_id'=>$userId])->first();
        $charge = $userMeta->charge;
        $total = $charge - $request->total;
        $userMeta->update([
            'charge'=>$total
        ]);
        for($i=0;$i < count($products);$i++) {
            $product = Product::create([
                'bill_id'=>$request->bill_id,
                'user_id'=>$userId,
                'name'=>$products[$i]['title'],
                'count'=>$products[$i]['count'],
                'price'=>$products[$i]['price'],
            ]);
        }

        $bill = Bill::create([
            'bill_id'=>$request->bill_id,
            'user_id'=>$userId,
            'total'=>$request->total,
            'address'=>$request->address,
        ]);

  
    
        
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
        $products = Product::where(['bill_id'=>$id])->get();
        return response()->json(['status'=>200,'products'=>$products]);
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
