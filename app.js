var express = require('express'),
    ejs = require('ejs'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static( path.join(__dirname, 'public') ));

var server = app.listen(55555, function(){
    console.log('This server is running on the port ' + this.address().port);
});

var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
    fs.readFile('lobby.html', function(err, data){
        if(err){
            res.error( {error: "error"});
        }else{
            res.send( data.toString() );
        }
    })
});

app.get('/canvas/:room', function(req,res){

    var room = req.param('room');

    fs.readFile('canvas.html', 'utf8', function(err, data){
        res.send(ejs.render(data, {
            room : room
        }))
    });
});

app.get('/room', function(req, res){
   res.send(io.sockets.rooms);
});

io.sockets.on('connection', function(socket){

    socket.on('join', function(data){
        socket.join(data);
        socket.room = data;
    });

    socket.on('draw', function(data){
        socket.to(socket.room).emit('line', data);
        //io.to(socket.room).emit('line', data);
    });

    socket.on('flush', function(){
        socket.to(socket.room).emit('flush');
    });

    socket.on('create room', function(data){
        io.sockets.emit('create room', data.toString() );
    });

    socket.on('disconnect', function(){
        //console.log('close socket');
    })
});