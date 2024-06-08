import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

const LineChartOverall = () => {
  const [filter, setFilter] = useState('Today');

  useEffect(() => {
    const data = {
      series: [
        {
          name: 'Machine 1',
          data: [31, 40, 28, 51, 42, 82, 56],
        },
        {
          name: 'Machine 2',
          data: [11, 32, 45, 32, 34, 52, 41]
        },
        {
          name: 'Machine 3',
          data: [15, 11, 32, 18, 9, 24, 11]
        }
      ],
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
      },
      markers: {
        size: 4
      },
      colors: ['#4154f1', '#2eca6a', '#ff771d'],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: generateXAxisOptions(filter),
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            }
          }
        }
      ]
    };

    const chart = new ApexCharts(document.querySelector("#lineChartOverall"), data);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [filter]);

  // Function to generate x-axis options based on filter
  const generateXAxisOptions = (filter) => {
    let categories, tickAmount;

    if (filter === 'This Month') {
      categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      tickAmount = 4;
    } else if (filter === 'This Year') {
      categories = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      tickAmount = 12;
    } else {
      categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      tickAmount = 7;
    }

    return {
      type: 'category',
      categories: categories,
      tickAmount: tickAmount,
      labels: {
        formatter: function (value, index) {
          return categories[index] || value;
        }
      }
    };
  };

  // Handler function for filter change
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="col-lg-8">
      <div className="card">
        <div className="filter">
          <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              <h6>Filter</h6>
            </li>
            <li><a className="dropdown-item" href="#" onClick={() => handleFilterChange('Today')}>Today</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => handleFilterChange('This Month')}>This Month</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => handleFilterChange('This Year')}>This Year</a></li>
          </ul>
        </div>
        <div className="card-body">
          <h5 className="card-title">Reports <span>/ {filter}</span></h5>
          <div id="lineChartOverall" style={{ width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LineChartOverall;
