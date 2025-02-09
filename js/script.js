async function switch_page(id, src) {
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
				frame.innerHTML = await response.text();

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

main();
