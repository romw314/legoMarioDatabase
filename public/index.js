document.addEventListener('DOMContentLoaded', () => {
	const launch = document.getElementById('launchbtn');
	const dbmit = document.getElementById('dbmit');
	const colormit = document.getElementById('colormit');
	function checkLaunch() {
		launch.disabled = !(colormit.checked && dbmit.checked);
	}
	launch.addEventListener('click', () => window.location.href = 'app.html');
	dbmit.addEventListener('input', checkLaunch);
	colormit.addEventListener('input', checkLaunch);
	checkLaunch();
	setTimeout(checkLaunch, 200);
	setTimeout(checkLaunch, 400);
	setTimeout(checkLaunch, 600);
	setTimeout(checkLaunch, 800);
	setTimeout(checkLaunch, 1000);
});
