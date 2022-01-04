const ctx = document.querySelector('#chart');

function dataChart(arg) {
    let result = {
        labels: arg.labels,
        datasets: [],
    }
    for(let i = 0; i<arg.data.length; i++) {
        result.datasets.push({
            label: arg.data[i].label,
            data: arg.data[i].data,

            backgroundColor: [
                arg.data[i].color,
            ],
            borderColor: [
                arg.data[i].color,
            ],
            borderWidth: 4,
            pointRadius: 3,
            pointHoverRadius: 8,

            cubicInterpolationMode: 'monotone',

        })
    }

    return result;
}


let data = dataChart({
    labels: ['01.12', '02.12', '03.12', '04.12', '05.12', '06.12', '07.12', '02.12', '03.12', '04.12', '05.12', '06.12', '07.12', '08.12', '09.12', '10.12', '11.12', '12.12', '13.12', '14.12', '15.12', '16.12', '17.12', '18.12', '19.12', '20.12', '21.12', '22.12', '23.12', '24.12', '25.12', '26.12', '27.12', '28.12', '29.12', '30.12'],
    data: [
        {
            label: 'Подписчиков',
            data: [250000, 470000, 600000, 720000, 850000, 770000, 600000, 520000, 460000, 330000, 400000, 580000, 660000, 730000, 810000, 790000],
            color: 'rgba(234, 5, 5, 1)',
        },
        {
            label: 'Лайков',
            data: [500000, 850000, 830000, 800000, 770000, 780000, 1000000, 1400000],
            color: 'rgba(5, 193, 234, 1)',
        },
        {
            label: 'Просмотров',
            data: [15000, 25000, 40000, 70000, 120000, 270000, 550000, 800000, 1200000, 1500000, 1800000, 2100000, 1900000, 1500000, 2000000],
            color: 'rgba(56, 167, 4, 1)',
        },
        
    ]
    
});

const externalTooltipHandler = (context) => {

    const { chart, tooltip } = context;
    const tooltipEl = document.querySelector('.promotion-block__chart--tooltip');
    let tooltipBlock = document.createElement('div');
    tooltipBlock.classList.add('chart-tooltip-block');


    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        tooltipEl.style.visibility = 'hidden';
        return;
    }

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

        if (tableRoot) tableRoot.remove();

        tooltipEl.appendChild(tooltipBlock);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

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

        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('chart-legend-li');

            li.onclick = () => {
                chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                chart.update();
            };

            const boxSpan = document.createElement('span');
            boxSpan.classList.add('chart-legend-box');
            boxSpan.style.setProperty('--color', item.fillStyle);


            const textContainer = document.createElement('p');
            textContainer.classList.add('chart-legend-text');
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
            
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

        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};

const chart = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: data,
    options: {
        responsive: true,

        scales: {

            y: {
                ticks: {
                    font: {
                        size: 12,
                        family: 'Intro Book, sans-serif',
                    },
                    callback: function (value, index, values) {
                        let valueString = value.toString(),
                            valueLength = valueString.length;

                        if (valueLength >= 4 && valueLength <= 6) {

                            return valueString.slice(0, 3) + ' тыс.';

                        } else if (valueLength >= 7 && valueLength <= 9) {

                            if (valueLength == 7) {
                                return valueString.slice(0, 1) + ',' + valueString.slice(1, 2) + ' млн.';
                            } else if (valueLength == 8) {
                                return valueString.slice(0, 2) + ',' + valueString.slice(2, 3) + ' млн.';
                            } else {
                                return valueString.slice(0, 3) + ' млн.';
                            }

                        }
                        else if (valueLength >= 10 && valueLength <= 12) {

                            return valueString.slice(0, 3) + ' млрд.';

                        } else {

                            return value;

                        }
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 11,
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
                    label: function (context) {
                        let label = context.dataset.label;
                        valueString = context.parsed.y.toString(),
                            valueLength = valueString.length;

                        if (valueLength >= 4 && valueLength <= 6) {

                            if (valueLength == 4) {
                                return valueString.slice(0, 1) + ' тыс' + label;
                            } else if (valueLength == 5) {
                                return valueString.slice(0, 2) + ' тыс ' + label;
                            } else {
                                return valueString.slice(0, 3) + ' тыс ' + label;
                            }

                        } else if (valueLength >= 7 && valueLength <= 9) {

                            if (valueLength == 7) {
                                return valueString.slice(0, 1) + ',' + valueString.slice(1, 2) + ' млн ' + label;
                            } else if (valueLength == 8) {
                                return valueString.slice(0, 2) + ',' + valueString.slice(2, 3) + ' млн ' + label;
                            } else {
                                return valueString.slice(0, 3) + ' млн ' + label;
                            }

                        }
                        else if (valueLength >= 10 && valueLength <= 12) {

                            return label + ': ' + valueString.slice(0, 3) + ' млрд';

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
        }
    },
    plugins: [htmlLegendPlugin]

})



