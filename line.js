function checkLines(rawLines) {
    /*
    	essa função precisa ter uma estrutura de controle
    	que guarde dados de cada linha que passar pelo loop
    	de análise, assim fica mais fácil organizar as posições
    	dos objetos
    */
    var block;
    console.log('analizando as linhas todas');
    for (var i = 0; i < rawLines.length; i++) {
        block = 0;
        var j = 0;

        while (rawLines[i][j] === '\u0020') {
            block++;
            j++;
        }

        var curLine = createLineObject(rawLines[i]);

        /*
        	Objeto linha foi criado. Agora e importante
        	definir o que acontece assim que cada coisa acontecer

        */

        if (curLine.type === -1) {
            console.warn("sintaxe errada" + i);
            return 0;
        } else if (curLine.type === 1) {

        }
        //console.log(block + 'OIA OS BLOCO DOIDO')
        curLine.block = block;
        curLine.show();
        lines.push(curLine);
        //console.log(lines+'oia');
        //adicionando a linha de 'if' depois do breakpoint
        //leve gambiarra pra nao precisa refazer muita coisa
        if (curLine.type === 2) {
            var afterBreakPointLine = Object.create(Line);
            afterBreakPointLine.block = block;
            afterBreakPointLine.type = 8;
            lines.push(afterBreakPointLine);
        }

    }
    return 1;
}



function createLineObject(line) {
    //passa a ser createLineObject
    //todos os objetos comecam com bloco 
    var newLine = Object.create(Line);


    // normalizando o numero de espacos
    line = line.replace(/\s+/g, ' ');

    console.log(line);

    //regex que representam o formato de linha ideal
    //linha 1
    //new ball = 2;
    var newBallLine = /^\s*new ball\s*=\s*\d{1,2}\s*;\s*$/;

    //linha 2
    //if ball == 5 do:
    var ifLine = /^\s*if ball\s*(==|!=)\s*\d{1,2}\s*:\s*$/

    //linha 3
    //pipe is - 3;
    var pipeExpressionLine = /^\s*pipe is [+-/*]\s*\d{1,2}\s*;\s*$/

    //linha 4
    //else:
    var elseLine = /^\s*else\s*:\s*$/

    //linha 5
    //while ball == 4 do:
    var whileLine = /^\s*while ball\s*(==|!=)\s*\d{1,2}\s*:\s*$/

    //linha 6
    //endwhile;
    var endwhileLine = /^\s*endwhile\s*;\s*$/

    //linha 7
    //endif;
    var endifLine = /\s*endif\s*;\s*/

    //linha 8 -  nao existe na sintaxe
    //vai ser o breakpoint pra dividir o if em esquerda e direita

    var isBallLine = newBallLine.test(line);
    var isIfLine = ifLine.test(line);
    var isPipe = pipeExpressionLine.test(line);
    var iselseLine = elseLine.test(line);
    var isWhileLine = whileLine.test(line);
    var isEndwhileLine = endwhileLine.test(line);
    var isEndifLine = endifLine.test(line);

    //removendo ponto e virgula pra testes
    line = line.replace(/;|:/, '');
    var lineElements = line.split(' ');
    if (lineElements[0] === '') {
        //removendo de content espacos vazios
        lineElements.shift();
    }
    //console.log(line);
    if (isBallLine) newLine.type = 1;
    else if (isIfLine) {

        //O QUE FAZER QUANDO A LINHA TEM UM IF
        //CHAMA OS SPRITES
        //DEFINE A POSICAO X do if e a y
        //a posicao dos elementos embaixo dele em x e a mesma
        //quando tiver um else muda a posicao em x tb e tenta fazer
        //a mesma coisa

        //linha dividida: if, ball, ==|!=, 4

        newLine.type = 2;
    } else if (isPipe) newLine.type = 3;
    else if (iselseLine) newLine.type = 4;
    else if (isWhileLine) newLine.type = 5;
    else if (isEndwhileLine) newLine.type = 6;
    else if (isEndifLine) newLine.type = 7;
    else newLine.type = -1;
    newLine.content = lineElements;
    //OW! quando for linha tipo 2 cria OUTRA LINHA.
    // a ideia e ter a linha de if (2, que vai ser um breakpoint) e a outra linha,
    //que vai ser o equivalente ao else, da esquerda
    return newLine;
}
/*
	\/ Essa função aqui vai rodar uma vez pra cada linha,
	ela não vai rodar uma vez pro vetor
*/
function createElementObject(lineObject) {
    /*essa funcao aqui vai receber os dados de um lineObject
    e instanciar um objeto da tela baseado nos dados desse lineObject.
    Importante lembrar que esse ainda nao e o objeto de tela definitivo,
    mas ta no caminho */
    var newObject;

    switch (lineObject.type) {


        case 1:
            //bola
            newObject = Object.create(Ball);
            newObject.value = parseInt(lineObject.content[3]);
            newObject.x = lineObject.x;
            newObject.y = lineObject.y;
            balls.push(newObject);
            break;

        case 2:
            newObject = Object.create(IfCentralPipe);
            newObject.value = parseInt(lineObject.content[3]);
            console.log(newObject.value + 'oia o value');
            newObject.x = lineObject.x;
            newObject.y = lineObject.y;
            if (lineObject.content[2] === '==') {
                newObject.boolValue = true;
            } else {
                newObject.boolValue = false;
            }
            ifCentralPipes.push(newObject);
            break;

        case 3:
            newObject = Object.create(AtrPipe);
            newObject.value = parseInt(lineObject.content[3]);
            newObject.operation = lineObject.content[2];
            newObject.x = lineObject.x;
            newObject.y = lineObject.y;
            atrPipes.push(newObject);
            break;

        case 4:
            newObject = Object.create(IfRightPipe);
            newObject.x = lineObject.x;
            newObject.y = lineObject.y;
            ifRightPipes.push(newObject);
            break;

        case 5:
            newObject = Object.create(WhilePipe);
            newObject.x = lineObject.x;
            newObject.y = lineObject.y;
            newObject.value = parseInt(lineObject.content[3]);
            if (lineObject.content[2] === '==') {
                newObject.boolValue = true;
            } else {
                newObject.boolValue = false;
            }
            whilePipes.push(newObject);
            break;

        case 6:
            newObject = Object.create(EndWhilePipe);
            newObject.x = lineObject.x;
            newObject.y = lineObject.y;
            endwhilePipes.push(newObject);
            break;

        case 7:
            newObject = Object.create(EndIfPipe);
            newObject.x = lineObject.x;
            newObject.y = lineObject.y;
            endifPipes.push(newObject);
            break;

        case 8:
            newObject = Object.create(IfLeftPipe);
            newObject.x = lineObject.x;
            newObject.y = lineObject.y;
            ifLeftPipes.push(newObject);
            break;

    }
    //console.log(newObject);
}