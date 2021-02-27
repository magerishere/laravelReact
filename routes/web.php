<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Models\User;
use App\Models\UserMeta;
use Illuminate\Http\Request;
use App\Http\Controllers\CustomerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/user',UserController::class);
Route::post('/user/login',[UserController::class,'login']);
Route::post('/user/logout',[UserController::class,'logout']);
Route::resource('/product',ProductController::class);
Route::post('/user/image',[UserController::class,'image']);
Route::post('/user/setting',[UserController::class,'setting']);
Route::post('/user/card',[UserController::class,'card']);
Route::post('/user/charge',[UserController::class,'charge']);
Route::post('/user/card/delete',[UserController::class,'cardDelete']);
Route::resource('/customer',CustomerController::class);

Route::get('/dashboard',function(){
    return view('dashboard');
});
Route::get('/charge',function(){
    return view('dashboard');
});
Route::get('/setting',function(){
    return view('dashboard');
});
Route::get('/profile',function(){
    return view('dashboard');
});
Route::get('/register',function(){
    return view('welcome');
});
Route::get('/login',function(){
    return view('welcome');
});






Route::get('/tested',function(){
    return view('tested');
});

Route::post('/tested',function(Request $request){
    if($file = $request->file('image')) {
        $name = time() . $file->getClientOriginalName();
     
        $file->move(public_path('/images/'),$name);
        return $file->getClientOriginalExtension();
     
        // return response()->json(['status'=>200]);
    }
});