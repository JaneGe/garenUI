var Highcharts = require('highcharts');
export function getLineChartTheme(): any {
    Highcharts.theme = {
      chart: {
        backgroundColor: 'transparent',
        height:null
      },
      title: {
        style: {
          fontSize: '20px',
          color: '#fff'
        }
      },
      legend: {
        enabled: false,    //关闭图利
        itemStyle:{ "color": "#fff", "cursor": "pointer", "fontSize": "12px", "fontWeight": "normal" },
        itemHoverStyle:{"color": "#fff"}
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
        column:{
          animation:false,
          borderColor:'transparent',
          borderRadius:2,
          dataLabels:{
            enabled:true,
            style:{"color": "contrast", "fontSize": "11px", "fontWeight": "bold", "textOutline": "1px 1px contrast"}
          }
        }
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

