async function set_background_by_url(url, id = "") {
	if (id == "") {
		document.documentElement.style.setProperty(
			"background-image",
			"url(" + url + ")"
		);
	} else {
		element = document.getElementById(id);

		if (element) {
			element.style.setProperty("background-image", "url(" + url + ")");
		} else {
			log.error(`Element with id '${id}' is undefined!`);
			return false;
		}
	}
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function get_random_image() {
	let availableImages = []; // Массив для хранения всех доступных изображений

	// Проверяем, есть ли разрешенные группы
	for (let group in properties) {
		if (properties[group].enabled) {
			for (let category in properties[group]) {
				if (properties[group][category].enabled) {
					// Получаем массив изображений из images
					let imagesArray = images[group][category];

					// Если есть изображения, добавляем их в общий массив
					if (imagesArray && imagesArray.length > 0) {
						availableImages.push(
							...imagesArray.map(
								(img) => `images/${group}/${category}/${img}`
							)
						);
					}
				}
			}
		}
	}

	// Если есть доступные изображения, выбираем случайное
	if (availableImages.length > 0) {
		let randomIndex = Math.floor(Math.random() * availableImages.length);
		return availableImages[randomIndex]; // Возвращаем случайное изображение
	}

	return null; // Если не найдено ни одного изображения
}

var image_animation_time = 2500;
var image_switch_interval = 20000;
var div = document.getElementById("image_animation_div");

var image_switch_interval = setInterval(() => {
	switch_image();
}, image_switch_interval);

async function css_main() {
	set_background_by_url("../" + get_random_image());
	div.style.setProperty(
		"transition",
		`all ${image_animation_time}ms ease-in-out`
	);
}

async function switch_image() {
	image = get_random_image();

	set_background_by_url("../" + image, div.id);
	div.style.setProperty("opacity", "1");

	setTimeout(() => {
		set_background_by_url("../" + image);

		setTimeout(() => {
			div.style.setProperty("opacity", "0");
		}, image_animation_time * 1.1);
	}, image_animation_time * 1.1);

	clearInterval(image_switch_interval);
	image_switch_interval = setInterval(() => {
		switch_image();
	}, 20000);
}

/*
// Пример использования
var randomImage = get_random_image();
console.log(randomImage); // Выводит случайное изображение из разрешённых групп
*/

css_main();
