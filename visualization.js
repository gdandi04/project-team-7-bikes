var parseDate = d3.timeParse('%H:%M:%S');

d3.csv('data/tremont_northampton_start_hour.csv', function(d) {
  return {
		start_hour: d.start_hour,
		n: +d.n
  };
}).then(basic_bar_chart_start);

function basic_bar_chart_start(mydata) {
	var width = 1200;
	var height = 800;
	var margin = {
		top: 80,
		bottom: 80,
		left: 100,
		right: 30
	}

	var svg = d3.select('div.vis-holder')
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.attr('margin', margin)
				.style('background', '#f0efe1');
	
	var xScale = d3.scaleBand()
	  			   .domain(d3.map(mydata, function(d) { return d.start_hour; }).keys())
	  			   .range([margin.left, width-margin.right])
	  			   .padding(0.5);

	var yScale = d3.scaleLinear()
	  			   .domain([d3.min(mydata, d => d.n), 
	  			   		d3.max(mydata, d => d.n)])
	  			   .range([height-margin.bottom, margin.top]);

	var xAxis = svg.append("g")
			   	   .attr("transform", `translate(0, ${height-margin.bottom})`)
               	   .call(d3.axisBottom().scale(xScale));

	var yAxis = svg.append("g")
			   	   .attr("transform", `translate(${margin.left}, 0)`)
               	   .call(d3.axisLeft().scale(yScale));

    var rect = svg.append("g")
    			  .selectAll("rect")
    			  .data(mydata)
    			  .enter()
    			  .append("rect")
             	  .attr("x", function(d) { return xScale(d.start_hour); })
             	  .attr("y", function(d) { return yScale(d.n); })
             	  .attr("width", xScale.bandwidth())
             	  .attr("height", function(d) { 
					return height-margin.bottom-yScale(d.n);
             	  })
             	  .style("fill", "purple");

    var yLabel = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
            		.text("Number of Trips");
    
    var xLabel = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
            		.text("Hour of Day");

    var chartTitle = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (width/2) +","+(15+(margin.bottom/3))+")")
            		.text("Tremont St at Northampton St Hourly Usage");
};