// read in the data
d3.csv('data/age.csv', function(d) {
  return {
    yearmonth: d.yearmonth,
    age: +d.age
  };
  // create a bar chart with the data that was read in
}).then(lineChart);

// d3.csv('data/gender.csv', function(d) {
//   var genderNames = d3.keys(d[0]).filter(function(key) { return key !== "yearmonth"; });
//   return {
//     yearmonth: d.yearmonth,
//     female: +d.female,
//     male: +d.male,
//     non_reported: +d.non_reported,
//   };
//   d.gender = genderNames.map(function(name) { return {name: name, value: +d[name]}; })
// }).then(grouped_bar_chart_gen);

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

//   // svg width
//   var width = 1200;
//   // svg height
//   var height = 800;
//   // margins around visualization
//   var margin = {
//     top: 80,
//     bottom: 80,
//     left: 100,
//     right: 30
//   };

// var x0 = d3.scaleBand()
//     .range([0, width], .1);

// var x1 = d3.scaleBand()
//            .padding(0.05);

// var y = d3.scaleLinear()
//     .range([height, 0]);

// var color = d3.scaleOrdinal()
//     .range(["#98abc5", "#8a89a6", "#7b6888"]);

// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     var xAxis = svg.append("g")
//                .attr("transform", `translate(0, ${height-margin.bottom})`)
//                .call(d3.axisBottom().scale(x0));

// var yAxis = svg.append("g")
//              .attr("transform", `translate(${margin.left}, 0)`)
//                    .call(d3.axisLeft().scale(y));

// d3.csv("data/gender.csv", function(d, i, columns) {
//   for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
//   return d;
// }, function(data) {

//   var keys = data.columns.slice(1);

//   x0.domain(data.map(function(d) { return d.yearmonth; }));
//   x1.domain(keys).range([0, x0.bandwidth()]);
//   y.domain([
//     (Math.floor(d3.min(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); }) / 10) * 10),
//     (Math.ceil(d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); }) / 10) * 10)
//   ]);

//   var barG = g.append("g")
//     .selectAll("g")
//     .data(data)
//     .enter()
//   .append("g")
//     .attr("transform", function(d) { return "translate(" + x0(d.yearmonth) + ",0)"; });

//   barG.selectAll(".bars-container-back")
//     .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
//     .enter()
//   .append("rect")
//       .attr("class", "bars-container-back")
//       .attr("x", function(d) { return x1(d.key) - 4; })
//       .attr("y", function(d) { return y(d.value) - 4; })
//       .attr("width", x1.bandwidth() + 8)
//       .attr("height", function(d) { return (height / 1.4) - y(d.value) + 3; })
//       .attr("fill", "white")
//       .attr("stroke-width", "2px")
//       .attr("stroke", "transparent")
//       .attr("stroke-dasharray", "6,4")
//       .attr("shape-rendering", "crispEdges")
//         .transition()
//         .delay(500)
//         .duration(150)
//         .attr("stroke", "#727075");

//   barG.selectAll(".bars-container-middle")
//     .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
//     .enter()
//   .append("rect")
//       .attr("class", "bars-container-middle")
//       .attr("x", function(d) { return x1(d.key) - 3; })
//       .attr("y", function(d) { return y(d.value) - 1; })
//       .attr("width", x1.bandwidth() + 6)
//       .attr("height", function(d) { return (height / 1.4) - y(d.value) + 2; })
//       .attr("fill", "white")
//       .attr("stroke", "none");

//   barG.selectAll(".bars")
//     .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
//     .enter()
//   .append("rect")
//       .attr("class", "bars")
//       .attr("x", function(d) { return x1(d.key); })
//       .attr("width", x1.bandwidth())
//       .attr("fill", function(d) { return z(d.key); })
//        .attr("y", (height / 1.4))
//         .transition()
//         .delay(function (d,i){ return i * 250;}) // this is to do left then right bars
//         .duration(250)
//         .attr("y", function(d) { return y(d.value); })
//         .attr('height', function( d ) { return ((height / 1.4))  - y( d.value );});

//   g.append("g")
//       .attr("class", "axis")
//       .attr("transform", "translate(0," + (height / 1.4) + ")")
//       .call(d3.axisBottom(x0))
//       .selectAll("text")  
//       .style("text-anchor", "end")
//       .attr("dx", "-.8em")
//       .attr("dy", ".15em")
//       .attr("transform", "rotate(-65)")
//       .text(function (d) {
//         if(d.length > 14) { return d.substring(0,14)+'...'; } 
//         else { return d; }
//       });

//   g.append("g")
//       .attr("class", "axis")
//       .call(d3.axisLeft(y).ticks(6));

//   var legend = g.append("g")
//       .attr("font-family", "sans-serif")
//       .attr("font-size", 10)
//       .attr("text-anchor", "end")
//       .selectAll("g")
//       .data(keys.slice().reverse())
//       .enter()
//     .append("g")
//       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

//   legend.append("rect")
//       .attr("x", width - 19)
//       .attr("width", 19)
//       .attr("height", 19)
//       .attr("fill", z);

//   legend.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9.5)
//       .attr("dy", "0.32em")
//       .text(function(d) { return d; });
  
//     // Clinicial cut off line and text group
//     var clinicalCutOffLineAndText = g.append("g")
//         .attr("class", "clinical-cut-off-line-and-text")
  
//     // Clinicial cut off line
//     clinicalCutOffLineAndText.append("line")
//         .attr("class", "clinical-cut-off-line")
//         .attr("x1", 0)
//         .attr("y1", y(clinicalCutOffValue))
//         .attr("x2", width)
//         .attr("y2", y(clinicalCutOffValue)); 
  
//     // Clinicial cut off text
//     clinicalCutOffLineAndText.append("text")
//         .attr("class", "clinical-cut-off-text")
//         .attr("y", y(clinicalCutOffValue))
//         .attr("dy","20px")
//         .text("Clinical Cut-off");
// });
chart = {
  const svg = d3.select(DOM.svg(width, height));

  svg.append("g")
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
    .selectAll("rect")
    .data(d => keys.map(key => ({key, value: d[key]})))
    .join("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(legend);

  return svg.node();
}

x0 = d3.scaleBand()
    .domain(data.map(d => d[groupKey]))
    .rangeRound([margin.left, width - margin.right])
    .paddingInner(0.1);

x1 = d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05);

y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]).nice()
    .rangeRound([height - margin.bottom, margin.top]);

color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0).tickSizeOuter(0))
    .call(g => g.select(".domain").remove());

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y));

data = Object.assign(d3.csvParse(await FileAttachment("data.csv").text(), d3.autoType), {y: "Population"});

groupKey = data.columns[0];
keys = data.columns.slice(1);
margin = ({top: 10, right: 10, bottom: 20, left: 40});
height = 500;















