


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDmQmHn7x2MUWaW8NiOMKrEJ6Ts3EJ2u6I",
    authDomain: "trainscheduler-8698c.firebaseapp.com",
    databaseURL: "https://trainscheduler-8698c.firebaseio.com",
    projectId: "trainscheduler-8698c",
    storageBucket: "",
    messagingSenderId: "1022672597635",
    appId: "1:1022672597635:web:f3835a4ed4b4c963"
  };
  var name ="";
  var destination = "";
  var first="";
  var frequency=0;
  var nextArival=0;
  var minAway=0;
 
  


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database =  firebase.database();
 // 2. Button for adding Train
 $("#add-train-btn").on("click", function(event) {

    debugger;
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrnTime = $("#first-train-input").val().trim();
    var trnFreq = $("#frequancy-input").val().trim();
    var timeConversion = moment(firstTrnTime, "HH:mm").subtract(1, "years");
    //console.log(timeConversion);
    var temp = moment();
    var currentTime = moment(temp).format("hh:mm");
    
    //console.log(currentTime);
    var diffTime = moment().diff(moment(timeConversion), "minutes");
    var tRemainder = diffTime % trnFreq;
    minAway = trnFreq - tRemainder;
    var temp2 = moment().add(minAway, "minutes");
    var nextTrain = moment(temp2).format("hh:mm");
    //console.log()

    // Creates local "temporary" object for holding Train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      first: firstTrnTime,
      frequency: trnFreq,
      nextarival:nextTrain,
      minsaway:minAway
    };
    database.ref().push(newTrain);
  
    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.first);
    // console.log(newTrain.frequency);
    // console.log(newTrain.nextarival);
    // console.log(newTrain.minAway);
  
  //  alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequancy-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    //console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var dbtrainName = childSnapshot.val().name;
    var dbtrainDestination = childSnapshot.val().destination;
    var dbfirstTrnTime = childSnapshot.val().first;
    var dbtrnFreq = childSnapshot.val().frequency;
    var dbnextArrival = childSnapshot.val().nextarival;
    var dbminAway = childSnapshot.val().minsaway;
  
  
    // train Info
    // console.log(name);
    // console.log(destination);
    // console.log(first);
    // console.log(frequency);

  
  
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(dbtrainName),
      $("<td>").text(dbtrainDestination),
      $("<td>").text(dbfirstTrnTime),
      $("<td>").text(dbtrnFreq),
      $("<td>").text(dbnextArrival),
      $("<td>").text(dbminAway),

    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  