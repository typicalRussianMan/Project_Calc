

class MyMath {

	constructor() {
		this.opers = {
			'^' : (a,b) => a ** b,
			'*' : (a,b) => a *  b,
			'/' : (a,b) => a /  b,
			'+' : (a,b) => a +  b,
			'-' : (a,b) => a -  b,
		}
		this.funcs = {
			' '  : (a) => a,
			'sin': (a) => Math.sin(a),
			'cos': (a) => Math.cos(a),
			'tg' : (a) => Math.tan(a),
			'ctg': (a) => 1 / Math.tan(a),
			'ln' : (a) => Math.log(a)
		}
		this.operQueue = [['^'] , ['*', '/'], ['+', '-']];
	}

	transformExpr(str) {
		/*Remove all spaces*/
		str = str.replace(/\s/g, '')
		/*Look for operations signs is the string and separate them with spaces*/
		str = str.replace(/([/*-+\^])/g, ' $1 ')
		/*Separate brackets*/
		str = str.replace(/(\()/g, '$1 ').replace(/(\))/g, ' $1')
		return str
	}

	eval(expr) {
		expr = this.transformExpr(expr);
		const opers = this.opers;
		const queue = this.operQueue;

		//Check and evaluate expression in brackets
		(() => {
			const maxRepeatCount = 500;
			let i=0; 
			while(expr.indexOf('(') !== -1) {
				expr = expr.replace(/([a-z]+|\s)\(([^)]+)\)/, (s,m1,m2) => {
					return this.funcs[m1](this.eval(m2))
				})
				expr = this.transformExpr(expr)
				i++;
				if (i > maxRepeatCount) return null
			}
		})()
		

		expr = expr.split(' ')
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

	let a = '1+cos(0)+2*(1+1)/2';
	let math = new MyMath()
	console.log(a)
	console.log(math.transformExpr(a))
	console.log(math.eval(a))
}