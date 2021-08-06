var Criteria = require("../models/criteriaModel");
var Course = require("../models/courseModel");

exports.calculate = async (req, res) => {
  Course.find()
    .populate(
      "listeningId readingId spokenInteractionId spokenProductionId writingId"
    )
    .populate({
      path: "listeningId readingId spokenInteractionId spokenProductionId writingId",
      populate: "criteriaId",
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found course with id " + id });
      } else {
        var arr_listening = [];
        var arr_reading = [];
        var arr_spokenInteraction = [];
        var arr_spokenProduction = [];
        var arr_writing = [];

        var norm_listening = [];
        var norm_reading = [];
        var norm_spokenInteraction = [];
        var norm_spokenProduction = [];
        var norm_writing = [];

        var max_listening = 0;
        var max_reading = 0;
        var max_spokenInteraction = 0;
        var max_spokenProduction = 0;
        var max_writing = 0;

        var pref_listening = [];
        var pref_reading = [];
        var pref_spokenInteraction = [];
        var pref_spokenProduction = [];
        var pref_writing = [];

        var weight_listening = 0;
        var weight_reading = 0;
        var weight_spokenInteraction = 0;
        var weight_spokenProduction = 0;
        var weight_writing = 0;

        var arr_v = [];

        // Training Data
        for (var i in data) {
          // COPY TO ARRAY
          arr_listening.push(data[i].listeningId.weight);
          arr_reading.push(data[i].readingId.weight);
          arr_spokenInteraction.push(data[i].spokenInteractionId.weight);
          arr_spokenProduction.push(data[i].spokenProductionId.weight);
          arr_writing.push(data[i].writingId.weight);
        }
        // GET MAX EACH CRITERIA
        max_listening = Math.max(...arr_listening);
        max_reading = Math.max(...arr_reading);
        max_spokenInteraction = Math.max(...arr_spokenInteraction);
        max_spokenProduction = Math.max(...arr_spokenProduction);
        max_writing = Math.max(...arr_writing);
        // CALCULATE NORMALISATION
        for (var i in data) {
          // COPY TO ARRAY
          norm_listening.push(arr_listening[i] / max_listening);
          norm_reading.push(arr_reading[i] / max_reading);
          norm_spokenInteraction.push(arr_spokenInteraction[i] / max_spokenInteraction);
          norm_spokenProduction.push(arr_spokenProduction[i] / max_spokenProduction);
          norm_writing.push(arr_writing[i] / max_writing);
          // GET WEIGHT OF CRITERIA
          weight_listening = data[i].listeningId.criteriaId.weight;
          weight_reading = data[i].readingId.criteriaId.weight;
          weight_spokenInteraction = data[i].spokenInteractionId.criteriaId.weight;
          weight_spokenProduction = data[i].spokenProductionId.criteriaId.weight;
          weight_writing = data[i].writingId.criteriaId.weight;
          // Calculate Preference
          pref_listening.push(norm_listening[i] * weight_listening);
          pref_reading.push(norm_reading[i] * weight_reading);
          pref_spokenInteraction.push(norm_spokenInteraction[i] * weight_spokenInteraction);
          pref_spokenProduction.push(norm_spokenProduction[i] * weight_spokenProduction);
          pref_writing.push(norm_writing[i] * weight_writing);
          // calculate v
          arr_v.push(
            pref_listening[i] +
            pref_reading[i] +
            pref_spokenInteraction[i] +
            pref_spokenProduction[i] +
            pref_writing[i]
          );
        }
        //res.send({ norm_data : x, pref_data: x, arr_v : arr)v })
        res.send({norm_listening, norm_reading, norm_spokenInteraction, norm_spokenProduction, norm_writing})
      }
    })
}

