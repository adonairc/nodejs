var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
			res.render('index',{
				'userlist' : docs	
			});
	});
});


router.get('/newuser',function(req,res){
	res.render('newuser',{title: 'Adicionar novo usuário'});
});


router.post('/adduser',function(req,res){
	var db = req.db;

	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function(err,doc) {
		if(err) {
			res.send("Erro ao adicionar novo usuário no banco de dados");
		}
		else{
			res.location('/');
			res.redirect('/');
		}
	});
});


router.post('/deluser',function(req,res){
	var db = req.db;

	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');

	collection.remove({
		"username" : userName,
		"email" : userEmail
	}, function(err,doc) {
		if(err) {
			res.send("Erro ao remover usuário no banco de dados");
		}
		else{
			res.location('/');
			res.redirect('/');
		}
	});
});

module.exports = router;
