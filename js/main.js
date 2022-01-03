const ctx = document.querySelector('#chart');

let data = {
    labels: ['01.12', '02.12', '03.12', '04.12', '05.12', '06.12', '07.12', '02.12', '03.12', '04.12', '05.12', '06.12', '07.12', '08.12', '09.12', '10.12', '11.12', '12.12', '13.12', '14.12', '15.12', '16.12', '17.12', '18.12', '19.12', '20.12', '21.12', '22.12', '23.12', '24.12', '25.12', '26.12', '27.12', '28.12', '29.12', '30.12'],
        datasets: [
            {
                label: 'Подписчиков',
                data: [10000, 20000, 30000, 60000, 100000, 220000, 460000, 700000, 1000000, 1200000, 1500000, 1700000],
                backgroundColor: [
                    'rgba(234, 5, 5, 1)'
                ],
                borderColor: [
                    'rgba(234, 5, 5, 1)'
                ],
                borderWidth: 3,
                pointRadius: 8,
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(234, 5, 5, 1)',
                pointHoverBackgroundColor: 'rgba(234, 5, 5, 1)',
                pointHoverRadius: 8,
            },
            {
                label: 'Лайков',
                data: [5000, 10000, 15000, 30000, 50000, 70000, 80000, 90000, 100000, 110000, 150000, 170000],
                backgroundColor: [
                    'rgba(5, 193, 234, 1)'
                ],
                borderColor: [
                    'rgba(5, 193, 234, 1)'
                ],
                borderWidth: 3,
                pointRadius: 8,
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(5, 193, 234, 1)',
                pointHoverBackgroundColor: 'rgba(5, 193, 234, 1)',
                pointHoverRadius: 8,
            },
            {
                label: 'Просмотров',
                data: [15000, 25000, 40000, 70000, 120000, 270000, 550000, 800000, 1200000, 1500000, 1800000, 2100000],
                backgroundColor: [
                    'rgba(56, 167, 4, 1)'
                ],
                borderColor: [
                    'rgba(56, 167, 4, 1)'
                ],
                borderWidth: 3,
                pointRadius: 8,
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(56, 167, 4, 1)',
                pointHoverBackgroundColor: 'rgba(56, 167, 4, 1)',
                pointHoverRadius: 8,
            }
        ]
}
var dataShadow = data;
/* 
class Custom extends Chart.LineController {
    draw() {
        super.draw(arguments);

        const ctx = this.chart.ctx;

        console.log(this.chart);

        let _stroke = ctx.stroke;
        ctx.stroke = function () {
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;
            _stroke.apply(this, arguments);
            ctx.restore();
        }
    }
}
  
Custom.id = 'shadowLine';
Custom.defaults = Chart.LineController.defaults;

Chart.register(Custom); */
/* const getOrCreateTooltip = (chart) => {
    let tooltipEl = document.querySelector('.promotion-block__chart--tooltip');    
    let tooltipBlock = document.createElement('div');
    tooltipBlock.classList.add('chart-tooltip-block');
    tooltipEl.appendChild(tooltipBlock);
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(255, 255, 255, 1)';
      tooltipEl.style.borderRadius = '5px';
      tooltipEl.style.color = 'black';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(0%, 0)';
      tooltipEl.style.transition = 'all .2s ease';
  
      
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };
   */
  const externalTooltipHandler = (context) => {
    // Tooltip Element
    
    const {chart, tooltip} = context;
    const tooltipEl = document.querySelector('.promotion-block__chart--tooltip');
    let tooltipBlock = document.createElement('div');
    tooltipBlock.classList.add('chart-tooltip-block');

  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      tooltipEl.style.visibility = 'hidden';
      return;
    }
  
    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map(b => b.lines);
  
      const tooltipBlockHeader = document.createElement('div');
      tooltipBlockHeader.classList.add('chart-tooltip-block__header')
  
      titleLines.forEach(title => {
        const text = document.createTextNode(title),
              logo = document.createElement('img');

        logo.src = tooltipEl.dataset.logoSrc;
        logo.classList.add('chart-tooltip-block__logo')

        tooltipBlockHeader.appendChild(logo);
        tooltipBlockHeader.appendChild(text);
        tooltipBlock.appendChild(tooltipBlockHeader);
      });
  
      const tooltipBlockBody = document.createElement('div');
      tooltipBlockBody.classList.add('chart-tooltip-block__body');

      bodyLines.forEach((body, i) => {
  
        tooltipEl.style.setProperty('--color', tooltip.dataPoints[0].dataset.backgroundColor);
  
        const text = document.createTextNode(body);
  
        
        tooltipBlockBody.appendChild(text);
        tooltipBlock.appendChild(tooltipBlockBody);
      });
  
      const tableRoot = tooltipEl.querySelector('.chart-tooltip-block');
      
      if(tableRoot) tableRoot.remove();
      // Remove old children
      /* while (tableRoot.firstChild) {
        tableRoot.remove();
        tooltipEl.remove();
      } */
      tooltipEl.appendChild(tooltipBlock);
      
  
      // Add new children
      /* tableRoot.appendChild(tooltipBlockHeader);
      tableRoot.appendChild(tooltipBlockBody); */
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.visibility = 'visible';
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);
  
      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }
  
      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
  
      items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('chart-legend-li');
        /* li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px'; */
  
        li.onclick = () => {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          chart.update();
        };
  
        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.classList.add('chart-legend-box');
        boxSpan.style.setProperty('--color', item.fillStyle);
        /* boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px'; */
  
        // Text
        const textContainer = document.createElement('p');
        textContainer.classList.add('chart-legend-text');
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
        /* textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
         */
  
        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);
  
        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    }
  };

  const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
  
    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.classList.add('chart-legend-list');
      /* listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'row';
      listContainer.style.margin = 0;
      listContainer.style.padding = 0; */
  
      legendContainer.appendChild(listContainer);
    }
  
    return listContainer;
  };

