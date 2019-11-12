// read in the data
d3.csv('data/age.csv', function(d) {
  return {
    yearmonth: d.yearmonth,
    age: +d.age
  };
  // create a bar chart with the data that was read in
}).then(lineChart);

function lineChart(data){
  console.log(data);

  var maxAge = d3.max(data, function(d){ return d.age;});

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

  var svg = d3.select(".vis-holder")
        .append('svg')
        .attr('class', 'svg-vis-demographics')
        .attr('width', width)
        .attr('height', height)
        .attr('margin', margin);

  var xScale = d3.scaleOrdinal()
             .domain(data)
             .range(["2018-10", "2018-11", "2018-12", "2019-01", "2019-02", "2019-03",
              "2019-04", "2019-05", "2019-06", "2019-07", "2019-08", "2019-09"]);

  var yScale = d3.scaleLinear()
             .domain([0, maxAge])
             .range([height - margin.bottom - margin.top, 0]);

  var xAxis = d3.axisBottom(xScale);
  svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
          .call(xAxis);

  var yAxis = d3.axisLeft(yScale);
  svg.append('g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(0, 0)')
        .call(yAxis);

  var line = d3.line()
           .x(function(d){return xScale(d.yearmonth);})    
           .y(function(d){return yScale(d.age);})

  svg.append('path')
          .attr('d', line(data))
          .attr('class', 'dataLine');

    svg.append("text")             
        .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top - 60) + ")")
        .style("text-anchor", "middle")
        .text("Month");

    svg.append("text")
      .attr("transform", "rotate (-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height/2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Price");

    svg.append("text")             
        .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top - 630) + ")")
        .style("text-anchor", "middle")
        .text("Price per Month");
};