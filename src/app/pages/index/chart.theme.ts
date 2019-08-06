var Highcharts = require('highcharts');
export function getLineChartTheme(): any {
    Highcharts.theme = {
      chart: {
        backgroundColor: 'transparent',
      },
      title: {
        style: {
          fontSize: '20px',
          color: '#fff'
        }
      },
      legend: {
        enabled: false    //关闭图利
      },
      credits: {
        enabled: false // 禁用版权信息
      },
      tooltip: {
        crosshairs: false,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        },
      },
      xAxis: {
        labels: {
          style: {
            fontSize: '12px',
            color: '#fff'
          },
        },
      },
      yAxis: {
        title: {
          style: {
            fontSize: '14px',
            color: '#fff'
          },
        },
        labels: {
          style: {
            fontSize: '12px',
            color: '#fff'
          }
        }
      },
    }
    return Highcharts.theme;
  }