const chart = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: data,
    options: {
        /* interaction: {
            intersect: false,
            mode: 'index',
        }, */
        responsive: true,
        
        scales: {
            
            y: {
                ticks: {
                    font: {
                        size: 14,
                        family: 'Intro Book, sans-serif',
                    },
                    callback:function(value, index, values) {
                        let valueString = value.toString(),
                            valueLength = valueString.length;

                        if(valueLength >= 4 && valueLength <= 6) {

                            return valueString.slice(0,3) +' тыс.';

                        } else if(valueLength >= 7 && valueLength <= 9) {

                            if(valueLength == 7) {
                                return valueString.slice(0,1) + ',' + valueString.slice(1,2) + ' млн.';
                            } else if(valueLength == 8) {
                                return valueString.slice(0,2) + ',' + valueString.slice(2,3) + ' млн.';
                            } else {
                                return valueString.slice(0,3) + ' млн.';
                            }

                        }
                        else if(valueLength >= 10 && valueLength <= 12) {

                            return valueString.slice(0,3)+' млрд.';

                        } else {

                            return value;

                        }
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 12,
                        family: 'Intro Book',
                    },
                }
            },
        },
        plugins: {
            tooltip: {
                enabled: false,
                position: 'nearest',
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label;
                            valueString = context.parsed.y.toString(),
                            valueLength = valueString.length;

                        if(valueLength >= 4 && valueLength <= 6) {

                            if(valueLength == 4) {
                                return valueString.slice(0,1) + ' тыс' + label;
                            } else if(valueLength == 5) {
                                return valueString.slice(0,2) + ' тыс ' + label;
                            } else {
                                return valueString.slice(0,3) +' тыс ' + label;
                            }

                        } else if(valueLength >= 7 && valueLength <= 9) {

                            if(valueLength == 7) {
                                return valueString.slice(0,1) + ',' + valueString.slice(1,2) + ' млн ' + label;
                            } else if(valueLength == 8) {
                                return valueString.slice(0,2) + ',' + valueString.slice(2,3) + ' млн ' + label;
                            } else {
                                return valueString.slice(0,3) + ' млн ' + label;
                            }

                        }
                        else if(valueLength >= 10 && valueLength <= 12) {

                            return label + ': ' + valueString.slice(0,3)+' млрд';

                        } else {

                            return label + ': ' + value;

                        }
                    }
                },
                external: externalTooltipHandler
            },
            htmlLegend: {
                containerID: 'legend-container',
            },
            legend: {
                display: false,
            }

            /* tooltip: {
                
            } */
        }
    },
    plugins: [htmlLegendPlugin]

})



    