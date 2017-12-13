import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import chartOptions from '../fixtures/chartOptions'
import updateTask from '../actions/tasks/update'
import Chart from 'chart.js';

export class BacklogChart extends React.Component {
  constructor(props) {
    super();

    this._chart = null;
    this.backlogTasks = [];
    this.newSprintTasks = [];
    this.sprintEnergy = 150;
    this.datasets = [];
  }

  componentDidUpdate() {
    this.setNewSprintTasks();
    this.getBacklogDataset();
    this.getNewSprintDataset();
    console.log(this.datasets)
    const el = ReactDOM.findDOMNode(this.refs.canvas);

    this._chart = new Chart(el, {
      type: "bubble",
      data: {
        datasets: this.datasets
      },
      options: this.getOptions()
    })

    this.getSprintsDatasets();
  }

  getOptions = () => {
    chartOptions.tooltips = {
      ...chartOptions.tooltips,
      callbacks: {
        label: (t, d) => `${this.datasets[t.datasetIndex].data[t.index].text}`,
        afterLabel: (t, d) => [
          `energy: ${this.datasets[t.datasetIndex].data[t.index].r}`,
          `important: ${this.datasets[t.datasetIndex].data[t.index].x}`,
          `urgent: ${this.datasets[t.datasetIndex].data[t.index].y}`
        ]
      }
    }
    return { ...chartOptions }
  }

  getBacklogDataset = () => {
    this.backlogTasks = this.getEstimatedTasks().filter((task) => {
      return !task.sprint && !this.newSprintTasks.includes(task);
    })
    this.backlogDataset = this.backlogTasks.map((task) => {
      return ({
        text: task.tasks,
        x: task.important,
        y: task.urgent,
        r: 5 + (task.impact / 10 * 2) //TODO change when database is fixed
      })
    })
    this.datasets.push({
      label: "Backlog",
      data: this.backlogDataset,
      backgroundColor: "rgba(0,128,128,0.4)",
      borderColor: "rgb(0,128,128)",
      hoverBackgroundColor: "rgb(0,128,128)"
    })
  }

  getNewSprintDataset = () => {
    this.newSprintDataset = this.newSprintTasks.map((task) => {
      return ({
        text: task.tasks,
        x: task.important,
        y: task.urgent,
        r: 5 + (task.impact / 10 * 2) // TODO change when database is fixed
      })
    })
    this.datasets.push({
      label: "Backlog priority - create sprint",
      data: this.newSprintDataset,
      backgroundColor: "rgba(0,278,278,0.5)",
      borderColor: "rgb(0,128,128)",
      hoverBackgroundColor: "rgb(0,278,278)"
    });
  }

  getSprintsDatasets = () => {
    const sprintedTasks = this.getEstimatedTasks().filter((task) => task.sprint);
    const sprintsObj = sprintedTasks.reduce(function (obj, item) {
        obj[item.sprint] = obj[item.sprint] || [];
        obj[item.sprint].push(item);
        console.log(obj);
        return obj;
    }, []);

    console.log(sprintsObj);
    // this.getSprintDataset = this.newSprintTasks.map((task) => {
    //   return ({
    //     text: task.tasks,
    //     x: task.important,
    //     y: task.urgent,
    //     r: 5 + (task.impact / 10 * 2) // TODO change when database is fixed
    //   })
    // })
    // this.datasets.push(this.newSprintDataset);
    // return ({
    //   label: "Backlog priority - create sprint",
    //   data: this.newSprintDataset,
    //   backgroundColor: "rgba(0,278,278,0.5)",
    //   borderColor: "rgb(0,128,128)",
    //   hoverBackgroundColor: "rgb(0,278,278)"
    // })
  }

  getEstimatedTasks = (inclEnergy = true) => {
    return (
      this.props.tasks.filter((task) => (inclEnergy ? task.important && task.urgent && task.impact : task.important && task.urgent))
    )
  }

  setNewSprintTasks = (energyTotal = this.sprintEnergy) => {
    let energyLeft = energyTotal;
    const sortedTasks = this.sortByRelevance();
    const newSprintTasks = sortedTasks.filter((task) => {
      if (!task.sprint && (energyLeft - task.impact) >= 0) {
        energyLeft -= task.impact
        return true;
      }
    })
    this.newSprintTasks = newSprintTasks
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

  createNewSprint = () => {
    const sprints = this.props.tasks.map((task) => task.sprint ? task.sprint : 0);
    const latestSprint = Math.max.apply(null, sprints);
    this.newSprintTasks.map((task) => {
      task.sprint = latestSprint + 1;
      this.props.updateTask({ ...task})
    })
  }

  render() {
    return (
      <div className="chartWrapper" ref="chartWrapper" style={{ position: "relative", width: "100vw", padding: "20px 5%" }}>
        <button onClick={this.createNewSprint}>Create new sprint</button>
        <canvas ref="canvas" className="chart"/>
      </div>
    );
  }
}

const mapStateToProps = ({ tasks }) => ({ tasks })

export default connect(mapStateToProps, { updateTask })(BacklogChart)
