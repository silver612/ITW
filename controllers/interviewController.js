const Interview = require('../models/Interview');


module.exports.interviews_get =  (req,res) =>{
    Interview.find().sort({year:-1})
      .then((result) =>{
        res.render('interviews/interview-list', {title: "All Interviews", interviews: result});
      })
      .catch((err) =>{
        console.log(err);
      });
};

module.exports.interviews_post = (req,res) =>{
    const interview = new Interview(req.body);
    interview.save()
    .then((result) =>{
      res.redirect('/interviews');
    })
    .catch((err) =>{
      console.log(err);
    });
};

module.exports.interviews_share_get = (req,res) =>{
    res.render('interviews/interview-share', {title:'Share your experience'});
};

module.exports.interviews_details_get =  (req,res) =>{
    const Id = req.params.id;
    Interview.findById(Id)
    .then(result =>{
    //res.render("404",{title:'test'}); 
        res.render("interviews/details", {interview:result, title:"Interview details"});
    })
    .catch((err) =>{
        console.log(err);
    });
};

module.exports.interviews_details_delete = (req,res) =>{
    const Id = req.params.id;
    Interview.findByIdAndDelete(Id)
    .then(result =>{
        res.json({ redirect: '/interviews' });
    })
    .catch((err) =>{
        console.log(err);
    });
};