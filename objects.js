

const Line = {
	block : -1,
	content : [],
	type:-1,
	x: 0,
	y:0,
	show: function(){
		console.log('this line has '+ this.content + ' on block '+ this.block+ ' and its type is ' +this.type);
	}
}

//objetos dos canos
const Ball = {
	value: 0,
	x: 0,
	y: 0,
	show: function(){
		console.log('this is a ball with value ' + this.value);
	}
};

const AtrPipe = {
	operation: '+',
	value: 0,
	x: 0,
	y: 0,
	show: function(){
		console.log('this is a pipe that '+ this.operation+ ' '+ this.value+' and is created at position '+this.x +' '+ this.y);
	}
}

const IfCentralPipe = {
	value: 0,
	boolValue: true,
	x: 0,
	y: 0,
	show: function(){
		console.log('this checks if the ball is ' + this.boolValue+ ' '+ this.value +' at position '+this.x +' '+ this.y);
	}
}
//tentando criar objetos pros filhos if e else do if
//talvez seja bom instanciar logo todos os elementos
//e criar uma estrutura de controle pras posicoes dos
//elementos debaixo das linhas de if e else
const IfLeftPipe = {
	x: 0,
	y: 0
	//line
}

const IfRightPipe = {
	x: 0,
	y: 0
	//line
}

const WhilePipe = {
	value: 0,
	boolValue: true,
	x: 0,
	y: 0,
	show: function(){
		console.log('whatever happens here will happen while the ball is ' + this.boolValue+ ' '+ this.value +' at position '+this.x +' '+ this.y);
	}

}

const EndWhilePipe = {
	x:0,
	y:0
}
const EndIfPipe = {
	x:0,
	y:0
}
