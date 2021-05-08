<?php

namespace App\Http\Controllers;

use App\Models\OptionSurvey;
use Illuminate\Http\Request;
use App\Models\Survey;
use Illuminate\Support\Facades\Validator;

class SurveyController extends Controller
{
    public function index()
    {
        $dateNow = date(DATE_W3C);

        $futureSurvey = Survey::where('initiated_at', '>', $dateNow)->get();
        $endSurvey = Survey::where('ended_at', '<', $dateNow)->get();
        $activeSurvey = Survey::where('ended_at', '>', $dateNow)->where('initiated_at', '<', $dateNow)->get();

        $allSurvey = json_encode([
            'future' => $futureSurvey,
            'ended' => $endSurvey,
            'active' => $activeSurvey,
        ]);

        return $allSurvey;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'initiated_at' => 'required',
            'ended_at' => 'required',
            'option' => 'array|min:3',
        ], [
            'title.required' => 'O campo título é obrigatório!',
            'initiated_at.required' => 'O campo data inicial é obrigatório!',
            'ended_at.required' => 'O campo de data final é obrigatório!',
            'option.min' => 'Devem ter no mínimo 3 opções!',
        ]);

        $errors = $validator->errors();

        if ($errors) {
            foreach ($errors->all() as $message) {
                return response()->json([
                    "type" => "error",
                    "message" => $message,
                ], 400);
            }
        }

        foreach ($request->input('option') as $opt) {
            if ($opt == "") {
                return response()->json([
                    "type" => "error",
                    "message" => "O nome da opção é obrigatório!",
                ], 400);
            }
        }

        $survey = Survey::create([
            'title' => $request->input('title'),
            'initiated_at' => $request->input('initiated_at'),
            'ended_at' => $request->input('ended_at'),
        ]);

        foreach ($request->input('option') as $opt) {
            OptionSurvey::create([
                "survey_id" => $survey->id,
                "title" => $opt,
            ]);
        }

        return response()->json([
            "type" => "success",
            "message" => "Enquete criada com sucesso!"
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'initiated_at' => 'required',
            'ended_at' => 'required',
            'option' => 'array|min:3',
        ], [
            'title.required' => 'O campo título é obrigatório!',
            'initiated_at.required' => 'O campo data inicial é obrigatório!',
            'ended_at.required' => 'O campo de data final é obrigatório!',
            'option.min' => 'Devem ter no mínimo 3 opções!',
        ]);

        $errors = $validator->errors();

        if ($errors) {
            foreach ($errors->all() as $message) {
                return response()->json([
                    "type" => "error",
                    "message" => $message,
                ], 400);
            }
        }

        foreach ($request->input('option') as $opt) {
            if ($opt == "") {
                return response()->json([
                    "type" => "error",
                    "message" => "O nome da opção é obrigatório!",
                ], 400);
            }
        }

        $survey = Survey::findOrFail($id);
        
        $survey->update([
            'title' => $request->input('title'),
            'initiated_at' => $request->input('initiated_at'),
            'ended_at' => $request->input('ended_at'),
        ]);

        return response()->json([
            "type" => "success",
            "message" => "Enquete editada com sucesso!"
        ], 200);
    }

    public function show($id)
    {
        $dateNow = date(DATE_W3C);

        $optionSurvey = OptionSurvey::where('survey_id', $id)->get();
        $surveyData = Survey::findOrFail($id);

        if ($surveyData->initiated_at > $dateNow) {
            $status = 'future';
        } else if ($surveyData->ended_at < $dateNow) {
            $status = 'ended';
        } else {
            $status = 'active';
        }

        $json = json_encode([
            'survey' => $surveyData,
            'options' => $optionSurvey,
            'status' => $status,
        ]);

        return $json;
    }

    public function destroy($id)
    {
        $survey = Survey::findOrFail($id);
        $survey->delete();

        return response()->json([
            "type" => "success",
            "message" => "Enquete excluída com sucesso!"
        ], 200);
    }
}
