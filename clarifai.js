var _ = require('lodash');
var fs = require('fs');

// Require the client
var Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  'YOUR_CLARIFAI_CLIENT_ID',
  'YOUR_CLARIFAI_CLIENT_SECRET'
);


// function to encode file data to base64 encoded string
function load_and_base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


var image = null;
var word = null;

//Get the argument from the command line
if(process.argv.length < 4){
    console.error("You must specify a URL or image filename; and a word to search as arguments.\n\nUsage: node clarifai.js <url> <word_to_search>");
    process.exit(1);
} else {
    var arg = process.argv[2];

    var isUrl = _.startsWith(arg, "http://") || _.startsWith(arg, "https://");
    if(!isUrl) //Not a url, load the file up into base64
        image = load_and_base64_encode(arg);
    else
        image = arg;

    var word = process.argv[3]
}


if(!image || !word){
    console.log("Image: " + image);
    console.log("Word: " + word);

    console.error("IT'S WROOOONG!!!");
    process.exit(1);
}

app.models.predict(Clarifai.GENERAL_MODEL, image).then(
    function(response) {

        var bigWord = _.toUpper(word);
        var data = response.outputs[0].data;

        if(_.has(data, 'concepts'))
            data = data.concepts;

        var words = _.invokeMap(data, function(){return this.name;}) 

        var matches = _.includes(words, word);

        if(matches)
            console.log("IT'SA " + bigWord + "!!");
        else{
            console.log("IT'SA NOT'A " + bigWord + "!!");
            console.log("DA WORDS-A WERE: ");
            console.log(words);
        }
    },
    function(err) {
        console.error(err);
    }
);
