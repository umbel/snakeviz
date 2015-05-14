var files = JSON.parse(jsonfiles);

function render() {
	var html = files.map(fileTemplate);
	$('tbody').html(html);
}

var fileTemplate = template(''
							+ '<tr>'
							+   '<td><a href="/snakeviz/{{name}}">{{name}}</a></td>'
							+   '<td>{{size}}</td>'
							+   '<td>{{totalTime}}</td>'
							+  '</tr>'
						   );

$(document).on('click', 'th', function (e) {
	var sortParam = $(e.currentTarget).data('column');

	sortBy(files, sortParam);
	render();
});

function sortBy(arr, sortParam) {
	return files.sort(function (left, right) {
		var a = left[sortParam];
		var b = right[sortParam];

		if (a !== b) {
			if (a > b || a === void 0) return -1;
			if (a < b || b === void 0) return 1;
		} else {
			return 0;
		}
	});
}

render();

function template(tpl) {
	return function(data) {
		var html = tpl.slice();
		for(var p in data) {
			html = html.replace(new RegExp('{{' + p + '}}', 'g'), data[p]);
		}

		return html;
	};
}

// sort by time initially
$("#timelink").click();
