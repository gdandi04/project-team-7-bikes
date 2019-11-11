// read in the data
d3.csv('data/tremont_northampton_start_hour.csv', function(d) {
  return {
		start_hour: d.start_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer
  };
  // create a bar chart with the data that was read in
}).then(basic_bar_chart_start);

function basic_bar_chart_start(mydata) {
	// svg width
	var width = 1200;
	// svg height
	var height = 800;
	// margins around visualization
	var margin = {
		top: 80,
		bottom: 80,
		left: 100,
		right: 30
	}

	// initialize the svg witht the width, height, and margins
	var svg = d3.select(".vis-holder")
				.append('svg')
				.attr('id', 'svg-vis')
				.attr('width', width)
				.attr('height', height)
				.attr('margin', margin);

	// create the x-scale using the keys from a map call
	// x-scale contains 0:00-23:00, indicating the hour of day in 24-hour time
	var xScale = d3.scaleBand()
	  			   .domain(d3.map(mydata, function(d) { return d.start_hour; }).keys())
	  			   .range([margin.left, width-margin.right])
	  			   .padding(0.1);

	// create the y-scale with the domain being the minimum # of rides to the maximum number of rides
	var yScale = d3.scaleLinear()
	  			   .domain([d3.min(mydata, d => d.n), 
	  			   		d3.max(mydata, d => d.n)])
	  			   .range([height-margin.bottom, margin.top]);

	// add the x-axis onto the svg, scaled to xScale
	var xAxis = svg.append("g")
			   	   .attr("transform", `translate(0, ${height-margin.bottom})`)
               	   .call(d3.axisBottom().scale(xScale));
	
	// add the y-axis onto the svg, scaled to yScale
	var yAxis = svg.append("g")
			   	   .attr("transform", `translate(${margin.left}, 0)`)
               	   .call(d3.axisLeft().scale(yScale));

	var tooltip = d3.select("#svg-vis")
	    			.append("div")
	    			.attr("class", "tooltip");

	tooltip.append("div")
		   .attr("class", "count");

    // append the bars onto the svg representing the data
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
             	  .on("mouseover",mouseover)
            	  .on("mouseout",mouseout);

    rect.on('mouseenter', function (actual, i) {
        d3.select(this).attr("opacity", 0.5)
        			   .html(d3.format(".1%")(d.n))   
         .style("left", (d3.event.pageX) + "px")        
         .style("top",  (d3.event.pageY - 32) + "px")
         .transition()      
         .duration(200)     
         .style("opacity", .9)
    	})
    	.on('mouseleave', function (actual, i) {
        	d3.select(this).attr("opacity", 1)
    	});

    
    // create a x-axis title
    var xLabel = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
            		.text("Hour of Day");

    // create a y-axis title
    var yLabel = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
            		.text("Number of Trips");

    // create a chart title
    var chartTitle = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (width/2) +","+(15+(margin.bottom/3))+")")
            		.text("Tremont St at Northampton St Hourly Usage");
};