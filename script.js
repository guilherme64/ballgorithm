/*
Phaser.Game parameters: width, 
height, 
como o phaser renderiza o jogo (Phaser.AUTO, .canvas, .webgl),
'' = DOM,
objeto com as funcoes do phaser (create, preload e update)
*/
//TAMANHO DA TELA PODE VARIAR DE ACORDO COM O NUMERO DE CANOS
var game = new Phaser.Game(800, 1000, Phaser.canvas, '', { preload: preload, create: create, update: update });
/*
Bom determinar que os elementos que serao utilizados devem ser 
instanciados logo antes das funcoes principais do phaser e depois da criacao do jogo em si
*/
var ballsDiv = document.getElementById('balls');

function getBallsValues(ballsGroup, ballsDiv) {
    ballsDiv.innerHTML = '';
    console.log(ballsGroup);
    for (var i = 0; i < ballsGroup.length; i++) {
        ballsDiv.innerHTML += '<p>  Bola ' + (i + 1) + ': ' + ballsGroup[i].value + '</p>'
    }
}

var ballsGroup;
var generate = false;
var GO_ball;
var GO_balls;

var GO_ifCentralPipe;
var GO_ifCentralPipes;

var GO_ifRightPipe;
var GO_ifRightPipes;

var GO_ifLeftPipe;
var GO_ifLeftPipes;

var GO_atrPipe;
var GO_atrPipes;

var GO_endifPipe;
var GO_endifPipes;

var GO_whilePipe;
var GO_whilePipes;

var GO_endwhilePipe;
var GO_endwhilePipes;

function preload() {
    //loading the assets. it seems it takes a string to the name and the path of the file
    //nao sei pq caralhos eu coloquei isso em ingles psoidhjfasdf

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ball', 'assets/sprites/ball.png');

    game.load.image('atrPipe', 'assets/sprites/atr.png');

    game.load.image('ifCentralPipe', 'assets/sprites/ifCentralPipe.png');
    game.load.image('ifLeftPipe', 'assets/sprites/ifpipeif.png');
    game.load.image('ifRightPipe', 'assets/sprites/ifpipeelse.png');

    game.load.image('whilePipe', 'assets/sprites/while.png');
    game.load.image('connPipe', 'assets/sprites/connPipe.png')


}



function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
    game.add.sprite(0, 600, 'sky');
    scoreText = game.add.text(2, 2, 'Ballgorithm', { fontSize: '32px', fill: '#fff' });

}



function generateConnPipes(ifs, cens, elses) {
    var connsPositions = [];
    /*
    vetor criado pra armazenar as posições em xy onde os
    canos de conexão vão ser criados. Cada elemento do vetor vai ser isso:
    [posX Inicial, posY inicial, posX Final, posY Final], onde o inicial vai ser 
    a posicao do cano if ou do cano central, e a final a posicao do cano central
    ou do cano else
    */
    for (var i = 0; i < ifs.length; i++) {
        for (var j = 0; j < cens.length; j++) {
            if (ifs[i].y === cens[j].y + 20) {
                //Só tem uma posição em Y, que é a posição do cano if ou else
                connsPositions.push([ifs[i].x, cens[j].x, ifs[i].y]);
                for (var k = 0; k < elses.length; k++) {
                    console.log('entrou no for');
                    if (cens[j].y + 20 === elses[k].y) {
                        connsPositions.push([cens[j].x, elses[k].x, (cens[j].y + 20)]);
                        /*pra cada elemento desse vetor, construir cano auxiliar em
                        da primeira posicao em x ate a segunda */
                        break;
                    }
                }


                console.log(connsPositions);
                break;
                /*Pra evitar que esse if pegue um central que nao e seu, assim que ele
                encontra um central, ele passa pra outro if */
            }
        }
    }
    console.log(connsPositions);
    return connsPositions;
}

function drawConnPipes(connPipes) {
    /**Preciso criar uma funcao que, pra cada elemento de connPipes,
     * eu va desenhando elementos de conexao de uma posicao x ate a outra, em y
     */
    var GO_connPipes = game.add.group();
    var GO_connPipe;
    var connPipesArray = generateConnPipes(ifLeftPipes, ifCentralPipes, ifRightPipes);
    for (var i = 0; i < connPipesArray.length; i++) {
        var counter = connPipesArray[i][0];
        while (counter < connPipesArray[i][1] - 20) {
            counter += 20;
            GO_connPipe = GO_connPipes.create(counter, connPipesArray[i][2], 'connPipe');
        }
    }
}

