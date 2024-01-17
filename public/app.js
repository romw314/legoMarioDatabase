async function getStyled(colors) {
	const colorNames = await fetch('https://raw.githubusercontent.com/bahamas10/css-color-names/master/css-color-names.json').then(res => res.json());
	const result = [];
	for (const color of colors.split(' ')) {
		const hexColor = colorNames[color];
		const [r, g, b] = [parseInt(hexColor.substr(1, 2), 16), parseInt(hexColor.substr(3, 2), 16), parseInt(hexColor.substr(5, 2), 16)];
		const dimAmount = 40;
		const [dimR, dimG, dimB] = [Math.max(r - dimAmount, 0), Math.max(g - dimAmount, 0), Math.max(b - dimAmount, 0)];
		const dimmedHexColor = `#${dimR.toString(16).padStart(2, '0')}${dimG.toString(16).padStart(2, '0')}${dimB.toString(16).padStart(2, '0')}`;
		result.push(`<span style="color: ${dimmedHexColor};">${color}</span>`);
	}
	return result.join(' ');
}
async function search(str) {
	if (!window.ALL_RGB_CODES) {
		window.ALL_RGB_CODES = await fetch('https://raw.githubusercontent.com/romw314/pyLegoMario/main/pyLegoMario/ALL_RGB_CODES.json').then(response => response.json());
		window.ALL_RGB_CODES.sort(([,name1], [,name2]) => (name1 < name2) ? -1 : ((name1 > name2) ? 1 : 0));
	}
	const results = await Promise.all(window.ALL_RGB_CODES
		.filter(([colors, name]) => name.toLowerCase().includes(str) || colors.includes(str))
		.map(async ([colors, nam,,, additional]) => `<tr><td>${nam + (additional ? `, ${additional}` : '')}</td><td>${await getStyled(colors)}</td></tr>`));
	return `<thead><tr><th>Name</th><th>Code</th></thead><tbody>${results.join('')}</tbody>`;
}
document.addEventListener('DOMContentLoaded', () => {
	const tableInject = document.getElementById('tableinject');
	const finder = document.getElementById('finder');
	finder.addEventListener('input', () => search(finder.value.toLowerCase()).then(results => tableInject.innerHTML = results));
	search('').then(results => tableInject.innerHTML = results);
});
