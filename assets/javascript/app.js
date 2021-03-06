
    // QUESTIONS

    var questions = [

        {
            question: "What is Rick's favorite catch phrase?",
            answer: ["Heeey gimme dat frizz!", "You can't get to party with Rick!", "Wubba lubba dub dub!", "Squeeee-dat!"],
            correctAnswer: 2,
            answerImage: '<img class="answerImg" src="assets/images/WubbaLubbaDubDub.gif">',
        },
        {
            question: "In order to blend into Morty's high school, Rick turned himself into:",
            answer: ["Tiny Rick", "Invisible Rick", "Janitor Rick", "A frisbee"],
            correctAnswer: 0,
            answerImage: '<img class="answerImg" src="assets/images/tiny_rick.gif">',
        },
        {
            question: "In order to persuade Morty's math teacher, Mr. Goldenfold,  to assign less homework, Rick and Morty:",
            answer: ["Make their dog Snuffles super-intelligent to scare him.", "Enter Mr. Goldenfold's dreams.", "Go back in time to make him hate math.", "Blow up the high school."],
            correctAnswer: 1,
            answerImage: '<img class="answerImg" src="assets/images/Inception.gif">',
        },
        {
            question: "Beth's (Morty's mom's) favorite drink is?",
            answer: ["Orange juice", "Vodka", "Le Crap Sparking Flavored Water", "Wine"],
            correctAnswer: 3,
            answerImage: '<img class="answerImg" src="assets/images/drinks_wine.gif">',
        },
        {
            question: "What's the name of the blue creatures created to serve a singular purpose for which they will go to any length to fulfill?",
            answer: ["Glip Glorps", "Flurbens", "Mr. Meeseeks", "Jerry"],
            correctAnswer: 2,
            answerImage: '<img class="answerImg"  src="assets/images/meeseeks.gif">',
        },
       {
            question: "Once Morty's dog Snuffles becomes super-intelligent (and re-names himself Snowball), what is he upset about that's missing?",
            answer: ["His collar", "His tennis ball", "His bone", "His testicles"],
            correctAnswer: 3,
            answerImage: '<img class="answerImg" src="assets/images/snuffles.gif">',
        },
       {
            question: "Beth's profession is:",
            answer: ["Equine vascular surgeon", "Underwater basket weaver", "Alien secret agent", "Mayor"],
            correctAnswer: 0,
            answerImage: '<img class="answerImg" src="assets/images/beth_horse.gif">',
        },
       {
            question: "Jerry's (Morty's dad's) favorite musical is:",
            answer: ["Cats", "Shawshank Redemption: The Musical", "Popeye", "Hulk: The Musical"],
            correctAnswer: 3,
            answerImage: '<img class="answerImg" src="assets/images/jerry_hulk.gif">',
        },
       {
            question: "Where is Rick at the end of Season 2 [SPOILER!]:",
            answer: ["Galactic Prison", "Going on an adventure with Morty", "At Birdperson's wedding", "Drunk in his workshop"],
            correctAnswer: 0,
            answerImage: '<img class="answerImg" src="assets/images/rick_prison.gif">',
        },
       {
            question: "In order to save earth, Rick and Morty write this hit song:",
            answer: ["Don't Flip on My Steez", "You Know I'm Rick", "Get Schwifty", "Hands Off My Flubus"],
            correctAnswer: 2,
            answerImage: '<img class="answerImg" src="assets/images/get_schwifty.gif">',
        },
      ];

    // INITIALIZE

        $('#start').on('click', function() {
          game.resetGame();
        })


    // GAME OBJECT

    var game = {

        questionNum: 0,
        correctNum: 0,
        missedNum: 0,
        noAnswerNum: 0, 

        resetGame: function() {
            this.questionNum = 0,
            this.correctNum = 0;
            this.wrongNum = 0;
            this.noAnswerNum = 0;
            $('#correct-score').html(0);
            $('#missed-score').html(0);
            $('#no-answer-score').html(0);
            $('#btn-holder-js').empty();
            this.displayQuestion();

        },

        displayQuestion: function() {
            $('#image-js').empty();
            if (game.questionNum === 10) {
                game.gameOver();
            }
            else {
            var answerString = '';
            var questionString = '';
            var questionNumDisplay = game.questionNum + 1;
            var answerNumDisplay = 1;
            questionString = '<div class ="question">' + questionNumDisplay + '. ' + questions[game.questionNum].question + '</div>';
            for(var i=0; i < questions[game.questionNum].answer.length; i++) {
                answerString += '<button class="answer" value="' + i + '">' + answerNumDisplay + '. ' + questions[game.questionNum].answer[i] + '</button>';
                answerNumDisplay++;
                }
            $('#question-js').html(questionString + answerString);
            game.onClickAnswer();
            timer.reset();
            }
        },

        onClickAnswer: function() {
            $(".answer").on("click", function() {
                var answerVal = parseInt($(this).val());
                if (answerVal === questions[game.questionNum].correctAnswer) {
                    game.correctAnswer();
                }
                else {
                    game.missedAnswer();
                }
            });
            
        },

        correctAnswer: function() {
            timer.stopTimer();
            $('#question-js').empty();
            $('#image-js').html('<img class="answerImg" src="assets/images/all_dancing.gif">');
            this.correctNum++;
            $('#correct-score').html(this.correctNum);
            $('#timer-js').html('GOT IT!')
            setTimeout(this.answerContent, 4000);
        },

        missedAnswer: function() {
            timer.stopTimer();
            $('#question-js').empty();
            $('#image-js').html('<img class="answerImg" src="assets/images/sad_robot.gif">');
            this.missedNum++;
            $('#missed-score').html(this.missedNum);
            $('#timer-js').html('NOPE!')
            setTimeout(this.answerContent, 4000);
        },

        noAnswer: function() {
            timer.stopTimer();
            $('#question-js').empty();
            $('#image-js').html('<img class="answerImg" src="assets/images/hate_player_hate_game.gif">');
            this.noAnswerNum++;
            $('#no-answer-score').html(this.noAnswerNum);
            $('#timer-js').html('TOO LATE!')
            setTimeout(this.answerContent, 4000);
        },

        gameOver: function() {
            timer.stopTimer();
            $('#question-js').empty();
            $('#btn-holder-js').html('<button id="start" class="btn">PLAY AGAIN!</button>');
            $('#image-js').html('<img class="answerImg" src="assets/images/Like_what_you_got.gif">');
            $('#timer-js').html('GAME OVER!')
            this.questionNum++;
            $('#start').on('click', function() {game.resetGame();})
        },

        answerContent: function() {
            $('#question-js').html('Answer: ' + questions[game.questionNum].answer[questions[game.questionNum].correctAnswer]);
            $('#image-js').html(questions[game.questionNum].answerImage);
            game.questionNum++;
            setTimeout(game.displayQuestion, 7000);
        },
    };

    // TIMER OBJECT

    var timer = {

      time: 0,
      timerRunning: false,
      intervalID: 0,

        reset: function() {
            timer.time = 10;
            $("#timer-js").html("10");
            intervalId = setInterval(timer.count, 1000);
            timer.timerRunning = true;
        },

        count: function() {
            if (timer.timerRunning){
                timer.time--;
                $("#timer-js").html('<div>' + timer.time + '</div>');
                if (timer.time < 0) {
                    game.noAnswer();
                }
            }
        },

        stopTimer: function() {
            clearInterval(intervalId);
            timer.timerRunning=false;
            $("#timer-js").html('');
        }
    };

