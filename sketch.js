//variáveis da bolinha 
let xBolinha = 300;
let yBolinha = 200;
let diametro = 17;
let raio = diametro /2;

//velocidade da bolinha 
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis rect
let xRacket = 10;
let yRacket = 150;
let comprimentoRacket = 8;
let alturaRacket = 80;

//variáveis rect oponente
let xRacketOponente = 580;
let yRacketOponente = 150;
let comprimentoRacketOponente = 8;
let velocidadeYOponente;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do Game
let trilha;

function preload(){
  trilha = loadSound("Ronettes - Be My Baby.mp3");
}

//Chance de errar
let chanceDeErrar = 5;

let colidiu = false;


function setup() {
  createCanvas(600, 400);
  trilha.play(); //devo usar a funcao loop ao invés do play
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha(); 
  verificaBordas();
  mostraRect(xRacket, yRacket);
  movimentaRect();
  verificaColisao();
  colisaoRacketLibrary();
  mostraRect(xRacketOponente, yRacketOponente);
  movimentaRacketOponente();
  colisaoRacketOponenteLibrary();
  incluiPlacar();
  marcaPonto();
  }



    function mostraBolinha(){
        circle(xBolinha,yBolinha,diametro);
    }


    function movimentaBolinha(){
        xBolinha += velocidadeXBolinha;
        yBolinha += velocidadeYBolinha;
    }


    function verificaBordas(){
    if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
    } 
    if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1
    } 
}
    
   
    function mostraRect(x,y){ 
    rect(x,y,comprimentoRacket,alturaRacket);
  }


    function mostraRectOponente(){
    rect(xRacket,yRacket,comprimentoRacket,alturaRacket);
  }


    function movimentaRect(){
    if(keyIsDown(UP_ARROW)){
      yRacket -= 10;
  } 
    if(keyIsDown(DOWN_ARROW)){
      yRacket += 10;  
    }
  }



  function verificaColisao(){
    if(xBolinha - raio < xRacket + comprimentoRacket && yBolinha - raio < yRacket + alturaRacket && yBolinha + raio > yRacket){
      velocidadeXBolinha *= -1;
    }
    
  } 

  function colisaoRacketLibrary(){
   colidiu = collideRectCircle(xRacket,yRacket,comprimentoRacket, alturaRacket,xBolinha,yBolinha,raio);
    
    if(colidiu){
      velocidadeXBolinha *= -1;
    } 
    
  }



    function colisaoRacketOponenteLibrary(){
    colidiu = collideRectCircle(xRacketOponente,yRacketOponente,comprimentoRacketOponente, alturaRacket,xBolinha,yBolinha,raio);
    
    if(colidiu){
      velocidadeXBolinha *= -1;
    } 
    
  }


    function movimentaRacketOponente(){
    velocidadeYOponente = yBolinha - yRacketOponente - comprimentoRacket / 2 - 30;
    yRacketOponente += velocidadeYOponente + chanceDeErrar
    calculaChanceDeErrar();
    
  }


    function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


    function incluiPlacar(){
    stroke(255); //contorno branco no placar
    textAlign(CENTER); //centraliza o placar
    textSize(18);
    fill(color(255,140,0));
    rect(131, 10,40,20);
    fill(255);
    text(meusPontos, 150, 26); 
    fill(color(255,140,0));
    rect(410, 10,40,20);
    fill(255);
    text(pontosOponente, 430, 26);
     
  }

    function marcaPonto(){
    if(xBolinha > 590){
      meusPontos += 1;
    }
    if(xBolinha < 10){
     pontosOponente += 1; 
    }
  }