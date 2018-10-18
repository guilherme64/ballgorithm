/*const Line = {
	block : -1,
	content : [],
	type:-1,
	x: 0,
	y:0,
	show: function(){
		console.log('this line has '+ this.content + ' on block '+ this.block+ ' and its type is ' +this.type);
	}
}*/
function max(array) {
    var max = array[0];
    for (var i = 0; i < array.length; i++) {
        if (array[i] >= max) {
            max = array[i];
        }
    }
    return max;
}

function Crossroads() {
    //estrutura responsavel por organizar os objetos linhas em posicoes
    //depois de ter as posições dos elementos em X e Y, os objetos vão ser transformados em
    //objetos do jogo de cada tipo e depois colocados em arrays pra serem instanciados dentro do jogo
    var starterPositionX = 400;
    var starterPositionY = 10;
    var Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.below = null;
        this.before = null;

    };
    var xPositions = [];
    var root = null;
    var lastNode = null;

    this.insert = function(key) {
        var newNode = new Node(key);
        if (root === null) {
            root = newNode;
            //definindo o no raiz com as posicoes iniciais
            root.key.x = starterPositionX;
            root.key.y = starterPositionY;
        }
        if (lastNode === null) {
            lastNode = newNode;
        } else {
            insertNode(lastNode, newNode);
        }
    };


    var farthestIfChild = function(node) {
        if (node === null) {
            return 0;
        } else {
            return max([node.key.y, farthestIfChild(node.left), farthestIfChild(node.right), farthestIfChild(node.below)]);
        }
    }

    var getXPositions = function(node) {
        //ESSA BUSCA FUNCIONA COMO PROCURAR UM Nó MENOR QUE A CHAVE EM UMA BST
        if (node !== null) {
            console.log('olha o no manow');
            if (node.key.type === 2) {
                console.log('adicionando em xPositions');
                xPositions.push(node.key.x);
            }

            getXPositions(node.left);
            getXPositions(node.below);
            getXPositions(node.right);
        }
    }
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

    var findIfs = function(root) {
        //funcao pra criacao dos canos que ligam ifs aos filhos
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
    var getIfPositions = function(node, where) {
        // com o nó que eu quero encontrar a posição

        xPositions = [];
        console.log('vai adiciinar o if');
        if (node !== null) {
            var nearNode = node;
            var farNode;
            while (nearNode !== null && nearNode.key.type !== 2) {
                console.log('procurando o pai huehue');
                console.log(nearNode.key.type + ' aqui o tipo');
                //enquanto o nó não for 2 e o nó antes não for null
                nearNode = nearNode.before;
            }
            if (nearNode !== null) {
                console.log('achou');
                if (nearNode.key.type === 2) {
                    //provavelmente vai ser o primeiro caso
                    console.log('achou o primeiro 2 perto ' + nearNode.key.type);
                    console.log(nearNode.key.x + ' x de nearNode');


                    getXPositions(root);
                    console.log(xPositions);
                    var otherValue;
                    //var xPositions  = [];
                    if (where === 'left') {
                        otherValue = getLeftBiggestPosition(xPositions, nearNode.key.x);

                    } else {
                        otherValue = getRightSmallestPosition(xPositions, nearNode.key.x);
                    }
                    return (otherValue + nearNode.key.x) / 2;
                }
            }
        }

    }

    var assignPositions = function(newNode, where) {
        newNode.key.y = newNode.before.key.y + 20;
        if (where === 'left') {
            newNode.key.x = getIfPositions(newNode, where);
        } else if (where === 'right') {
            //newNode.key.x = newNode.before.key.x + newNode.before.key.x/2;
            newNode.key.x = getIfPositions(newNode, where);
        }
        /*else if(newNode.key.type === 7){
        			//procurando o pai do 7 // tem que ser do mesmo bloco e um 2
        			var node = newNode;
        			//console.log('');
        			/*while(node !== null && node.key.type !== 2){
        				node = node.before;
        			}//chegou no nó que eu quero
        			if(node.key.type === 2){
        				//console.log('o no pai aqui '+node.key.y  );
        				newNode.key.x = node.key.x;
        				//var newNodeY = farthestIfChild(node);
        				//newNode.key.y = newNodeY + 20;
        			}
        			newNode.key.x = node.key.x;

        			//console.log('' +farthestIfChild(node)+ 10);
        			
        			//função pra buscar o primeiro tipo 2 que tem em cima e pegar a x dele e a y do filho com y maior
        		}else if(newNode.key.type === 6){
        			var node = newNode;
        			//console.log('');
        			while(node !== null && node.key.type !== 5){
        				node = node.before;
        			}//chegou no nó que eu quero
        			if(node.key.type === 5){
        				//console.log('o no pai aqui '+node.key.x  );
        				newNode.key.x = node.key.x;
        				
        			}
        		}*/
        else {
            newNode.key.x = newNode.before.key.x;
        }

        //usando 10 pro y
        //console.log('aqui '+newNode.key.x+' '+newNode.before.key.y);

    }



    //funcao de insercao considerando a identacao
    //caralho faz isso recursivo. vai inserindo nos filhos
    //funcao pra adicionar nos, so pra evitar TANTA repeticao
    var addToNode = function(node, newNode, where) {
        switch (where) {
            case 'left':
                if (node.left === null) {
                    newNode.before = node;
                    node.left = newNode;
                    lastNode = newNode;
                }
                break;
            case 'right':
                if (node.right === null) {
                    newNode.before = node;
                    node.right = newNode;
                    lastNode = newNode;
                }
                break;
            case 'below':
                if (node.below === null) {
                    newNode.before = node;
                    node.below = newNode;
                    lastNode = newNode;

                }
                break;
        }
        assignPositions(newNode, where);
    }
    var insertNode = function(node, newNode) {
        //TIPOS DE INSERÇÃO
        //1 - NO DO MESMO BLOCO QUE NAO E IF OU ELSE
        //2 - NO DO MESMO BLOCO QUE E IF
        //3 - NO DO MESMO BLOCO QUE E ELSE
        //4 - NO DE BLOCOS DIFERENTES
        //4.1 - NO QUE E DE BLOCO MENOR QUE O ANTERIOR
        //TANTO FAZ O TIPO DE NO
        //4.2 - NO QUE E DE BLOCO MAIOR QUE O ANTERIOR
        //4.2.1 - ELSE -> SOBE PRO NO DE IF TIPO 2 E COLOCA NA DIREITA
        //4.2.2 - ENDIF -> SALVA NO ULTIMO NO QUE LEU, SER DIFERENTE NAO FAZ DIFERENCA
        //4.2.3 - ENDWHILE -> MESMA COISA DO ENDIF, NAO FAZ MUITA DIFERENCA

        //como o insert chama em lastNode, TECNICAMENTE, SEMPRE VAI SER NULO
        //INSERCAO EM NOS NO MESMO BLOCO
        if (node.key.block === newNode.key.block) {
            //ADICIONANDO NO MESMO BLOCO IF
            if (newNode.key.type === 8) {
                if (node.key.type === 2) {
                    addToNode(node, newNode, 'left');
                    console.log('adicionando na esquerda' + newNode.key.type + ' ' + newNode.key.block);

                } else {
                    console.log('adicionando if em local invalido ' + node.key.type + ' ' + node.key.block);
                }
                //ADICIONANDO NO MESMO BLOCO ELSE
            } else if (newNode.key.type === 4) {
                if (node.key.type === 2) {
                    addToNode(node, newNode, 'right');
                    console.log('adicionando na direita ' + newNode.key.type + ' ' + newNode.key.block);


                } else {
                    //é o que sempre vai acontecer, já que ele vai passar pelo if
                    console.log('adicionando else em local invalido 4 ' + node.key.type + ' ' + node.key.block);
                    insertNode(node.before, newNode);
                }
            } else {
                //adicionando blocos normais
                addToNode(node, newNode, 'below');

            }
        } else {
            //INSERCAO DE NOS EM BLOCOS DIFERENTES
            if (newNode.key.block > node.key.block) {
                //CASO DOS NOS DENTRO DE IFS, ELSES OU WHILES
                //UNICO CASO DE NO QUE VAI FICAR COM O BLOCO ABAIXO DO ANTERIOR
                if (node.key.type === 8 || node.key.type === 4 || node.key.type === 5) {
                    addToNode(node, newNode, 'below');
                }

            } else {
                //OBVIAMENTE O BLOCO VAI SER MENOR
                //SE O BLOCO E MENOR, SO PODE SER ELSE, ENDIF E ENDWHILE
                if (newNode.key.type === 4) {
                    //SE FOR ELSE
                    if (node.key.block !== newNode.key.block || node.key.type !== 2) {
                        //se o no nao for um 2 e nao for do mesmo bloco, nao e O break if que importa, entao
                        insertNode(node.before, newNode);
                        console.log('subindor' + ' ' + node.before.key.type + ' ' + node.before.key.block + ' ' + newNode.key.type + ' ' + newNode.key.block);
                    }
                } else if (newNode.key.type === 7 || newNode.key.type === 6) {
                    //SE FOR ENDIF
                    addToNode(node, newNode, 'below');
                }
            }
        }
    };
    this.inOrderTraverse = function(callback) {
        inOrderTraverseNode(root, callback); //{1}
    };

    var inOrderTraverseNode = function(node, callback) {
        if (node !== null) { //{2}
            callback(node.key);
            inOrderTraverseNode(node.left, callback);
            inOrderTraverseNode(node.below, callback);
            inOrderTraverseNode(node.right, callback);

        }
    };


    /*isso aqui ta levemente errado


    le a linha. vai pro final (final no esquerdo = null)
    Se a linha NAO for 3, coloca ela ali mesmo
    Se a linha for 3 ela vai buscar o 'pai' da ultima linha
    Escreve no no direito do pai.
    escreveu a linha? Entao agora atualiza a posicao dela
    //AINDA NAO DEFINI COMO DETERMINAR O PAI

    get nearestleft e getnearestleft tem que ser implementadas de novo
    */
}


function printNode(value) { //{6}
    console.log(value.block + ' ' + value.type + ' POSICOES :X ' + value.x + ' :Y ' + value.y);
}
//tree.inOrderTraverse(printNode);