require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const Parent = require("./data-models/parent.js");
const Child = require("./data-models/child.js");
const app = express();
const PORT = process.env.PORT || 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

io.on('connection',function(socket){

    console.log("connection made")
    socket.on('getParents',function(){

        Parent.selectAll(function(parentData){

            Child.select(function(childData){

                for(var i = 0; i < parentData.length; i++){
                    parentData[i].childrenData = [];

                    for(var x = 0; x < childData.length; x++){
                        if(parentData[i].parent_id === childData[x].parent_id){

                            parentData[i].childrenData.push({
                                child_number: childData[x].child_number
                            });
                            //console.log(parentData[i])
                        }
                    }
                }
                io.emit('getParents',parentData);
            });
        });
    })
    socket.on('addParent',function(parent){

        Parent.createParent(["parent_name"],[parent],function(result){

            Parent.selectAll(function(parentData){

                Child.select(function(childData){

                    for(var i = 0; i < parentData.length; i++){
                        parentData[i].childrenData = [];

                        for(var x = 0; x < childData.length; x++){

                            if(parentData[i].parent_id === childData[x].parent_id){
                                parentData[i].childrenData.push({
                                    child_number: childData[x].child_number
                                });
                            }
                        }
                    }

                    io.emit('getParents',parentData);
                });
            });
        });
    })
    socket.on('deleteParent', function(parentID){

        Child.deleteChildren(["parent_id"], [parentID], function(result){

            Parent.deleteParent(["parent_id"], parentID, function(result){

                Parent.selectAll(function(parentData){

                    Child.select(function(childData){
                        for(var i = 0; i < parentData.length; i++){

                            parentData[i].childrenData = [];
                            for (var j = 0; j < childData.length; j++){

                                if(parentData[i].parent_id === childData[j].parent_id){

                                    parentData[i].childrenData.push({
                                        child_number: childData[j].child_number
                                    });
                                }
                            }
                        }

                        io.emit('getParents',parentData);
                    });
                });
            });
        });
    });
    socket.on('updateParentName', function(parent, parentID){

        Parent.updateParentName(parent, `parent_id = ${parentID}`, function(data){

            Parent.selectAll(function(parentData){

                Child.select(function(childData){

                    for (var i = 0; i < parentData.length; i++){

                        parentData[i].childrenData = [];
                        for (var j = 0; j < childData.length; j++){
                            
                            if (parentData[i].parent_id === childData[j].parent_id){

                                parentData[i].childrenData.push({
                                    child_number: childData[j].child_number
                                });
                            }
                        }
                    }
                    io.emit('getParents', parentData)
                });
            });
        });
    });
    socket.on('createChildren', function(parentID, rangeLowerBound, rangeUpperBound, numChildren){
        Child.deleteChildren(["parent_id"], [parentID], function(result) {

            var min = Math.ceil(rangeLowerBound);
            var max = Math.floor(rangeUpperBound);
            var body = [];

            for (var i = 0; i < numChildren; i++) {

                var randomChildren = Math.floor(Math.random() * (max - min + 1)) + min;
                body.push([parentID,randomChildren]);
            }
            //console.log(body)
            Parent.updateFactories({ "parent_lower_bound": rangeLowerBound, "parent_upper_bound": rangeUpperBound, "children": numChildren }, `parent_id = ${parentID}`, function(result) {

                Child.insertFactory(["parent_id", "child_number"], body, function(result){
                    
                    Parent.selectAll(function(parentData){
                        
                        Child.select(function(childData){
                            
                            for (var i = 0; i < parentData.length; i++){
                                
                                parentData[i].childrenData = [];
                                for (var j = 0; j < childData.length; j++) {
                                    
                                    if (parentData[i].parent_id === childData[j].parent_id) {
                                        
                                        parentData[i].childrenData.push({
                                            child_number: childData[j].child_number
                                        });
                                        //console.log(parentData[i].childrenData)
                                    }
                                    
                                }
                                
                            }
                            
                            io.emit('getParents', parentData);
                            //console.log(parentData)
                        });
                    });
                });
            });
        });
    });
    socket.on('disconnect',function(){
        console.log('connection dropped');
    });
});
// Listener
http.listen(PORT,function(){
    console.log(`App now listening at localhost: ${PORT}`);
});