function generateElements() {
    console.log('Exibindo os elementos referentes aos ifs');
    console.log(ifLeftPipes, ifCentralPipes, ifRightPipes);

    var conPips = generateConnPipes(ifLeftPipes, ifCentralPipes, ifRightPipes);
    drawConnPipes(conPips);
    console.log(conPips + 'conns');
    GO_balls = game.add.group();
    balls_text = game.add.group();
    GO_balls.enableBody = true;
    for (var i = 0; i < balls.length; i++) {
        GO_ball = GO_balls.create(balls[i].x + i * 10, balls[i].y, 'ball');
        GO_ball.body.gravity.y = 100;
        GO_ball.value = balls[i].value;
        GO_ball.toWhile = -1;
        GO_ball.name = 'bola ' + (i + 1);
        GO_ball.checkOverlap = false;
        console.log(GO_ball.value + 'o valor da bola');
        var ballText = game.add.text(GO_ball.x, GO_ball.y, balls[i].value, { fontSize: '12px', fill: '#fff' });
        //balls_text.push(ballText);
        console.log('gru');
        GO_balls.name = 'bolas';
        ballsGroup = GO_balls.getAll();
    }
    /**if central */
    GO_ifCentralPipes = game.add.group();
    GO_ifCentralPipes.enableBody = true;
    for (var i = 0; i < ifCentralPipes.length; i++) {
        var symbolStr = '';
        if (ifCentralPipes[i].boolValue === true) {
            symbolStr = '==';
        } else {
            symbolStr = '!=';
        }
        var str = (symbolStr + ' ' + ifCentralPipes[i].value);

        GO_ifCentralPipe = GO_ifCentralPipes.create(ifCentralPipes[i].x, ifCentralPipes[i].y, 'ifCentralPipe');
        GO_ifCentralPipe.symbolStr = symbolStr;
        GO_ifCentralPipe.value = ifCentralPipes[i].value;
        var GO_text = game.add.text(GO_ifCentralPipe.x, GO_ifCentralPipe.y, str, { fontSize: '12px', fill: '#fff' });

        //GO_ifCentralPipes = 
    }
    /** if left */
    GO_ifLeftPipes = game.add.group();
    GO_ifLeftPipes.enableBody = true;
    for (var i = 0; i < ifLeftPipes.length; i++) {
        GO_ifLeftPipe = GO_ifLeftPipes.create(ifLeftPipes[i].x, ifLeftPipes[i].y, 'ifLeftPipe');
    }
    /** if right */
    GO_ifRightPipes = game.add.group();
    GO_ifRightPipes.enableBody = true;
    for (var i = 0; i < ifRightPipes.length; i++) {
        GO_ifRightPipe = GO_ifRightPipes.create(ifRightPipes[i].x, ifRightPipes[i].y, 'ifRightPipe');
    }
    /** atribute */
    GO_atrPipes = game.add.group();
    GO_atrPipes.enableBody = true;
    console.log('Grupo atr');
    console.log(GO_atrPipes);
    console.log(GO_atrPipes.body);
    for (var i = 0; i < atrPipes.length; i++) {
        GO_atrPipe = GO_atrPipes.create(atrPipes[i].x, atrPipes[i].y, 'atrPipe');
        GO_atrPipe.value = atrPipes[i].value;
        GO_atrPipe.operation = atrPipes[i].operation;
        //GO_atrPipe.body.immovable = true;
        var GO_text = game.add.text(GO_atrPipe.x, GO_atrPipe.y, atrPipes[i].operation + ' ' + atrPipes[i].value, { fontSize: '12px', fill: '#fff' });

    }

    GO_whilePipes = game.add.group();
    GO_whilePipes.enableBody = true;
    for (var i = 0; i < whilePipes.length; i++) {
        GO_whilePipe = GO_whilePipes.create(whilePipes[i].x, whilePipes[i].y, 'whilePipe');
        var symbolStr = '';
        if (whilePipes[i].boolValue === 'true') {
            symbolStr = '==';
        } else {
            symbolStr = '!=';
        }
        GO_whilePipe.value = whilePipes[i].value;
        GO_whilePipe.operation = whilePipes[i].operation;
        GO_whilePipe.symbolStr = symbolStr;
        var GO_text = game.add.text(GO_whilePipe.x, GO_whilePipe.y, symbolStr + ' ' + whilePipes[i].value, { fontSize: '12px', fill: '#fff' });

    }

    GO_endwhilePipes = game.add.group();
    GO_endwhilePipes.enableBody = true;
    for (var i = 0; i < endwhilePipes.length; i++) {
        GO_endwhilePipe = GO_endwhilePipes.create(endwhilePipes[i].x, endwhilePipes[i].y, 'whilePipe');
    }

}

