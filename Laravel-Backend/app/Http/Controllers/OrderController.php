<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Notifications\OrderReceivedNotification;

class OrderController extends Controller
{
    // public function receiveOrder($orderId)
    // {
    //     $order = Order::find($orderId);

    //     if (!$order) {
    //         return response()->json(['error' => 'Order not found.'], 404);
    //     }

    //     $patient = $order->patient; // Assuming there is a relationship between order and patient

    //     $order->status = 'received';
    //     $order->save();

    //     // Get users with the specific role
    //     $users = User::where('role', 'user')->get();

    //     // Notify each user
    //     foreach ($users as $user) {
    //         $user->notify(new OrderReceivedNotification($order, $patient));
    //     }

    //     return response()->json(['message' => 'Order received and users notified.']);
    // }
}
