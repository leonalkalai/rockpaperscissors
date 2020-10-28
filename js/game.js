//selectors
const weapons =$('.image-container > .item');
const gameinfo = $('#gameinfo');
const playerscore = $('#playerscore');
const computerscore = $('#computerscore');
const choicestitle = $('.choicestitle'); 
const startbutton = $('#startbutton');
const restartbutton = $('#restartbutton');
const playerchoicespan = $('#playerchoicespan');
const computerchoicespan = $('#computerchoicespan');
const winscore = $('.winscore');
const beats = $('.beats');
const triestext = $('.triestext');
const triestitle = $('#triestitle'); 
const info = $('.info'); 
const extras = $('#extras');
const homebackground = $('#homebackground');
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
restartbutton.hide();
choicestitle.hide();
triestext.hide(); 
triestitle.hide();
$('.weapons').hide();
$('h2').hide();
$('#results').hide(); 
$('.theme__button').html('<i class="material-icons">videogame_asset</i>').removeClass('exit');

winscore.hide();
start = ()=> {
    $("#attribution").hide();
    info.html('Select rounds :');
    $('#startbutton').fadeOut(300);
    $('.startbuttonspace').fadeOut(300);
    setTimeout(() => {
        winscore.show();
    }, 300); 
}

//function start for button restart
restart = ()=> {
    $('.theme__button').html('<i class="material-icons">videogame_asset</i>').removeClass('exit');
    extras.hide();
    homebackground.show();
    $('.buttonspace').hide();
    $('body').removeClass();
    $('.weapons').hide();
    $('#results').hide(); 
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
    extras.show();
    $('.purplelight').removeClass('startgame');
    gameinfo.empty().append("<span id='playerchoicespan'>You choose "+"<p>"+`${choices[player_choice]}`+"</p>"+"</span>"+"<span id='computerchoicespan'>PC chose "+"<p>"+`${choices[computer_choice]}`+"<p>"+"</span>");
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
        gameinfo.removeClass().addClass('inline');
        gameinfo.fadeOut(300, function() { 
                gameinfo.html('').append("<span id='tie' class='smoothtransition grid-2'><div class='tiebackground'></div>"+"<span>"+"<span class='aliceblueblackground'><p>"+`${choices[player_choice]}`+"</p>"+"<p> equals </p>"+"<p>"+`${choices[computer_choice]}`+"</p>"+"</span>"+"</span>"+"</span>").fadeIn(300);
            });

          setTimeout(() => {
            $('#tie > span > span').removeClass('aliceblueblackground').addClass('tietext');     
            $('.tietext>p:contains("rock")').each(function () {
                $('.tietext').addClass('extralineheight');
            });
 
        }, 400); 
    
        beats.empty().append('its a tie');
    }

    if(player_score>win_score){
        gameinfo.removeClass().addClass('inline');
       // gameinfo.html("<span id='win' class='smoothtransition'><img src='images/win.png' alt='win'><p class='winner'>You won</p></span>");
        gameinfo.fadeOut(300, function() { 
            gameinfo.html('').append("<span id='win' class='smoothtransition'><img src='images/win.png' alt='win'><p class='winner'>You won</p></span>").fadeIn(300);
        });
        info.html('restart of close game');
        $('.buttonspace').show(); 
        choicestitle.hide();
        triestext.hide(); 
        triestitle.hide();
        extras.hide();
        $('.weapons').hide();
        beats.empty().append('its a tie');
        startGame=false;
        $('body').removeClass().addClass('bodypurplelight');
        restartbutton.css('width','140px');
        restartbutton.show();
        $('.theme__button').html('X').addClass('exit');
        document.querySelector('.theme__button').addEventListener('click',()=>{
            var win = window.open("about:blank", "_self");
            win.close();
        });  
        choicestitle.html('');
    }
    if(computer_score>win_score){
        //gameinfo.html("<span id='win'class='smoothtransition'><img src='images/lose.png' alt='lose'><p class='loser'>You lose</p></span>");
        gameinfo.removeClass().addClass('inline');
        info.html('restart of close game');
        gameinfo.fadeOut(100, function() { 
            gameinfo.html('').append("<span id='win'class='smoothtransition'><img src='images/lose.png' alt='lose'><p class='loser'>You lose</p></span>").fadeIn(100);
        });
        $('.buttonspace').show(); 
        choicestitle.hide();
        triestext.hide(); 
        triestitle.hide();
        extras.hide();
        $('.weapons').hide();
        beats.empty().append('its a tie');
        startGame=false;
        $('body').removeClass().addClass('bodypurplelight');
        restartbutton.css('width','140px');
        restartbutton.show();
        $('.theme__button').html('X').addClass('exit');
        document.querySelector('.theme__button').addEventListener('click',()=>{
            var win = window.open("about:blank", "_self");
            win.close();
        });
        choicestitle.html(''); 
    }
}
document.querySelector('#rock').addEventListener('click',(event)=>{
    if((player_score>win_score)||(computer_score>win_score)){
        event.stopImmediatePropagation();
    }
    player_choice=0;
    if(startGame){
        play(player_choice);
    }
    
});
document.querySelector('#scissors').addEventListener('click',(event)=>{
    if((player_score>win_score)||(computer_score>win_score)){
        event.stopImmediatePropagation(); 
    }
    player_choice=1;
    if(startGame){
        play(player_choice);
    }
});
document.querySelector('#paper').addEventListener('click',(event)=>{
    if((player_score>win_score)||(computer_score>win_score)){
        event.stopImmediatePropagation();
    }
    player_choice=2;
    if(startGame){
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
        //info.hide(); //hide select weapon text
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
        $('.purplelight').addClass('startgame');
        weapons.css('pointer-events','auto');
        //$('h1').css('height','80px').css('line-height','45px');
        $('#main').removeClass('init-game');
        $('.buttonspace').hide(); 
        homebackground.hide();
        info.html('Select a weapon : '); 
        winscore.fadeOut(500);
        setTimeout(() => {
            $('#results').show();
            $('.weapons').show();
            $('h2').show();
        }, 500); 
    
    });
});    

