import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import chartOptions from '../fixtures/chartOptions'
import Chart from 'chart.js';

export class BacklogChart extends React.Component {
  constructor(props) {
    super();

    this._chart = null;
    this.backlogDataset = [];
    this.nextSprintDataset = [];
    this.sprintEnergy = 150;
  }

  componentDidUpdate() {
    this.getNextSprintDataset()
    const el = ReactDOM.findDOMNode(this.refs.canvas);

    this._chart = new Chart(el, {
      type: "bubble",
      data: {
        datasets: [
          this.getNextSprintDataset(),
          this.getBacklogDataset()
        ]
      },
      options: this.getOptions()
    })
  }

  getOptions = () => {
    chartOptions.tooltips = {
      ...chartOptions.tooltips,
      callbacks: {
        label: (tooltipItem, data) => ` ${this.backlogDataset[tooltipItem.index].text}`,
        footer: (tooltipItem, data) => [
          `important: ${tooltipItem[0].xLabel}`,
          `urgent: ${tooltipItem[0].yLabel}`,
          `energy: ${this.backlogDataset[tooltipItem[0].index].r}`,
        ]
      }
    }
    return { ...chartOptions }
  }

  getBacklogDataset = () => {
    const allTasksDataset = this.getEstimatedTasks().map((task) => {
      return ({
        text: task.tasks,
        x: task.important,
        y: task.urgent,
        r: 5 + (task.impact / 10 * 2) //TODO change when database is fixed
      })
    })
    this.backlogDataset = allTasksDataset.filter((task) => {
      return !this.nextSprintDataset.includes(task);
    })
    return ({
      label: "Backlog",
      data: this.backlogDataset,
      backgroundColor: "rgba(0,128,128,0.4)",
      borderColor: "rgb(0,128,128)",
      hoverBackgroundColor: "rgb(0,128,128)"
    })
  }

  getNextSprintDataset = (energyTotal = this.sprintEnergy) => {
    let energyLeft = energyTotal;
    const sortedTasks = this.sortByRelevance();
    const nextSprintTasks = sortedTasks.filter((task) => {
      if ((energyLeft - task.impact) >= 0) {
        energyLeft -= task.impact
        return true;
      }
    })
    this.nextSprintDataset = nextSprintTasks.map((task) => {
      return ({
        text: task.tasks,
        x: task.important,
        y: task.urgent,
        r: 5 + (task.impact / 10 * 2) //TODO change when database is fixed
      })
    })
    return ({
      label: "Backlog priority - create sprint",
      data: this.nextSprintDataset,
      backgroundColor: "rgba(0,278,278,0.5)",
      borderColor: "rgb(0,128,128)",
      hoverBackgroundColor: "rgb(0,278,278)"
    })
  }

  getEstimatedTasks = (inclEnergy = true) => {
    return (
      this.props.tasks.filter((task) => (inclEnergy ? task.important && task.urgent && task.impact : task.important && task.urgent))
    )
  }

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

  sortByRelevance(tasks = this.getEstimatedTasks()) {
    return tasks.sort((a, b) => {
      return (b.important + b.urgent) - (a.important + a.urgent)
    })
  }

  render() {
    return (
      <div className="chartWrapper" ref="chartWrapper" style={{ position: "relative", width: "100vw", padding: "20px 5%" }}>
        <canvas ref="canvas" className="chart"/>
      </div>
    );
  }
}

const mapStateToProps = ({ tasks }) => ({ tasks })

export default connect(mapStateToProps)(BacklogChart)