function update() {
    if (generate === false) {
        console.log('nada pra fazer aqui');
    } else {
        console.log('vai criar');
        generateElements();
        generate = false;
    }
    if (ballsGroup) {
        for (var i = 0; i < ballsGroup.length; i++) {
            if (game.physics.arcade.overlap(ballsGroup[i], GO_atrPipes, atrCollisionHandler, processHandler, this)) {
                console.log('pegou atr');
            } else {}
        }

        for (var i = 0; i < ballsGroup.length; i++) {
            if (game.physics.arcade.overlap(ballsGroup[i], GO_ifCentralPipes, ifCollisionHandler, processHandler, this)) {
                console.log('pegou if');
            }
        }

        for (var i = 0; i < ballsGroup.length; i++) {
            if (game.physics.arcade.overlap(ballsGroup[i], GO_whilePipes, whileCollisionHandler, processHandler, this)) {
                console.log('pegou comeco while');
            }
        }
        for (var i = 0; i < ballsGroup.length; i++) {
            if (game.physics.arcade.overlap(ballsGroup[i], GO_endwhilePipes, endwhileCollisionHandler, processHandler, this)) {
                console.log('pegou fim while');
            }
        }
    }

    /*for (var i = 0; i < GO_balls.length; i++) {
        balls_text[i].x = GO_balls[i].x;
        balls_text[i].y = GO_balls[i].y;
    }*/

    /**
     * A idéia aqui é criar uma colisão de cada bola com cada grupo
     * (Exceto com ifs e elses, já que esses não tem função além do cano central)
     * Ao detectar a posição da bola com um grupo, checa qual elemento do grupo tem
     * aquela posição em x,y e pega os dados dele. A partir daí define o que fazer.
     */

}
/**PEGANDO AS FUNCOES DAS ARVORES PQ NE */
var getLeftBiggestPosition = function(array, value) {
    var biggest = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] < value && array[i] > biggest) {
            biggest = array[i];
        }
    }
    if (array[i] === value) return 0;
    return biggest;
}
var getRightSmallestPosition = function(array, value) {
    var smallest = 800;
    for (var i = 0; i < array.length; i++) {
        if (array[i] > value && array[i] < smallest) {
            smallest = array[i];
        }
    }
    if (array[i] === value) return 800;
    return smallest;
}

function processHandler(ball, pipe) {

    return true;

}
/** COLLISION HANDLERS AQUI */
function atrCollisionHandler(ball, pipe) {

    var numToadd = parseInt(pipe.value);

    console.log('cano');
    console.log(pipe);
    console.log(ball.value);
    switch (pipe.operation) {
        case '+':
            ball.value += numToadd;
            break;
        case '-':
            ball.value -= numToadd;
            break;
        case '*':
            ball.value *= numToadd;
            break;
        case '/':
            ball.value /= numToadd;
            break;
    }
    ballsDiv.innerHTML = 'bateu em alguma coisa';
    getBallsValues(ballsGroup, ballsDiv);
    ball.y += 30;
}

function ifCollisionHandler(ball, pipe) {
    var positions;
    console.log('foi o if');
    if (pipe.symbolStr === '==') {
        ball.y += 40;
        if (ball.value === pipe.value) {
            positions = GO_ifLeftPipes.getAll().map(function(cur) {
                return cur.x;
            });
            console.log('posotions = ' + positions);
            ball.x = getLeftBiggestPosition(positions, pipe.x);
        } else {
            positions = GO_ifRightPipes.getAll().map(function(cur) {
                return cur.x;
            });
            console.log('posotions = ' + positions);
            ball.x = getRightSmallestPosition(positions, pipe.x);
        }
    } else {

    }

    console.log(pipe);
}

function whileCollisionHandler(ball, pipe) {
    console.log('while collision');
    if (pipe.symbolStr === '==') {
        console.log('igual');
        if (ball.value === pipe.value) {
            ball.toWhile = pipe.y;
        } else {
            ball.toWhile = -1;
        }
    } else if (pipe.symbolStr === '!=') {
        console.log('while collision didnt work');
        if (ball.value !== pipe.value) {
            ball.toWhile = pipe.y;
        } else {
            ball.toWhile = -1;
        }
    }
    console.log(ball.toWhile);
    console.log('balltowhile');
    /**COMO FUNCIONA ESSA PARADA?
     * A bola bate no cano inicial, se ela cumprir a condição,quando ela bater no
     * proximo endwhile ela volta pro while.
     * Vou precisar de duas colisoes aqui.
     * NA VERDADE, acho que so a colisao no final e importante.
     * MENTIRA, é importante. Preciso adicionar na bola o atributo toWhile, vai
     * ter a posição em x do while pra onde a bola tem que voltar no final do endwhile.
     * Se for false, a bola não volta.
     */
}

function endwhileCollisionHandler(ball, pipe) {
    console.log('fim do while');
    if (ball.toWhile > 0) {
        console.log('ta indo no fim');
        ball.y = ball.toWhile;
    } else {

        console.log('nao ta indo no fim');
    }
    console.log(ball.value);
}