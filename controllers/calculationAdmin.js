var Criteria = require("../models/criteriaModel");
var Course = require("../models/courseModel");

exports.calculateAdmin = async (req, res) => {
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