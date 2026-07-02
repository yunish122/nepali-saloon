
    <?php

    use App\Http\Controllers\AuthController;
    use Illuminate\Support\Facades\Route;  
      use Illuminate\Support\Facades\Auth;



    Route::post('/login', [AuthController::class, 'login']);
    ?>