<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\UserMeta;
use App\Models\UserCard;
use App\Models\Bill;


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
            $userId = Auth::id();
            $user = User::where(['id'=>$userId])->first();
            $userMeta = UserMeta::where(['user_id'=>$userId])->first();
            $userCard = UserCard::where(['user_id'=>$userId])->get();
            $bills = Bill::where(['user_id'=>$userId])->get();
            return response()->json(['status'=>200,"user"=>$user,'userMeta'=>$userMeta,'userCard'=>$userCard,'bills'=>$bills]);
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
       
        $user = User::create([
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
        ]);
            
            $userMeta = UserMeta::create([
                'user_id'=>$user->id,
    
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
       
     
        if($user = UserMeta::where(['user_id'=>$id])->first()) {
           $result = $user->update([
                'fname'=>$request->fname,
                'lname'=>$request->lname,
                'address'=>$request->address,
                'city'=>$request->city,
                'country'=>$request->country,
                'postalCode'=>$request->postalCode,
                'about'=>$request->about,
             
            ]);
        } else {
           $result = UserMeta::create([
                'user_id'=>$id,
                'fname'=>$request->fname,
                'lname'=>$request->lname,
                'address'=>$request->address,
                'city'=>$request->city,
                'country'=>$request->country,
                'postalCode'=>$request->postalCode,
                'about'=>$request->about,
           
            ]);
        }
        if($result) {
            return response()->json(['status'=>200]);
        }

        return response()->json(['status'=>400]);
    
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
    //login user
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
    // logout user
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
    // Change avatar image user
    public function image(Request $request)
    {
      
            $file = $request->file('image');
        
            
            $name = time() . $file->getClientOriginalName();
            
            $file->move(public_path('/images/',$name));
        
            
            $userId = Auth::id();
            $userMeta = UserMeta::where(['user_id'=>$userId])->first();
            $userMeta->update([
                'image'=>$name,
            ]);
            return response()->json(['status'=>200,'image'=>$request->file('image')]);
        
    }
    // Change password User
    public function setting(Request $request)
    {
        $userId = Auth::id();
        $user = User::where(['id'=>$userId])->first();
        if(Auth::attempt(['email'=>$user->email,'password'=>$request->currentPassword])) 
        {
            $user->update([
                'password'=>bcrypt($request->newPassword),
            ]);
            return response()->json(['status'=>200]);

        }
        return response()->json(['status'=>400]);

    }
    // Store Card from customer
    public function card(Request $request)
    {   
        $userId = Auth::id();
        $card = UserCard::create([
            'user_id'=>$userId,
            'name'=>$request->nameCard,
            'number'=>$request->numberCard,
            'cvv2'=>$request->cvv2Card,
            'month'=>$request->monthCard,
            'year'=>$request->yearCard,
        ]);

        if($card) {
            return response()->json(['status'=>200]);

        }
        return response()->json(['status'=>400]);


    }

    // charge account user
    public function charge(Request $request)
    {
        $userId = Auth::id();
        $userMeta = UserMeta::where(['user_id'=>$userId])->first();
        $charge = $userMeta->charge;
        $userMeta->update([
            'charge'=>$request->charge + $charge,
        ]);
        return response()->json(['status'=>200]);
    }

    public function cardDelete(Request $request) 
    {
        foreach($request->deleteList as $id) 
        {
            UserCard::where(['id'=>$id])->delete();
        }
        return response()->json(['status'=>200]);
    }
}
