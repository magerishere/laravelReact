<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Models\User;
use App\Models\UserMeta;

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
Route::get('/dashboard',function(){
    return view('dashboard');
});


Route::get('/tested',function(){
    return view('tested');
});

Route::post('/ajab',function(){
    // $userId = Auth::id();
    $userMetaCheck = UserMeta::where(['user_id'=>1])->first();
    if($userMetaCheck) {
        // $userMeta = $userMetaCheck
        return $userMetaCheck;
    } else {
        return 'nothing';
    }
});