
var kittySchema = mongoose.Schema({
    name: String
});
  kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}
var Kitten = mongoose.model('Kitten', kittySchema);

app.get('/save', function (req, res) {
  var fluffy = new Kitten({ name: 'spike' });
  fluffy.speak();

  fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});
console.log(fluffy.name);
res.send(fluffy.name);
});

app.get('/retall', function (req, res) {
  var kittens;
  
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  this.kittens = kittens;
  console.log(kittens);
  // console.log(kittens);
});
res.send("kittens:"+this.kittens)
});

app.get('/retone', function (req, res) {
  var catname;
Kitten.find({ name: /^spike/ }, function(err, obj) {  
  this.catname = obj[0].toObject().name;
  console.log("catname in obj is: "+this.catname);                    
    console.log(obj[0].name)  // 1234          
    console.log(obj[0].toObject().name)  // 1234
});
console.log("catname is: "+this.catname);
res.send("kitten name: "+this.catname);
})


app.get('/hello', function (req, res) {

res.send('Hello World!')
})