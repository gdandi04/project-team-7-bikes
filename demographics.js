var parseDate = d3.timeParse('%m/%Y');
// read in the data
d3.csv('data/age.csv', function(d) {
  return {
    yearmonth: d.yearmonth,
    age: +d.age
  };
  // create a bar chart with the data that was read in
}).then(lineChart);

d3.csv('data/gender.csv', function(d) {
  return {
    yearmonth: d.yearmonth,
    female: +d.female,
    male: +d.male,
    non_reported: +d.non_reported
  };
}).then(grouped_bar_chart_gen);

function lineChart(data){
  console.log(data);

  var maxDate  = d3.max(data, function(d){ return d.yearmonth; });
  var minDate  = d3.min(data, function(d){ return d.yearmonth; });
  var maxAge = d3.max(data, function(d){ return d.age; });

  // svg width
  var width = 1200;
  // svg height
  var height = 800;
  // margins around visualization
  var margin = {
    top: 40,
    bottom: 80,
    left: 80,
    right: 30
  };

  var svg = d3.select(".vis-holder")
        .append('svg')
        .attr('class', 'svg-vis-demographics-line')
        .attr('width', width)
        .attr('height', height)
        .attr('margin', margin);

  var xScale = d3.scaleBand()
             .domain(d3.map(data, function(d) { return d.yearmonth; }).keys())
             .range([margin.left, width-margin.right], 1.0);

  var yScale = d3.scaleLinear()
             .domain([0, maxAge + 10])
             .range([height - margin.bottom - margin.top, 0]);

  var xAxis = d3.axisBottom(xScale);
  svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
          .call(xAxis.scale(xScale));

  var yAxis = d3.axisLeft(yScale);
  svg.append('g')
     .attr('class', 'y axis')
     .attr("transform", `translate(${margin.left}, 0)`)
     .call(yAxis.scale(yScale));

  var line = d3.line()
           .x(function(d) { return xScale(d.yearmonth); })    
           .y(function(d) { return yScale(d.age); });

  svg.append('path')
          .attr('d', line(data))
          .attr('class', 'dataLine');

  // create a x-axis title
  var xLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
                  .text("Year-Month");

  // create a y-axis title
  var yLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
                  .text("Average User Age");

  // create a chart title
  var chartTitle = svg.append("text")
                      .attr("text-anchor", "middle")
                      .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)-10)+")")
                      .text("Average Age of BlueBikes Users from 10/2018-9/2019");
};

function grouped_bar_chart_gen(data) {
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
  };

  var x0 = d3.scaleBand()
          .rangeRound([0, width])
          .paddingInner(0.1);

  var x1 = d3.scaleBand()
        .padding(0.05);

  var y = d3.scaleLinear()
            .rangeRound([height, 0]);

  var color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]);

  
};




















