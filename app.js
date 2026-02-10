  
      const outcome = ["Rock", "Paper", "Scissors"];
      const moves = [
        { name: "Rock", img: "images/rock-emoji.png" },
        { name: "Paper", img: "images/paper-emoji.png" },
        { name: "Scissors", img: "images/scissors-emoji.png" }
      ];

      let isAutoPlaying = false;
      let intervalId;

  

      let score = JSON.parse(localStorage.getItem("score")) ?? {
        wins: 0,
        losses: 0,
        ties: 0,
      };
      updateScoreElement();

      let moveButtons =  document.querySelectorAll('.move-button');

      moveButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          result(parseInt(btn.value))

        })          
      });
      
      // addEventListener('click', () => {
      //   result(moveButton.value);

      //   }
      
      // );

   
      function result(playersChoice) {


        const computerChoice = Math.floor(Math.random() * 3);
        let result = "";
   
        
        renderMove(playersChoice, ".player-choice");
        renderMove(computerChoice, ".computer-choice");

     

        if (playersChoice == computerChoice) {
          result = "Tie!";
          score.ties += 1;
        } else if (
          (playersChoice == 0 && computerChoice == 2) ||
          (playersChoice == 1 && computerChoice == 0) ||
          (playersChoice == 2 && computerChoice == 1)
        ) {
          result = "Won!";
          score.wins++;
        } else {
          result = "Lost!";
          score.losses++;
        }
        updateScoreElement();
        document.querySelector('.js-result').innerHTML = `${result}`;
        localStorage.setItem("score", JSON.stringify(score));
      }

      function reset() {

        console.log("reset called");
        let autoPlayElement = document.querySelector(".auto-play-button");
        if(autoPlayElement.classList.contains('active')) {
          autoPlay();
        }
        score.losses = 0;
        score.wins = 0;
        score.ties = 0;

        document.querySelector('.player-choice').innerHTML = '';
        document.querySelector('.computer-choice').innerHTML = '';
        document.querySelector('.js-result').innerHTML = ``;

        updateScoreElement();
        localStorage.setItem("score", JSON.stringify(score));
      }

      function updateScoreElement() {
        const winsEl = document.querySelector('#wins');
        const lossesEl = document.querySelector('#losses');
        const tiesEl = document.querySelector('#ties');

        if (winsEl && lossesEl && tiesEl) {
          winsEl.textContent = score.wins;
          lossesEl.textContent = score.losses;
          tiesEl.textContent = score.ties;
        }


      }


      

      function renderMove(choice, selector) {
        const move = moves[choice];
        document.querySelector(selector).innerHTML =
        `<img src="${move.img}" alt="${move.name}" class="move-icon" />`;
      }

      function autoPlay() {

       let autoPlayElement = document.querySelector(".auto-play-button");
        

        if(isAutoPlaying) {

          clearInterval(intervalId);
          isAutoPlaying = false;
          autoPlayElement.classList.remove("active");


        } else {

          console.log("inside auto loop");
          reset();
         

          intervalId = setInterval(
                      () => {
                        let playersChoice = Math.floor(Math.random() * 3);
                        result(playersChoice);
                      }
                      ,
                      1000
                      );
          isAutoPlaying = true;
          autoPlayElement.classList.add("active");
          
        }

 
      }
