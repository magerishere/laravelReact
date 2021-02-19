<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        if(Auth::check()) {
            return response()->json(['status'=>200]);
        }
        return response()->json(['status'=>400]);
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
        // $this->validate($request,[
        //     'password'=>'required|confirmed',
        // ]);
        $user = User::create([
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
        ]);
        // if($user){
        //     return redirect('/');

        // }
       
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

    public function login(Request $request) 
    {
        $email = $request->email;
        $password = $request->password;
     
        if(Auth::attempt(['email'=>$email,'password'=>$password],$request->rememberMe)) 
        {
            $request->session()->regenerate();
            return response()->json(['status'=>200]);
        } 

        return response()->json(['status'=>400]);
    }

    public function logout(Request $request) 
    {
        if(Auth::check()) 
        {
           
            Auth::logout();
            $request->session()->invalidate();

            $request->session()->regenerateToken();
            return response()->json(['status'=>200]);

        }
        return response()->json(['status'=>400]);
    }
}
