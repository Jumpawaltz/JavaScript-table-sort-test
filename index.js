(function () {
	let table = document.querySelector('#table');
	let ths = document.querySelectorAll('th');
	let tbody = document.querySelector('tbody');
	let checkAll = document.querySelector('#checkAll');
	let rows = tbody.querySelectorAll('tr');
	let checkOneList = tbody.querySelectorAll('[type=checkbox]');

	// 点击表头进行升序/降序排序，根据数据类型进行排序（数字/字符串）
	// 点击全选/全不选按钮，控制所有复选框的状态
	// 点击任意一个复选框，控制全选按钮的状态
	// 在实现这些功能的过程中，你使用了事件监听器、DOM 操作、正则表达式、数组排序等 JavaScript 技术。同时，你也熟悉了闭包的概念，学会了如何在闭包中记录上一次的状态。

	function init() {
		autoEvents();
	}

	// 所有事件绑定
	// 给所有CheckBox绑定时间,和表头绑定事件,实现升序和降序, 动态根据数据类型进行排序(字符串排序,数字排序)
	function autoEvents() {
		// 单选按钮绑定, 使用事件委托
		tbody.addEventListener('click', checkList);
		//全选事件绑定
		checkAll.addEventListener('click', onCheckAllClick);
		// 表头事件绑定
		ths.forEach((node, index) => {
			node.addEventListener('click', thsFun(index, thsrow));
		});
	}
	function thsFun(index, fn) {
		let order = 'asc';
		return function () {
			let orderList = fn(order, index);
			console.log('orderList', orderList);
			order = order === 'asc' ? 'desc' : 'asc';
			Array.prototype.slice.call(orderList).forEach((orderItem) => {
				tbody.appendChild(orderItem);
			});
		};
	}
	// thead里面th 根据数据类型进行排序,实现顺序和降序
	function thsrow(order, index) {
		let type =
			document.querySelectorAll('tbody>tr')[0].children[index].innerText;
		let isNumber = /^\d+$/.test(type);
		console.log('type', type);
		let orderList;
		orderList = Array.prototype.slice.call(rows).sort(function (a, b) {
			a = a.querySelectorAll('td')[index].innerHTML;
			b = b.querySelectorAll('td')[index].innerHTML;
			if (isNumber) {
				if (order === 'asc') {
					return a - b;
				} else if (order === 'desc') {
					return b - a;
				}
			} else if (order === 'asc') {
				return a.localeCompare(b, 'zh');
			} else if (order === 'desc') {
				return b.localeCompare(a, 'zh');
			}
		});
		return orderList;
	}

	// 点击全选按钮，控制所有复选框的状态
	function onCheckAllClick(e) {
		e.stopPropagation();
		let status = this.checked;
		console.log('status', status);
		checkOneList.forEach((node) => {
			node.checked = status;
		});
	}
	// 点击任意一个复选框，控制全选按钮的状态
	function checkList(e) {
		let times = 0;
		if (e.target.type === 'checkbox') {
			e.target.checked;
			checkOneList.forEach((node) => {
				node.checked && times++;
			});
			checkAll.checked = times === checkOneList.length;
		}
	}
	init();
})();
