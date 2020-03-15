var height = 400;
var width = 400;
var pie = d3.pie()
            .value(d=>d.births)
            .sort(function (a,b) {
              if(a.continent<b.continent){
                return -1;
              }else{
                return 1;
              }
            });
var minYear = d3.min(birthData,d=>d.year);
var maxYear = d3.max(birthData,d=>d.year);
var h3 = d3.select('h3')
              .text(minYear);
var continents = [];
for (var i = 0; i < birthData.length; i++) {
  var continent = birthData[i].continent;
  if(birthData.indexOf(continent)<0){
    continents.push(continent);
  }
}
var colorScale = d3.scaleOrdinal()
                   .domain(continents)
                   .range(d3.schemeCategory10);

var g = d3.select('svg')
            .style('height',height)
            .style('width',width)
            .append('g')
              .attr('transform',`translate(${width/2},${height/2})`);

      var input = d3.select('input')
                      .property('min',minYear)
                      .property('max',maxYear)
                      .on('input',function () {
                        generateGraph(Number(d3.event.target.value));
                        h3.text(d3.event.target.value);
                      });

generateGraph(minYear)

function generateGraph(year) {
  var arcs = pie(birthData.filter(d=>d.year === year));
  d3.select('h4')
      .text(`Total ${arcs.length} countries`);
  var path = d3.arc()
               .innerRadius(width/4)
               .outerRadius(width/2-10)
               .padAngle(0.015);

  var chart = g.selectAll('.chart')
                .data(arcs);
  chart.exit().remove();
  chart.enter()
          .append('path')
          .classed('chart',true)
          .merge(chart)
          .attr('d',path)
          .attr('fill',d=>colorScale(d.data.continent))    //Use .data.property
          .attr('stroke','black');
}
