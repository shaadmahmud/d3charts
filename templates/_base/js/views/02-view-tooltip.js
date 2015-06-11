// Tooltip
var TooltipView = ChartView.extend({
	tooltipEvents: function(shape, num, tooltip_html) {
		var chart = this;
		var opts = chart.options;
		var tooltip = d3.select(this.el).select('.tooltip');

		// Need the SVG done before we call the tooltip function
		shape.on("mouseover", function (d) {
			// var name = d3.select(this.parentNode).datum()['name'];

			var tooltip_html = 'Text goes here: ';
			tooltip_html += d[ opts.chartable_columns[num] ];

			$('#tooltip-' + opts['el_num'] ).html(tooltip_html);
			return tooltip.style("visibility", "visible");
		})
		.on("mousemove", function () {
			// This determines if we are hovering over a dot
			// On the left or right side of the screen
			var left_right = $(window).width() / d3.event.pageX;

			if (left_right > 2) {
				var left_position = -16;
			} else {
				var left_position = $('#tooltip-' + opts['el_num']).width() + 32;
			}

	    	return tooltip
				.style("top", (d3.event.pageY + 16) + "px")
				.style("left", (d3.event.pageX - left_position) + "px");
		})
		.on("mouseout", function () {
			return tooltip.style("visibility", "hidden");
		});
	// Close events
	}
// Close view
});