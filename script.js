$(document).ready(function () {

	// $("nav a").on("click", function (event) {
	// 	// event.preventDefault();
	// 	$("nav").addClass("fixed");
	// 	id = ($(this).attr("href"));
	// 	scrollVertical = $(id).offset().top;

	// 	$("body, html").animate({ scrollTop: scrollVertical });
	// });

	$(document).on("scroll", function () {
		secondPage = $("nav li:nth-child(2) a").attr("href");

		if ($("body").scrollTop() >= $("nav").height()) {
			$("nav").addClass("fixed");
		} else {
			$("nav").removeClass("fixed");
		}
	});

	const randomColor = (() => {
		"use strict";

		const randomInt = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		return () => {
			var h = randomInt(0, 360);
			var s = randomInt(42, 98);
			var l = randomInt(40, 90);
			return `hsl(${h},${s}%,${l}%)`;
		};
	})();

	d3.text("data.csv", function (data) {
		var parsedCSV = d3.csv.parseRows(data);
		console.log(parsedCSV)


		for (var i = 0; i < parsedCSV.length; i++) {
			var sectionHtml = ""
			sectionHtml += "<section>"
			sectionHtml += "<div class='overlay' onclick='popup(\"" + parsedCSV[i][0] + "\")'> "
			sectionHtml += "<div class='description'>"
			sectionHtml += "<p>" + parsedCSV[i][1] + "</p>"
			sectionHtml += "<h6>Tools<span class='glyphicon glyphicon-cog'></span></h6>"

			sectionHtml += "<ul class='tools vertical-list'>"
			var list = parsedCSV[i][2].split("/")
			for (let j = 0; j < list.length; j++) {
				let color = randomColor();
				sectionHtml += "<li  style=' background-color:" + color + " ; '>" + list[j] + "</li>"
			}
			sectionHtml += "<ul>"

			sectionHtml += "</div>"
			sectionHtml += "<img src='" + parsedCSV[i][3] + "' alt='" + parsedCSV[i][4] + "' height='300'>"
			sectionHtml += "<h4 class='heading'>" + parsedCSV[i][4] + "<span class='glyphicon glyphicon-hand-up'></span>" + parsedCSV[i][5] + "</h4>"
			sectionHtml += "</div></section>"

			$("#portfolioContainer").append(sectionHtml);
		}

	});


});


function popup(src) {
	console.log(src)
	var popupHtml = "<div id='popup' class='AbsoluteCenter' style='background-color:azure;'>"
	popupHtml += "<div id='close' class='glyphicon glyphicon-remove-sign' onclick='removePopup()'></div>"
	popupHtml += "<iframe class='AbsoluteCenter90' src='" + src + "'></iframe>"
	popupHtml += "</div>"
	$('#popupContainer').append(popupHtml)
}


function removePopup() {
	$("#popup").remove()
}