async function fetchWithProgress(url) {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", url, true);

	// Отслеживаем прогресс загрузки
	xhr.onprogress = function (event) {
		if (event.lengthComputable) {
			const percentComplete = (event.loaded / event.total) * 100;
			console.log(`Загрузка: ${percentComplete.toFixed(2)}%`);
		}
	};

	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 300) {
			console.log("Загрузка завершена:", xhr.responseText);
		} else {
			console.error("Ошибка загрузки:", xhr.statusText);
		}
	};

	xhr.onerror = function () {
		console.error("Ошибка сети.");
	};

	xhr.send();
}

var page_history = [];

async function switch_page(id, src) {
	out(`Загрузка страницы '${src}'...`);
	//fetchWithProgress(src);

	frame = document.getElementById(id);

	var elements = document.getElementById(id).querySelectorAll("*");
	Array.from(elements).forEach((element) => {
		element.style.setProperty("transition", "all 1s ease-in-out");
	});

	if (!frame.classList.contains("process")) {
		frame.classList.toggle("process");
	}

	try {
		response = await fetch(src);

		if (!response.ok) {
			throw new Error(`Error fetching ${src}: ${response.status}`);
		} else {
			setTimeout(async () => {
				out("Успешная загрузка страницы.", "var(--success)");

				if (id == "main") page_history.push(src);

				frame.innerHTML = await response.text();
				main();

				elements = document.getElementById(id).querySelectorAll("*");
				Array.from(elements).forEach((element) => {
					element.style.setProperty("transition", "all 1s ease-in-out");
				});

				setTimeout(async () => {
					if (frame.classList.contains("process")) {
						frame.classList.toggle("process");
					}

					setTimeout(async () => {
						Array.from(elements).forEach((element) => {
							element.style.setProperty(
								"transition",
								"all var(--tt) ease-in-out"
							);

							out("");
						});
					}, 1000);
				}, 1000);
			}, 1000);
		}
	} catch (error) {
		if (frame.classList.contains("process")) {
			frame.classList.toggle("process");
		}

		console.error(error);
		frame.innerHTML = error;
		out(error, "var(--err)");
	}
}

function main() {
	const elements = document.getElementsByClassName("scalable");
	Array.from(elements).forEach((element) => {
		if (element.getAttribute("data-scale")) {
			element.style.setProperty("zoom", element.getAttribute("data-scale"));
		} else {
			console.error(
				"Error setting scale for",
				element.id,
				": data-scale is undefined."
			);
		}
	});
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function out(text, color = "var(--w)") {
	if (text.length > 0) console.log(text);

	var _out = document.getElementById("out");
	_out.style.setProperty("color", `${color}`);

	for (let index = _out.innerHTML.length; index >= 0; index--) {
		_out.innerHTML = _out.innerHTML.slice(0, -1);
		await delay(10 / (text.length + 1));
	}

	for (let index = 0; index < text.length; index++) {
		_out.innerHTML += text[index];
		await delay((10 / text.length) * index);
	}
}

function last_page() {
	switch_page("main", history[history.length - 1]);
}

document.addEventListener("DOMContentLoaded", () => {
	main();
	out("Hello, world!");
});
