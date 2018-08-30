// Assuming u are sending a new todo everytime you update
// todo = {
// 	text:'isdbdsdbsd',
// 	isCompleted:true
// }

route.put('todo', function(req, res){
	if(!req.body._id){ res.json({success:false, error:'Invalid data'}) }
	else if(!req.body.todo){ res.json({success:false, error:'Invalid data'}) }
	else{
		model.update({_id:req.body._id}, 
			$set{
				text:req.body.todo.text,
				isCompleted:req.body.todo.isCompleted
			},{}, function(err, result){
				// same as i sent
			})
	}
})