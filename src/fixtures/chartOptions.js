export default {
  // animation: false,
  responsive: true,
  layout: {
    padding: {
      right: 20
    }
  },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Urgent',
        fontSize: 14
      },
      gridLines: {
        color: [
          "rgba(0, 0, 0, 0.25)",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "rgba(0, 0, 0, 0.1)",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "rgba(0, 0, 0, 0.25)",
        ],
        zeroLineColor: "transparent",
        drawTicks: false
      },
      ticks: {
        min: 0,
        max: 10,
        padding: 15,
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Important',
        fontSize: 14
      },
      gridLines: {
        color: [
          "rgba(0, 0, 0, 0.25)",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "rgba(0, 0, 0, 0.1)",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "rgba(0, 0, 0, 0.25)",
        ],
        zeroLineColor: "transparent",
        drawTicks: false
      },
      ticks: {
        min: 0,
        max: 10,
        padding: 15
      }
    }]
  },
  elements: {
    point: {
      borderWidth: 1,
      hoverBorderWidth: 2
    }
  },
  tooltips: {
    yPadding: 10,
    xPadding: 10,
    bodyFontStyle: 'bold',
    footerFontStyle: 'normal',
    footerMarginTop: 10
  }
}
