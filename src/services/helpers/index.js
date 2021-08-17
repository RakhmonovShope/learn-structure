import { toast } from "react-toastify";
import get from "lodash/get";

const isEnableLang = lang => {
	switch (lang) {
		case "ru":
			return true;
		case "uz":
			return true;
		default:
			return false;
	}
};

const stringToCode = element => {
	const content = element.textContent;

	function toNode(iframeString) {
		const div = document.createElement("div");
		div.innerHTML = iframeString;
		const isYoutubePlayer = iframeString.includes("youtube.com");
		if (isYoutubePlayer) div.classList.add("youtube-player-wrapper");
		return div;
	}

	const parent = element.parentNode;
	const childOembed = parent.querySelector("code");
	childOembed.replaceWith(toNode(content));
};

const generateNewPath = (langCode, item, key = "slug") => {
	let newPath = "";

	const pathname = window.location.pathname;
	const splitPath = pathname.split("/");

	let _l = get(item, "translations", []).find(i => i.lang === langCode);
	let hasL = isEnableLang(splitPath[1]);

	if (item) {
		if (_l) {
			let beingArr = ["", langCode];
			let arr = [];
			if (hasL) {
				arr = [...beingArr, splitPath[2], _l[key]];
			} else {
				arr = [...beingArr, splitPath[1], _l[key]];
			}
			newPath = arr.join("/");
		} else {
			let beingArr = ["", langCode];
			newPath = beingArr.join("/");
		}
	}

	if (!item) {
		if (isEnableLang(splitPath[1])) {
			splitPath[1] = langCode;

			newPath = splitPath.join("/");
		} else {
			let beingArr = ["", langCode];
			let arr = [...beingArr, ...splitPath.slice(1)];

			newPath = arr.join("/");
		}
	}

	return newPath;
};

export default { isEnableLang, generateNewPath, stringToCode };
