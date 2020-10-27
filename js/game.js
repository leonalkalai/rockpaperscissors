//selectors
const weapons =$('.image-container > .item');
const gameinfo = $('#gameinfo');
const playerscore = $('#playerscore');
const computerscore = $('#computerscore');
const choicestitle = $('.choicestitle'); 
const startbutton = $('#startbutton');
const playerchoicespan = $('#playerchoicespan');
const computerchoicespan = $('#computerchoicespan');
const winscore = $('.winscore');
const beats = $('.beats');
const triestext = $('.triestext');
const triestitle = $('#triestitle'); 
const info = $('.info'); 
//serialize
const choices = ['rock','scissors','paper'];
let player_choice, computer_choice;
let player_score = 0;
let computer_score = 0;
let win_score = 0;
let startGame = true;
var rounds = 0;
var userOption;
// hide things at the beggining to show them after 1rst play
startbutton.hide();
choicestitle.hide();
triestext.hide(); 
triestitle.hide();

$('h2').hide();
$('#results').hide(); 
 
//function start for button restart
start = ()=> {
    $('.buttonspace').hide();
    $('body').removeClass();
    winscore.removeClass('chosen');
    weapons.css('pointer-events','none');
    startGame = true;
    rounds = 0;
    player_score = 0;
    computer_score = 0;
    playerscore.html(player_score);
    computerscore.html(computer_score);
    info.html('Select rounds');
    gameinfo.html('');
    choicestitle.html('Choices');
    $("#attribution").hide();
    startbutton.hide();
    beats.hide();
    info.show();
    winscore.show();
    weapons.removeClass("scale");
    weapons.removeClass("winningStyles losingStyles drawStyles"); 
}

//Animation
function animate(selector){
    selector = $(selector);
    selector.css('opacity',0).stop().animate({"opacity": 0}); 
    setTimeout(() => {
        selector.css('opacity',1).animate({"opacity": 1},{duration:100});        
    }, 100); 
}

