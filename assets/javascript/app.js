/*
*Developer:Khoi Nguyen
*Date: 2/14/2017
*UCSD Code Bootcamp: Homework #5
*/
//globals to keep track of answer count and timer
var right = 0;
var wrong = 0;
var gameCounter = 0;
var intervalId;
/*************************************
* Trivia Game Object        				 *
**************************************/ 
var triviaGame = {
  //properties and methods of triviaGame object.
  seconds: 30,
  //tracks which question is currently being displayed.
  liveQuestion: null,

  triviaList: [
  {
    question:"Who is Batman?",
    choiceA: "Clark Kent",
    choiceB: "George Bush",
    choiceC: "Bruce Wayne",
    choiceD: "Steve Johnson",
    correctChoice: "Bruce Wayne",
    correctGif: "q=bruce+wayne",
    wrongGif: "q=joker",
    status: false
  },
  {
    question:"Who is Superman",
    choiceA: "Roger Rabbit",
    choiceB: "Dennis Rodman",
    choiceC: "Jack in the Box",
    choiceD: "Clark Kent",
    correctChoice: "Clark Kent",
    correctGif: "q=clark+kent",
    wrongGif: "q=lex+luthor",
    status: false
  },
  {
    question:"What is the name of Batman's city?",
    choiceA: "San Francisco",
    choiceB: "Gotham",
    choiceC: "Sacramento",
    choiceD: "Smallville",
    correctChoice: "Gotham",
    correctGif: "q=Gotham",
    wrongGif: "q=wrong",
    status: false
  },
  {
    question:"Which of the following superheroes does not have any super powers?",
    choiceA: "Iron Man",
    choiceB: "The Flash",
    choiceC: "Wonder Woman",
    choiceD: "Green Lantern",
    correctChoice: "Iron Man",
    correctGif: "q=iron + man",
    wrongGif: "q=explosion",
    status: false
  },
  {
    question:"What is Wonder Woman's human alias?",
    choiceA: "Owen Wilson",
    choiceB: "Catherine Jones",
    choiceC: "Lois Lane",
    choiceD: "Diana Prince",
    correctChoice: "Diana Prince",
    correctGif: "q=wonder+woman",
    wrongGif: "q=sad+face",
    status: false
  },
  {
    question:"What handicap does Marvel's Daredevil have?",
    choiceA: "Deaf",
    choiceB: "Mute",
    choiceC: "Rich",
    choiceD: "Blind",
    correctChoice: "Blind",
    correctGif: "q=Daredevil",
    wrongGif: "q=kingpin",
    status: false
  },
  {
    question:"Which Ancient mythology is the character Thor inspired by?",
    choiceA: "American",
    choiceB: "Egyptian",
    choiceC: "Greek",
    choiceD: "Norse",
    correctChoice: "Greek",
    correctGif: "q=greece",
    wrongGif: "q=wrong+answer",
    status: false
  },
  {
    question:"Which Marvel character has the ability to control anything made of metal?",
    choiceA: "Brainiac",
    choiceB: "Loci",
    choiceC: "Magneto",
    choiceD: "Green Arrow",
    correctChoice: "Magneto",
    correctGif: "q=magneto",
    wrongGif: "q=sad+face",
    status: false
  }

  ],
  //hide all prompts before start of game.
  initializeDisplay: function () {
    $("#timer").hide();
    $("#out-of-time").hide();
    $("#question").hide();
    $("#firstChoice").hide();
    $("#secondChoice").hide();
    $("#thirdChoice").hide();
    $("#fourthChoice").hide();
    $("#startOverBtn").hide();
    $("#pointsCorrect").hide();
    $("#pointsWrong").hide();
  },//stops the timer
  stop: function() {
    // DONE: Use clearInterval to stop the count here.
    clearInterval(intervalId);
    
  },//formats the page to display questions and timer.
  displayQuestions: function () {
    console.log(gameCounter);
    //stores the current question to global liveQuestion
    this.liveQuestion = this.triviaList[gameCounter];
    //set the flag to true (sup property)
    this.liveQuestion.status = true;
    //dispaly question and choices on page (html)
    $("#question").html(this.liveQuestion.question);
    $("#firstChoice").html(this.liveQuestion.choiceA);
    $("#secondChoice").html(this.liveQuestion.choiceB);
    $("#thirdChoice").html(this.liveQuestion.choiceC);
    $("#fourthChoice").html(this.liveQuestion.choiceD);
    $("#timer").show();
    //call count method every 1 second.
    intervalId = setInterval(this.count, 1000);
    //hid before, so now show.
    $("#question").show();
    $("#firstChoice").show();
    $("#secondChoice").show();
    $("#thirdChoice").show();
    $("#fourthChoice").show();
    $("#pointsCorrect").hide();
    $("#pointsWrong").hide();
  },//timer counter
  count: function() {
    $("#count-down").html(triviaGame.seconds);
    triviaGame.seconds--;
    //timer has run out, stop timer and call outOfTime()
    if(triviaGame.seconds < 0) {
      triviaGame.stop();
      triviaGame.outOfTime();
    }
  },//hide other parameters and who "out of time"
  outOfTime: function () {
    $("#question").hide();
    $("#firstChoice").hide();
    $("#secondChoice").hide();
    $("#thirdChoice").hide();
    $("#fourthChoice").hide();
    $("#out-of-time").show();
    //increment to next question in the array.
    gameCounter++;
    setTimeout(this.displayTimeOut, 1000 * 1);
  },//displays time out gif and resets game after 5 seconds
  displayTimeOut: function () {
    triviaGame.addGifDisplay("q=out+of+time");
    setTimeout(triviaGame.resetGame, 1000 * 5);
  },//pass strName of button passed and call ifCorrect method to determine if choice was correct.
  selectedAns: function (strName) {
     switch (strName) {
        case "btnA":
            this.ifCorrect(this.liveQuestion.choiceA);
          break;
        case "btnB":
            this.ifCorrect(this.liveQuestion.choiceB);
          break;
        case "btnC":
            this.ifCorrect(this.liveQuestion.choiceC);
          break;
        case "btnD":
            this.ifCorrect(this.liveQuestion.choiceD);
          break;
       default:
          console.log("default case?");
    }
  },//method used to compare sup property correct choice with that of user choice.
  ifCorrect: function (chosen) {
    //correct - display gif and reset game.
    if (this.liveQuestion.status === true) {
      if(chosen === this.liveQuestion.correctChoice) {
        right++;
        this.stop();
        this.displayResult("Correct", this.liveQuestion.correctChoice);
        this.addGifDisplay(this.liveQuestion.correctGif);
        gameCounter++;
        setTimeout(this.resetGame, 1000 * 5);
      }//wrong - display gif and reset game
      else {
        console.log("wrong answer");
        wrong++;
        this.stop();
        this.displayResult("Wrong", this.liveQuestion.correctChoice);
        this.addGifDisplay(this.liveQuestion.wrongGif);
        gameCounter++;
        setTimeout(this.resetGame, 1000 * 5);
      }
    }
  },//method used for ajax and gif retrieval.
  addGifDisplay: function (strName) {
    $.ajax({
      url: "http://api.giphy.com/v1/gifs/search?" + strName + "&api_key=dc6zaTOxFJmzC&limit=5",
      method: "GET"
      }).done(function(response) {
        var strPath = response.data[2].images.fixed_height.url;
        $("#placeHolder").html("<img src=" + strPath + ">");
      });
    $("#placeHolder").show();
  },//dispaly results on the page after user chooses, two paramts result and answer.
  displayResult: function (result, ans) {
    $("#question").hide();
    $("#firstChoice").hide();
    $("#secondChoice").hide();
    $("#thirdChoice").hide();
    $("#fourthChoice").hide();
    $("#out-of-time").hide();
    $("#result").html("<h1>" + result + ": " + ans);
    $("#result").addClass("text-center");
    $("#result").show();
  }, 
  resetGame: function () {
    //end of game has reached and user has gone through all of the questions.
    //also reset the paramters accordingly.
    if(gameCounter === triviaGame.triviaList.length) {
      $("#startOverBtn").show();
      $("#result").hide();
      $("#timer").hide();
      $("#out-of-time").hide();
      $("#placeHolder").hide();
      $("#right").html(right);
      $("#wrong").html(wrong);
      $("#pointsCorrect").show();
      $("#pointsWrong").show();
      triviaGame.seconds = 30;
      triviaGame.liveQuestion.status = false;
      triviaGame.liveQuestion = null;
      gameCounter = 0;
      right = 0;
      wrong = 0;
    }//automatically reset and go to the next question.
    else {
      $("#result").hide();
      $("#timer").hide();
      $("#out-of-time").hide();
      $("#placeHolder").hide();
      triviaGame.seconds = 30;
      triviaGame.liveQuestion.status = false;
      triviaGame.liveQuestion = null;
      triviaGame.displayQuestions();
    }
  }
};//end of tirviaGame object
//jquery method executes when DOM has been fully loaded.
$( document ).ready(function() {
  triviaGame.initializeDisplay();
  $( "#startBtn" ).click(function() {
    $(this).hide();
    triviaGame.displayQuestions();
  });//end of attack button listener
  //listener for Restart Button
  $( ".choiceBtn" ).click(function() {
    triviaGame.selectedAns($(this).val());

  });//end of choice button linstener
  $( "#startOverBtn" ).click(function() {
    $(this).hide();
    triviaGame.displayQuestions();
  });//end of restart button listener  
});//end of ready function.