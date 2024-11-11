<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function getPatientAnalytics()
    {
        // Adjust the query as needed
        $analytics = DB::table('patients')
            ->select(DB::raw('DATE(sent_at) as date'), DB::raw('COUNT(*) as count'), 'user_id')
            ->groupBy(DB::raw('DATE(sent_at)'), 'user_id')
            ->get();

        return response()->json($analytics);
    }
}
