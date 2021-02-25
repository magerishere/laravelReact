<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Models\User;
use App\Models\UserMeta;
use Illuminate\Http\Request;


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


Route::get('/dashboard',function(){
    return view('dashboard');
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