exports.calculateUser = async (req, res) => {
  // validate request
  Course.find()
    .populate(
      "listeningId readingId spokenInteractionId spokenProductionId writingId"
    )
    .populate({
      path: "listeningId readingId spokenInteractionId spokenProductionId writingId",
      populate: "criteriaId",
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found course with id " + id });
      } else {
        var arr_listening = [];
        var arr_reading = [];
        var arr_spokenInteraction = [];
        var arr_spokenProduction = [];
        var arr_writing = [];

        var norm_listening = [];
        var norm_reading = [];
        var norm_spokenInteraction = [];
        var norm_spokenProduction = [];
        var norm_writing = [];

        var max_listening = 0;
        var max_reading = 0;
        var max_spokenInteraction = 0;
        var max_spokenProduction = 0;
        var max_writing = 0;

        var pref_listening = [];
        var pref_reading = [];
        var pref_spokenInteraction = [];
        var pref_spokenProduction = [];
        var pref_writing = [];

        var weight_listening = 0;
        var weight_reading = 0;
        var weight_spokenInteraction = 0;
        var weight_spokenProduction = 0;
        var weight_writing = 0;

        var arr_v = [];

        // Training Data
        for (var i in data) {
          // COPY TO ARRAY
          arr_listening.push(data[i].listeningId.weight);
          arr_reading.push(data[i].readingId.weight);
          arr_spokenInteraction.push(data[i].spokenInteractionId.weight);
          arr_spokenProduction.push(data[i].spokenProductionId.weight);
          arr_writing.push(data[i].writingId.weight);
        }
        // GET MAX EACH CRITERIA
        max_listening = Math.max(...arr_listening);
        max_reading = Math.max(...arr_reading);
        max_spokenInteraction = Math.max(...arr_spokenInteraction);
        max_spokenProduction = Math.max(...arr_spokenProduction);
        max_writing = Math.max(...arr_writing);
        // CALCULATE NORMALISATION
        for (var i in data) {
          // COPY TO ARRAY
          norm_listening.push(arr_listening[i] / max_listening);
          norm_reading.push(arr_reading[i] / max_reading);
          norm_spokenInteraction.push(arr_spokenInteraction[i] / max_spokenInteraction);
          norm_spokenProduction.push(arr_spokenProduction[i] / max_spokenProduction);
          norm_writing.push(arr_writing[i] / max_writing);
          // GET WEIGHT OF CRITERIA
          weight_listening = data[i].listeningId.criteriaId.weight;
          weight_reading = data[i].readingId.criteriaId.weight;
          weight_spokenInteraction = data[i].spokenInteractionId.criteriaId.weight;
          weight_spokenProduction = data[i].spokenProductionId.criteriaId.weight;
          weight_writing = data[i].writingId.criteriaId.weight;
          // Calculate Preference
          pref_listening.push(norm_listening[i] * weight_listening);
          pref_reading.push(norm_reading[i] * weight_reading);
          pref_spokenInteraction.push(norm_spokenInteraction[i] * weight_spokenInteraction);
          pref_spokenProduction.push(norm_spokenProduction[i] * weight_spokenProduction);
          pref_writing.push(norm_writing[i] * weight_writing);
          // calculate v
          arr_v.push(
            pref_listening[i] +
            pref_reading[i] +
            pref_spokenInteraction[i] +
            pref_spokenProduction[i] +
            pref_writing[i]
          );
        }

        // Data User
        var norm_listening_user = 0;
        var norm_reading_user = 0;
        var norm_si_user = 0;
        var norm_sp_user = 0;
        var norm_w_user = 0;
        var p_listening_user = 0;
        var p_reading_user = 0;
        var p_si_user = 0;
        var p_sp_user = 0;
        var p_w_user = 0;
        var arr_v_user = 0;
        norm_listening_user = req.body.listening / max_listening;
        norm_reading_user = req.body.reading / max_reading;
        norm_si_user = req.body.spokenInteraction / max_spokenInteraction;
        norm_sp_user = req.body.spokenProduction / max_spokenProduction;
        norm_w_user = req.body.writing / max_writing;
        p_listening_user = norm_listening_user * weight_listening;
        p_reading_user = norm_reading_user * weight_reading;
        p_si_user = norm_si_user * weight_spokenInteraction;
        p_sp_user = norm_sp_user * weight_spokenProduction;
        p_w_user = norm_w_user * weight_writing;
        arr_v_user =
        p_listening_user + p_reading_user + p_si_user + p_sp_user + p_w_user;
        // Matching
        res.send(getResult(arr_v,arr_v_user,data))
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error " });
    });
};

function getResult(arr_v,arr_v_user,data){
      var result = []
       for(var i in arr_v){
         if(arr_v[i] == arr_v_user){
           result.push(data[i]);
         }
       }
        // IF NGGAK ADA DATA YG COCOK MAKA PAKAI RANGE
        if(result.length > 0){
          return result;
        }else{
        // IF COCOK Langsung keluarin COURSE NYA
        var sorted_arr = [...arr_v]
        // sorting
        sorted_arr.sort((a, b) => a - b)
        var res_greater_arr = []
        var res_lower_arr = []
        var res_greater= 0
        var res_lower = 0
        for(var i in sorted_arr){
          if(sorted_arr[i] >= arr_v_user){
            res_greater_arr.push(sorted_arr[i]);
          }
          if(sorted_arr[i] <= arr_v_user){
            res_lower_arr.push(sorted_arr[i])
          }
        }
        res_greater = res_greater_arr[0]
        res_lower = res_lower_arr[res_lower_arr.length-1]
        var final_result_arr = []
        final_result_arr.push(data[arr_v.indexOf(res_greater)]);
        final_result_arr.push(data[arr_v.indexOf(res_lower)]);
        return final_result_arr
          
      }
}
