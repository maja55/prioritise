import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import Chart from 'chart.js';

export class BacklogChart extends React.Component {
  constructor(props) {
    super();

    this._chart = null;
  }

  // componentDidMount() {
  //   const ctx = ReactDOM.findDOMNode(this.refs.canvas);
  //
  //   this._chart = new Chart(ctx, {
  //     type: 'bubble',
  //     data: this.getData(),
  //     options: this.getOptions()
  //   });
  // }

  colorize(opaque, context) {
    var value = context.dataset.data[context.dataIndex];
    var x = value.x;
    var y = value.y;
    var r = x < 5 && y < 5 ? 250 : x < 5 ? 150 : y < 5 ? 50 : 5;
    var g = x < 5 && y < 0 ? 5 : x < 5 ? 50 : y < 5 ? 150 : 250;
    var b = x < 5 && y < 5 ? 5 : x > 5 && y > 5 ? 250 : 150;
    var a = opaque ? 0.5 : 1;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  getOptions = () => {
    return({
      // animation: false,
      responsive: true,
      elements: {
				point: {
					borderWidth: 1,
					hoverBorderWidth: 2
				}
			}
    });
  }

  getBacklogDataset = () => {
    const backlogDataset = this.getEstimatedTasks().map((task) => {
      return ({
        x: task.important,
        y: task.urgent,
        r: 5 + (task.impact / 10 * 2)
      });
    });
    return ({
      label: "Backlog tasks",
      data: backlogDataset,
      backgroundColor: "rgba(0,128,128,0.6)",
      borderColor: "rgb(0,128,128)",
      hoverBackgroundColor: "rgb(0,128,128)"
    });
  }

  getLabels = () => {
    return this.getEstimatedTasks().map((task) => task.tasks);
  }

  getEstimatedTasks() {
    return (
      this.props.tasks.filter((task) => (task.important && task.urgent && task.impact))
    )
  }

  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this.refs.canvas);

    this._chart = new Chart(el, {
      type: "bubble",
      data: {
        datasets: [this.getBacklogDataset()]
      },
      options: this.getOptions()
    });

    this._chart.update();
  }

  render() {
    return (
      <div className="chartWrapper" ref="chartWrapper" style={{ position: "relative", height: "40vh", width: "80vw" }}>
        <canvas ref="canvas" className="scatter-chart"/>
      </div>
    );
  }
}

const mapStateToProps = ({ tasks }) => ({ tasks })

export default connect(mapStateToProps)(BacklogChart)
