async function set_background_by_url(url) {
	document.documentElement.style.setProperty(
		"background-image",
		"url(" + url + ")"
	);
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

async function css_main() {
	set_background_by_url("../" + get_random_image());
}

/*
// Пример использования
var randomImage = get_random_image();
console.log(randomImage); // Выводит случайное изображение из разрешённых групп
*/

css_main();
