// var data = d3.csv("data/tremont_northampton_start.csv").then(function(data) {
//   console.log(data);
// });

var parseDate = d3.timeParse('%H:%M:%S');

var data = d3.csv('data/tremont_northampton_start.csv', function(d) {
  return {
		tripduration: +d.tripduration,
		starttime: parseDate(d.starttime).getHours(),
		stoptime: parseDate(d.stoptime).getHours(),
		startstationid: +d.startstationid,
		startstationname: d.startstationname,
		startstationlatitude: +d.startstationlatitude,
		startstationlongitude: +d.startstationlongitude,
		endstationid: +d.endstationid,
		endstationname: d.endstationname,
		endstationlatitude: +d.endstationlatitude,
		endstationlongitude: +d.endstationlongitude,
		bikeid: +d.bikeid,
		usertype: d.usertype,
		birthyear: d.birthyear,
		gender: +d.gender
  };
}).then(function(data) {
  console.log(data);
}).then(basic_bar_chart(data));


function basic_bar_chart(mydata) {
	//console.log(data);

	//var size = d3.mean(d3.selectAll(data).size());

	var width = 800;
	var height = 800;
	var margin = {
		top: 30,
		bottom: 30,
		left: 30,
		right: 30
	}

	var svg = d3.select('body')
				.append('svg')
				.attr('width', width)
				.attr('height', height);

	var chart_group = svg.append('g')
						 .attr('transform','translate(' + margin.left +',' + margin.top + ')');

	var xScale = d3.scaleBand()
	  			   .domain(d3.map(mydata, function(d) { return d.starttime; }))
	  			   .range([margin.left, width-margin.right])
	  			   .padding(0.5);

	var yScale = d3.scaleLinear()
	  			   .domain([0, function(d) { return d.tripduration; }])
	  			   .range([height-margin.bottom, margin.top]);

	var xAxis = d3.axisBottom(xScale);
	chart_group.append("g")
			   .attr("transform", `translate(0, ${height-margin.bottom})`)
               .call(d3.axisBottom().scale(xScale));

	var yAxis = d3.axisLeft(yScale);
	chart_group.append("g")
			   .attr("transform", `translate(${margin.left}, 0)`)
               .call(d3.axisLeft().scale(yScale));

	var bar = chart_group.selectAll("rect")
             			 .data(mydata)
             			 .enter()
             			 .append("rect")
             			 .attr("x", function(d) { return xScale(d.starttime); })
             			 .attr("y", yScale(size))
             			 .attr("width", xScale.bandwidth())
             			 .attr("height", function(d) { 
             			 	return height-margin.bottom-yScale(d.tripduration);
             			 })
             			 .style("fill", "purple");
};