function play(player_choice){
    win_score = userOption;
    // shows a random number and convert it to nearest small integer,
    // multiplyX3 will show from 0-2 because it will not reach 3
    // and we have an array of values from 0-2 so it will show our array values
    computer_choice = Math.floor(Math.random()*3); 
    info.show(); // on start game show usefull info
    choicestitle.show(); // show choices heading
    triestitle.show(); // show tries title
    triestext.show(); 
  
    gameinfo.empty().append("<span id='playerchoicespan'>You choose "+"<p>"+`${choices[player_choice]}`+"</p>"+"</span>"+"<span id='computerchoicespan'>Computer chose "+"<p>"+`${choices[computer_choice]}`+"<p>"+"</span>");
    //if (player_choice - computer_choice == -1 || player_choice - computer_choice == 2) {
        //player_score++;
       // playerscore.html(player_score);
        //beats.show();
        //choicestitle.show();
        //$('body').removeClass();
    //}
    if(
        ((choices[player_choice]=='paper')&&(choices[computer_choice]=='rock'))
        ||
        ((choices[player_choice]=='rock')&&(choices[computer_choice]=='scissors'))
        ||
        ((choices[player_choice]=='scissors')&&(choices[computer_choice]=='paper'))
        )
    {

        player_score++;
        playerscore.html(player_score);
        beats.show();
        choicestitle.show();
        $('body').removeClass();

    }    
    else if(
        ((choices[player_choice]=='rock')&&(choices[computer_choice]=='paper'))
        ||
        ((choices[player_choice]=='scissors')&&(choices[computer_choice]=='rock'))
        ||
        ((choices[player_choice]=='paper')&&(choices[computer_choice]=='scissors'))
        )
        {
        if(!(player_score>win_score)){
             // if players wins stop computer of playing
             computer_score++; //else computer is playing 
        }
        computerscore.html(computer_score);
        beats.show();
        choicestitle.show();
        
    }
        if(
            ((choices[player_choice]=='rock')&&(choices[computer_choice]=='paper'))
            ||
            ((choices[player_choice]=='paper')&&(choices[computer_choice]=='rock'))
            )
        {
            beats.empty().append("paper beats rock");
        
        }
        if(
            ((choices[player_choice]=='rock')&&(choices[computer_choice]=='scissors'))
            ||
            ((choices[player_choice]=='scissors')&&(choices[computer_choice]=='rock'))
            )
        {
            beats.empty().append('rock beats scissors');
        
        }
        if(
            ((choices[player_choice]=='paper')&&(choices[computer_choice]=='scissors'))
            ||
            ((choices[player_choice]=='scissors')&&(choices[computer_choice]=='paper'))
            )
        {
            beats.empty().append('scissors beats paper');
        
        }
 
    else if(player_choice === computer_choice){
        playerscore.html(player_score);
        computerscore.html(computer_score);
        $('body').removeClass().addClass('bodygreenlight');
        gameinfo.fadeOut(300, function() { 
                gameinfo.html('').append("<span id='tie' class='smoothtransition grid-2'><div class='tiebackground'></div>"+"<span>"+"<span class='aliceblueblackground'><p>"+`${choices[player_choice]}`+"</p>"+"<p> equals </p>"+"<p>"+`${choices[computer_choice]}`+"</p>"+"</span><p class='tietextp'>Its a tie</p>"+"</span>"+"</span>").fadeIn(300);
            });

          setTimeout(() => {
            $('#tie > span > span').removeClass('aliceblueblackground').addClass('tietext');     
            $('.tietext>p:contains("rock")').each(function () {
                $('.tietext').addClass('extralineheight');
            });
 
        }, 400); 
    
        beats.hide();
    }

    if(player_score>win_score){
       // gameinfo.html("<span id='win' class='smoothtransition'><img src='images/win.png' alt='win'><p class='winner'>You won</p></span>");
        gameinfo.fadeOut(300, function() { 
            gameinfo.html('').append("<span id='win' class='smoothtransition'><img src='images/win.png' alt='win'><p class='winner'>You won</p></span>").fadeIn(300);
        });
        $('.buttonspace').show(); 
        choicestitle.hide();
        triestext.hide(); 
        triestitle.hide();
        beats.hide();
        startGame=false;
        startbutton.html('restart');
        $('body').removeClass().addClass('bodypurplelight');
        startbutton.css('width','140px');
        startbutton.show();
        choicestitle.html('');
    }
    if(computer_score>win_score){
        //gameinfo.html("<span id='win'class='smoothtransition'><img src='images/lose.png' alt='lose'><p class='loser'>You lose</p></span>");
        
        gameinfo.fadeOut(100, function() { 
            gameinfo.html('').append("<span id='win'class='smoothtransition'><img src='images/lose.png' alt='lose'><p class='loser'>You lose</p></span>").fadeIn(100);
        });
        $('.buttonspace').show(); 
        choicestitle.hide();
        triestext.hide(); 
        triestitle.hide();
        beats.hide();
        startGame=false;
        startbutton.html('restart');
        $('body').removeClass().addClass('bodypurplelight');
        startbutton.css('width','140px');
        startbutton.show();
        choicestitle.html(''); 
    }
}
document.querySelector('#rock').addEventListener('click',(event)=>{
    if((player_score>win_score)||(computer_score>win_score)){
        event.stopImmediatePropagation();
    }
    $("#attribution").hide();
    player_choice=0;
    if(startGame){
        startbutton.hide();
        play(player_choice);
    }
    
});
document.querySelector('#scissors').addEventListener('click',(event)=>{
    if((player_score>win_score)||(computer_score>win_score)){
        event.stopImmediatePropagation(); 
    }
    $("#attribution").hide();
    player_choice=1;
    if(startGame){
        startbutton.hide();
        play(player_choice);
    }
});
document.querySelector('#paper').addEventListener('click',(event)=>{
    if((player_score>win_score)||(computer_score>win_score)){
        event.stopImmediatePropagation();
    }
    $("#attribution").hide();
    player_choice=2;
    if(startGame){
        startbutton.hide();
        play(player_choice);
    }
});

// 
weapons.click(function() { 
    weapons.removeClass('scale');
    if( weapons.css('pointer-events')== 'auto' ) {
        $(this).addClass('scale');
 } 
});

// if click any of weapons
weapons.each(function() {
    weapons.css('pointer-events','none');
    $(this).on("click", function(event){
        info.hide(); //hide select weapon text
        rounds++; // add rounds on each click  
        triestext.empty().append('You got: '+ player_score +' wins '+"/"+' at '+ rounds+' tries'); // append playerscore on each round
        if((player_score>win_score)||(computer_score>win_score)){ // if player wins or computer wins then desable click
            event.stopImmediatePropagation();
        }
        if (player_choice - computer_choice == -1 || player_choice - computer_choice == 2) {
            $('.item').removeClass("winningStyles losingStyles drawStyles"); 
            $(this).addClass('winningStyles');
         }
         else if(player_choice === computer_choice){
            $('.item').removeClass("winningStyles losingStyles drawStyles"); 
            $(this).addClass('drawStyles');
         }
         else {
           $('.item').removeClass("winningStyles losingStyles drawStyles"); 
            $(this).addClass('losingStyles');
         }

    });
});


winscore.each(function() {
    $(this).on("click", function(event){
        userOption = parseInt($(this).text()-1); 
        $(this).addClass('chosen');
        weapons.css('pointer-events','auto');
        $('h1').css('height','80px').css('line-height','45px');
        $('#main').removeClass('init-game');
        $('h2').show();
        $('#results').show();
        $('.buttonspace').hide(); 
        info.html('Select a weapon'); 
        winscore.fadeOut(1200);
    
    });
});    

