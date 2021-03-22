

class MyMath {

	constructor() {
		this.opers = {
			'^' : (a,b) => a ** b,
			'*' : (a,b) => a *  b,
			'/' : (a,b) => a /  b,
			'+' : (a,b) => a +  b,
			'-' : (a,b) => a -  b,
		}
		this.operQueue = [['^'] , ['*', '/'], ['+', '-']];
	}

	transformExpr(str) {
		/*Удаляем все пробелы*/
		str = str.replace(/\s/g, '')
		/*Ищет в строке знаки операции и окружает их пробелами*/
		return str.replace(/([/*-+\^])/g, ' $1 ')
	}

	eval(expr) {
		expr = this.transformExpr(expr).split(' ');
		const opers = this.opers;
		const queue = this.operQueue

		for (let i=0; i < queue.length; i++) {

			for (let j = 0; j < expr.length; j++) {
				
				if (queue[i].indexOf(expr[j]) !== -1) {

					const x = +expr[j-1];
					const y = +expr[j+1];
					const operation = expr[j];

					expr[j-1] = '';
					expr[j+1] = '';

					expr[j] = opers[operation](x,y);
					j--;
					expr = expr.filter(el => el != '')

				}

			}
		}
		return expr.join('')
	}
}


window.onload = () => {

	let a = '2+2*2+3^3';
	a = prompt('Enter expression')
	let math = new MyMath()
	console.log(a)
	console.log(math.transformExpr(a))
	console.log(math.eval(a))

}