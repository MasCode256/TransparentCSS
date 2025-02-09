function switch_page(id, url) {
	frame = document.getElementById(id);

	const iframeDocument = frame.contentDocument || frame.contentWindow.document;
	for (i = 0; true; i++) {
		if (iframeDocument.readyState === "complete") {
			break;
		} else if (i > 2000) {
			return false;
		}
	}

	iframeDocument.getElementById("sub_page").classList.toggle("invisible");

	frame.classList.toggle("process", false);
	frame.src = url;

	frame.addEventListener("load", () => {
		setTimeout(() => {
			console.log("Содержимое iframe загружено!");
			frame.classList.toggle("process", false);
			iframeDocument
				.getElementById("sub_page")
				.classList.toggle("invisible", false);
		}, 1000);
	});

	return true;
}
