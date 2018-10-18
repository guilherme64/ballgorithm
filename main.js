//vetores dos tipos de linha
var balls = [];
var ifCentralPipes = [];
var ifLeftPipes = [];
var ifRightPipes = [];
var atrPipes = [];
var whilePipes = [];
var endwhilePipes = [];
var endifPipes = [];
var lines = [];
var connectionPipes = [];
//var elements = [];


//var lines;

var rawLines;

$(window).load(function() {
    $('#build').click(function() {
        console.log('clicked');
        rawLines = $('#code').val().split('\n');
        for (var i = 0; i < rawLines.length; i++) {
            //IGNORANDO as linhas em branco
            if (rawLines[i] === '') {
                rawLines.splice(i, 1);
            }
        };
        //rawLines.splice(rawLines.indexOf(''), 1);
        console.log(rawLines);
        //tudo certo com rawLines
        checkLines(rawLines);
        //tudo certo com lines
        console.log(lines);
        var lineTree = new Crossroads();
        for (var i = 0; i < lines.length; i++) {
            lineTree.insert(lines[i]);
        }

        lineTree.inOrderTraverse(printNode);
        lineTree.inOrderTraverse(createElementObject);
        console.log(balls);
        console.log(ifCentralPipes);
        console.log(ifLeftPipes);
        console.log(ifRightPipes);
        console.log(atrPipes);
        console.log(whilePipes);
        console.log(endifPipes);
        console.log(endwhilePipes);
        generate = true;


        //uma coisa importante que eu tenho que levar em consideração:
        //no caso de ifs sem else, talvez seja bom criar um elemento else
        //pras coisas terem onde cair, mesmo tendo o endif laaaa embaixo
        //agora que as condicoes foram definidas, e bom criar os objetos mesmo
        //seguindo nesse ritmo, capaz de ja ter algo em tela amanha nesse horario
    });
});