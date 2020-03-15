var height = 500;
var width = 500;
var padding = 30;
d3.select('svg')
    .style('height',height)
    .style('width',width);
var Yscale = d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.lifeExpectancy)).range([height-padding,padding]);
var Xscale = d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.births/d.population)).range([padding,width-padding]);
var radiusScale = d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.births)).range([2,14]);
var fillScale = d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.population)).range(['orange','red']);

var Xaxis = d3.axisBottom(Xscale)
                .tickSize(-height +2*padding)
                .tickSizeOuter(0);
var Yaxis = d3.axisLeft(Yscale)
                .tickSize(-width +2*padding)
                .tickSizeOuter(0);

// Tooltips
var tooltip = d3.select('body')
  .append('div')
      .classed('tooltip',true);

d3.select('svg')
    .append('g')
    .attr('transform',`translate(0,${height-padding})`)
    .call(Xaxis);

d3.select('svg')
    .append('g')
    .attr('transform',`translate(${padding},0)`)
    .call(Yaxis);

d3.select('svg')
    .selectAll('circle')
    .data(birthData2011)
    .enter()
    .append('circle')
    .attr('cx',d=>Xscale(d.births/d.population))
    .attr('cy',d=>Yscale(d.lifeExpectancy))
    .attr('r',d=>radiusScale(d.births))
    .attr('fill',d=>fillScale(d.population))
    .on('mousemove',function (d) {
        tooltip.style('opacity',1)
               .style('left',(d3.event.x - tooltip.node().offsetWidth/2) + 'px')
               .style('top',(d3.event.y + 10) +'px')
               .html(`<p>Region:${d.region}</p>
                      <p>Births:${d.births.toLocaleString()}</p>
                      <p>LifeExpectancy:${d.lifeExpectancy}</p>`);
    })
    .on('mouseout',function () {
        tooltip.style('opacity',0);
    })

d3.select('svg')
    .append('text')
    .attr('text-anchor','middle')
    .attr('transform',`translate(${width/2},${height-5})`)
    .attr('fill','blue')
    .style('font-weight','bold')
    .text('Births per capita');

d3.select('svg')
    .append('text')
    .attr('text-anchor','middle')
    .attr('transform',`translate(${width/2},${padding})`)
    .attr('fill','red')
    .style('font-size','1.5em')
    .text('Data on births in countries in 2011');

d3.select('svg')
    .append('text')
    .attr('text-anchor','middle')
    .attr('transform',`translate(${padding-18},${height/2}) rotate(-90)`)
    .attr('fill','blue')
    .style('font-weight','bold')
    .text('Life Expectancy');
