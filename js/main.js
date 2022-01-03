const ctx = document.querySelector('#chart');


const chart = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
        labels: ['01.12', '02.12', '03.12', '04.12', '05.12', '06.12', '07.12', '02.12', '03.12', '04.12', '05.12', '06.12', '07.12', '08.12', '09.12', '10.12', '11.12', '12.12', '13.12', '14.12', '15.12', '16.12', '17.12', '18.12', '19.12', '20.12', '21.12', '22.12', '23.12', '24.12', '25.12', '26.12', '27.12', '28.12', '29.12', '30.12'],
        datasets: [
            {
                label: 'Подписчики',
                data: [10000, 20000, 30000, 60000, 100000, 220000, 460000, 700000, 1000000, 1200000, 1500000, 1700000],
                backgroundColor: [
                    'rgba(234, 5, 5, 1)'
                ],
                borderColor: [
                    'rgba(234, 5, 5, 1)'
                ],
                borderWidth: 3,
            },
            {
                label: 'Лайки',
                data: [5000, 10000, 15000, 30000, 50000, 70000, 80000, 90000, 100000, 110000, 150000, 170000],
                backgroundColor: [
                    'rgba(5, 193, 234, 1)'
                ],
                borderColor: [
                    'rgba(5, 193, 234, 1)'
                ],
                borderWidth: 2,
            },
            {
                label: 'Просмотры',
                data: [15000, 25000, 40000, 70000, 120000, 270000, 550000, 800000, 1200000, 1500000, 1800000, 2100000],
                backgroundColor: [
                    'rgba(56, 167, 4, 1)'
                ],
                borderColor: [
                    'rgba(56, 167, 4, 1)'
                ],
                borderWidth: 2,
            }
        ]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    callback:function(value, index, values) {
                        let valueString = value.toString(),
                            valueLength = valueString.length;

                        if(valueLength >= 4 && valueLength <= 6) {

                            if(valueLength == 4) {
                                return valueString.slice(0,1) + ',' + valueString.slice(1,2) + ' тыс.';
                            } else if(valueLength == 5) {
                                return valueString.slice(0,2) + ',' + valueString.slice(2,3) + ' тыс.';
                            } else {
                                return valueString.slice(0,3) +' тыс.';
                            }
                            

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
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label;
                            valueString = context.parsed.y.toString(),
                            valueLength = valueString.length;

                        if(valueLength >= 4 && valueLength <= 6) {

                            return label + ': ' + valueString.slice(0,3) +' тыс.';

                        } else if(valueLength >= 7 && valueLength <= 9) {

                            if(valueLength == 7) {
                                return label + ': ' + valueString.slice(0,1) + ',' + valueString.slice(1,2) + ' млн.';
                            } else if(valueLength == 8) {
                                return label + ': ' + valueString.slice(0,2) + ',' + valueString.slice(2,3) + ' млн.';
                            } else {
                                return label + ': ' + valueString.slice(0,3) + ' млн.';
                            }

                        }
                        else if(valueLength >= 10 && valueLength <= 12) {

                            return label + ': ' + valueString.slice(0,3)+' млрд.';

                        } else {

                            return label + ': ' + value;

                        }
                    }
                }
            }
        }
    }

});    

    