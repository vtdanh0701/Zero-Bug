import React, { Component } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';


const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const doughnut = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

const options = {
  tooltips: {
    enabled: true,

  },
  maintainAspectRatio: false
}

class Charts extends Component {
  render() {
    return (
      <>
        <div className="col-md-6">
          <div className='card card-primary'>
            <div className='card-header'>
              <h3 className="card-title">
                <i className="fas fa-chart-pie mr-1"></i>
                Sales
              </h3>
              <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times"></i></button>
              </div>
            </div>
            <div className='card-body'>
              <div className='chart'>
                <Line data={line} options={options} />
              </div>
            </div>
          </div> 
        </div>
        <div className="col-md-6">
        <div className='card card-primary'>
          <div className='card-header'>
            <h3 className="card-title">
              <i className="fas fa-chart-pie mr-1"></i>
              Sales
            </h3>
            <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i>
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times"></i></button>
            </div>
          </div>
          <div className='card-body'>
            <div className='chart'>
              <Doughnut data={doughnut} options={options} />
            </div>
          </div>
        </div> 
      </div>
      </>
    );
  }
}

export default Charts;
