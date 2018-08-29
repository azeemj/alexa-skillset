
var Alexa = require('alexa-sdk');
var requestedt = require('request');
var http = require('http');

const myskillName = "currencies";

var handlers = {

   
    "SrilankaIntent": function () {
        var Output_br = "";
        var repromptSpeech = "";
        var reprompt= '';
        requestAPISL((message) => {
            message=message+ " , To hear One USD doller in Singapore dollers, say Alexa, USD doller in Singapore dollers ?"
          
          

            this.emit(':askWithCard', message, repromptSpeech, myskillName, message);
        });
    },
    "SingaporeIntent": function () {
        var repromptSpeech = "";
       
        requestAPISG((message) => {
            message=message+ "  ,To hear One USD doller in Sri lanka rupees, say Alexa, say USD doller in Sri lanka rupees  ?"
            this.emit(':askWithCard', message,repromptSpeech, myskillName, message);

        });
    },
    "AboutIntent": function () {
      
        var Output = "";
        var repromptSpeech = "";
        Output += " Here are some things you can say: ";
        Output += " ,To hear One USD doller in Sri lanka rupees ,say USD doller in Sri lanka rupees  ";
        Output += " ,To hear One USD doller in Singaore Doller ,say USD doller in Singapore dollers  ";
        Output += " ,You can also say stop if you're done. ";
        Output += " So how can I help?";
        //this.emit(':tell', speechOutput);
        this.emit(':askWithCard', Output,repromptSpeech, myskillName, Output);
       


    },
    "HelpIntent": function () {
        var Output = "";
        var repromptSpeech = "";
        Output += " Here are some things you can say: ";
        Output += " ,To hear One USD doller in Sri lanka rupees ,say USD doller in Sri lanka rupees  ";
        Output += " ,To hear One USD doller in Singaore Doller ,say USD doller in Singapore dollers  ";
        Output += " ,You can also say stop if you're done. ";
        Output += " So how can I help?";
        //this.emit(':tell', speechOutput);
        this.emit(':askWithCard', Output,repromptSpeech, myskillName, Output);
    },
    "AMAZON.HelpIntent": function () {
        var speechOutput = "";
        var Output = "";
        var repromptSpeech = "";
        Output += " Here are some things you can say: ";
        Output += " ,To hear One USD doller in Sri lanka rupees ,say USD doller in Sri lanka rupees  ";
        Output += " ,To hear One USD doller in Singaore Doller ,say USD doller in Singapore dollers  ";
        Output += " ,You can also say stop if you're done. ";
        Output += " So how can I help?";
        //this.emit(':tell', speechOutput);
        this.emit(':askWithCard', Output,repromptSpeech, myskillName, Output);
    },

    "AMAZON.StopIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "AMAZON.CancelIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "LaunchRequest": function () {
        var welcomeText = "";
        //   speechText += "Welcome to " + myskillName + ". ";
        welcomeText += "Welcome to Currency infromation. \n\n\n Would you like to hear Doller to Srilanka rupees or USD Doller to Singapore Doller?";
        var repromptText = "For instructions on what you can say, please say help me.";
        this.emit(':ask', welcomeText, repromptText);
    },
    'Unhandled': function () {

        var speechOutput = "";
        var Output = "";
        var repromptSpeech = "";
        Output += " Here are some things you can say: ";
        Output += " To hear One USD doller to Sri lanka rupees ,say Sri lanka rupees  ";
        Output += " To hear One USD doller to Singaore Doller ,say Singapore dollers  ";
        Output += " You can also say stop if you're done. ";
        Output += " So how can I help?";
        //this.emit(':tell', speechOutput);
        this.emit(':askWithCard', Output,repromptSpeech, myskillName, Output);

    }

};

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.207d8bbb-67be-489a-a31b-cd9542f640a7";
    alexa.registerHandlers(handlers);
    alexa.execute();
};


function requestAPISG(callback) {
    var speechOutput = "";

    var url = "http://v1.exchangerate-api.com/bulk/00ad6c80eb40fb4831ed7fd4/USD";
    console.log("before get");
   
    http.get(url, function (res) {
        // Continuously update stream with data
        console.log("inside get");
        var body = '';
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function () {
            //context.succeed(JSON.parse(body));
            console.log("inside body"+body);
            let cont = JSON.parse(body);
            speechOutput = speechOutput + "" + cont.rates.SGD;
          
            callback(speechOutput);
        });
        res.on('error', function (e) {
            
            speechOutput = speechOutput + "error" + e
            
            callback(speechOutput);
        });




    });

}


function requestAPISL(callback) {
    var speechOutput = "";

    var url = "http://v3.exchangerate-api.com/bulk/00ad6c80eb40fb4831ed7fd4/USD";
    console.log("before get");
    
    http.get(url, function (res) {
        // Continuously update stream with data
        console.log("inside get");
        var body = '';
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function () {
            console.log("inside body"+body);
            let cont = JSON.parse(body);
            speechOutput = speechOutput + "" +cont.rates.LKR;
            
            callback(speechOutput);
        });
        res.on('error', function (e) {
            
            callback(speechOutput);
        });

    });

}
