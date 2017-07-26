var paint = (function(canvas){
	var ctx = canvas.getContext('2d');
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';

	var brush = { // Приватное свойство-обьект. Задает дефолтное состояние кисти
		isDrawing: false, // Свойство нужно для того что б мы знаши что человек нажал на кнопку мыши и находится в контексте canvas. При нажатии ставится true
		// Если кнопка отжата или курсор вышел за пределы canvas то ставится false
		lastX: 0,
		lastY: 0,
		size: 10,
		color: `#000000`
	}

	var _draw = function(x, y) { // Приватный метод. Не доступен "из вне".
	// такой подход служит для инкапсуляции вашего кода
	// "По договоренности" приято их называть с нижним подчеркиванием
		if(!brush.isDrawing) return; // Проверяем, если пользователь нажал на кнопку и двигает курсор в canvas, то код выполняется дальше
		ctx.strokeStyle = brush.color;
		ctx.beginPath();
		ctx.moveTo(brush.lastX, brush.lastY);
		ctx.lineWidth = brush.size;
		ctx.lineTo(x, y);
		ctx.stroke();
		brush.lastX = x;
		brush.lastY = y;
	}

	return {
		// Все методы являются публичные и доступны "из вне"
		// Этим методам доступны так же данные в вашем приватном коде
		paint: function(e){
			_draw(e.offsetX, e.offsetY); // Например тут мы "дергаем" приватный метод _draw
		},
		setDrawing: function(status) {
			brush.isDrawing = status; // Или тут меняем значение isDrawing которая является приватной
		},
		setPosition: function(x, y) {
			[brush.lastX, brush.lastY] = [x, y];
		},
		setWidth: function(size) {
			brush.size = size;
		},
		setColor: function(color) { //
			brush.color = color;
		},
		setOpacity: function(opacity) {
			brush.opacity = opacity
		}
	}
}(canvas));
