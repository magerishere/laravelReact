<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderShipped;
use App\Models\Bill;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
          
        $products = $request->products;
        $name = $request->name;
        $email = $request->email;
        $address = $request->address;
        $customer = Customer::create([
            'name'=>$name,
            'email'=>$email,
            'address'=>$address,
        ]);
        for($i=0;$i < count($products);$i++)
        {
            $product = Product::create([
                'bill_id'=>$request->bill_id,
                'user_id'=>$customer->id,
                'name'=>$products[$i]['title'],
                'count'=>$products[$i]['count'],
                'price'=>$products[$i]['price'],
            ]);
        }
        $bill = Bill::create([
            'bill_id'=>$request->bill_id,
            'user_id'=>$customer->id,
            'total'=>0,
            'address'=>$address,
        ]);

        // Mail::to('immagerishere@gmail.com')->send(new OrderShipped());
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
