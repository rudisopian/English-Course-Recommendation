var Criteria = require('../models/criteriaModel')
var Subcriteria = require('../models/subcriteriaModel')
var Course = require('../models/courseModel')

// create and save new course
exports.calculate = async (req,res)=>{
    // validate request
  var criterias = await Criteria.find();
  Course.find()
            .populate('listeningId readingId spokenInteractionId spokenProductionId writingId')
            .populate({
                path : 'listeningId readingId spokenInteractionId spokenProductionId writingId',
                populate : 'criteriaId'
            })
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found course with id "+ id})
                }else{
                    var arr_listening = []
                    var norm_listening = []
                    var max_listening = 0
                    var pref_listening = []
                    var arr_reading= []
                    var norm_reading = []
                    var max_reading = 0
                    var pref_reading = []
                    var arr_si= []
                    var norm_si = []
                    var max_si = 0
                    var pref_si = []
                    var arr_sp= []
                    var norm_sp = []
                    var max_sp = 0
                    var pref_sp= []
                    var arr_w= []
                    var norm_w = []
                    var max_w = 0
                    var pref_w = []
                    var w_listening = 0
                    var w_reading = 0
                    var w_si = 0
                    var w_sp = 0
                    var w_w = 0
                    var arr_v = []
                    // Training Data
                    for(var i in data){
                        // COPY TO ARRAY
                        arr_listening.push(data[i].listeningId.weight)
                        arr_reading.push(data[i].readingId.weight)
                        arr_si.push(data[i].spokenInteractionId.weight)
                        arr_sp.push(data[i].spokenProductionId.weight)
                        arr_w.push(data[i].writingId.weight)
                    }
                    // GET MAX EACH CRITERIA
                    max_listening = Math.max(...arr_listening);
                    max_reading = Math.max(...arr_reading);
                    max_si = Math.max(...arr_si);
                    max_sp = Math.max(...arr_sp);
                    max_w = Math.max(...arr_w);
                    // CALCULATE NORMALISATION
                    for(var i in data){
                        // COPY TO ARRAY
                        norm_listening.push(arr_listening[i]/max_listening)
                        norm_reading.push(arr_reading[i]/max_reading)
                        norm_si.push(arr_si[i]/max_si)
                        norm_sp.push(arr_sp[i]/max_sp)
                        norm_w.push(arr_w[i]/max_w)
                        // GET WEIGHT OF CRITERIA
                        w_listening = data[i].listeningId.criteriaId.weight
                        w_reading = data[i].readingId.criteriaId.weight
                        w_si = data[i].spokenInteractionId.criteriaId.weight
                        w_sp = data[i].spokenProductionId.criteriaId.weight
                        w_w = data[i].writingId.criteriaId.weight
                        // Calculate Preference
                        pref_listening.push(norm_listening[i]*w_listening)
                        pref_reading.push(norm_reading[i]*w_reading)
                        pref_si.push(norm_si[i]*w_si)
                        pref_sp.push(norm_sp[i]*w_sp)
                        pref_w.push(norm_w[i]*w_w)
                        // calculate v
                        arr_v.push(pref_listening[i]+pref_reading[i]+pref_si[i]+pref_sp[i]+pref_w[i])
                    }
                    // Data User 
                    var norm_listening_user = 0
                    var norm_reading_user = 0
                    var norm_si_user = 0
                    var norm_sp_user = 0
                    var norm_w_user = 0
                    var p_listening_user = 0
                    var p_reading_user = 0
                    var p_si_user = 0
                    var p_sp_user = 0
                    var p_w_user = 0
                    var arr_v_user = 0
                    norm_listening_user = req.body.listening/max_listening
                    norm_reading_user = req.body.reading/max_reading
                    norm_si_user = req.body.si/max_si
                    norm_sp_user = req.body.sp/max_sp
                    norm_w_user = req.body.w/max_w 
                    p_listening_user = norm_listening_user * w_listening
                    p_reading_user = norm_reading_user * w_reading
                    p_si_user = norm_si_user * w_si
                    p_sp_user = norm_sp_user * w_sp
                    p_w_user = norm_w_user * w_w
                    arr_v_user = p_listening_user+p_reading_user+p_si_user+p_sp_user+p_w_user
                    console.log(arr_v_user);
                    // Matching
                    // IF NGGAK ADA DATA YG COCOK MAKA PAKAI RANGE 
                    // IF COCOK Langsung keluarin COURSE NYA
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving course with id "})
            })
}

