var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/form', function(req, res, next) { 
res.render('users'); 
});


// ^ INSERT DATA INTO THE TABLE
router.post('/create', function(req, res, next) {
  
  // store all the user input data
  const userDetails=req.body;
 
  // insert user data into users table
  var sql = 'INSERT INTO users SET ?';
  db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully "); 
  });
 res.redirect('/users/user-list');  // redirect to user form page after inserting the data

}); 

// ^ GET DATA FROM THE TABLE
router.get('/user-list', function(req, res, next) {
    var sql='SELECT * FROM users';
    
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  });
});

// TODO EDIT DATA FROM THE TABLE
// write here create & display data script
router.get('/edit/:id', function(req, res, next) {
      var UserId= req.params.id;
      var sql=`SELECT * FROM users WHERE id=${UserId}`;
      db.query(sql, function (err, data) {
        if (err) throw err;
       
        res.render('users', { title: 'User List', editData: data[0]});
      });
});
router.post('/edit/:id', function(req, res, next) {
  var id= req.params.id;
    var updateData=req.body;
    var sql = `UPDATE users SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/users/user-list');
});


// ^ DELETE FROM TABLE
router.get('/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/users/user-list');
  
});

module.exports = router;