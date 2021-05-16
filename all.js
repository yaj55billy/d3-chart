
axios.get('./data.json')
	.then((res) =>{
		generateData(res);
	})
	.catch(function (error) { 
		errorFunc(error);
	});

function generateData(res){
	let dataHandler = res.data.objlist.reverse(),
		dataDate = [], dataTrade = [], dataUnitPrice = [];

	dataHandler.forEach((ele) => {
		dataDate.push(ele.Date); // 日期
		dataTrade.push(ele.TradeHouse); // 交易數量
		dataUnitPrice.push(ele.UnitPrice); // 每坪單價
	});	

	let chart = c3.generate({
    bindto: '#chart',
    data: {
			x: 'x',
			columns: [
				['x', ...dataDate],
				['price', ...dataUnitPrice], //每坪單價
				['nh', ...dataTrade] // 戶數
			],
			type: 'line',
			types: {
				'nh': 'bar'
			},
			axes: {
				'nh': 'y2'
			},
			names: {
				price: '成交單價',
				nh: '成交戶數'
			},
			colors: {
				price: '#FFAA15',
				nh: '#DBDBDB',
			},
			// regions: {
			// 	'price': [{'start': 1, 'end':2, 'style':'dashed'}],
			// },
			onmouseover: function (d) { 
				if(d.id === "nh"){
					// chart.tooltip.show = true;
				}
			}
    },
    axis: {
			x: {
				type: 'category',
			},
			y: {
				padding: { bottom: 0 },
				min: 40, // fake range
				max: 68, // fake range
				tick: {
					values: [40,46,51,57,62,68], // fake range
					count: 6
				},
				label: '單價/萬',
			},
			y2: { // nh
				show: true,
				padding: { bottom: 0 },
				min: 0,
				max: 5, // fake range
				tick: {
					values: [0,1,2,3,4,5], // fake range
					count: 6
				},
				label: '成交/戶'
			}
    },
		grid: {
			x: {
				show: true
			},
			y: {
				show: true
			}
		},
		legend: {
			position: 'right'
		},
		bar: {
			width: 20
		},
		point: {
			r: 4,
		},
	});
}

function errorFunc(error) {
	console.log(error);
	// document.querySelector('#chart').innerText(error);
}

