import React, { useState } from 'react';

const TimeTable = () => {
  const [activeTab, setActiveTab] = useState('tab-1');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const scheduleItems = [
    { time: '6.00am - 8.00am', className: 'Power Lifting', instructor: 'John Deo' },
    { time: '8.00am - 10.00am', className: 'Body Building', instructor: 'James Taylor' },
    { time: '10.00am - 12.00pm', className: 'Cardio Program', instructor: 'Jack Sparrow' },
    { time: '12.00pm - 2.00pm', className: 'Weight Loose', instructor: 'Robert Smith' },
    { time: '2.00pm - 4.00pm', className: 'Fitness Program', instructor: 'Adam Phillips' },
    { time: '4.00pm - 6.00pm', className: 'Crossfit Class', instructor: 'James Alien' },
    { time: '6.00pm - 8.00pm', className: 'Muscle Building', instructor: 'Petter John' },
    { time: '8.00pm - 10.00pm', className: 'Yoga Class', instructor: 'Jessy Reo' },
  ];

  return (
    <div className="container-fluid p-5">
      <div className="mb-5 text-center">
        <h5 className="text-primary text-uppercase">Class Schedule</h5>
        <h1 className="display-3 text-uppercase mb-0">Working Hours</h1>
      </div>
      <div className="tab-class text-center">
        <ul className="nav nav-pills d-inline-flex justify-content-center bg-dark text-uppercase rounded-pill mb-5">
          {days.map((day, index) => (
            <li className="nav-item" key={index}>
              <a
                className={`nav-link rounded-pill text-white ${activeTab === `tab-${index + 1}` ? 'active' : ''}`}
                onClick={() => setActiveTab(`tab-${index + 1}`)}
                role="button"
                href={`#tab-${index + 1}`}
              >
                {day}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content">
          {days.map((day, index) => (
            <div
              id={`tab-${index + 1}`}
              className={`tab-pane fade ${activeTab === `tab-${index + 1}` ? 'show active' : ''}`}
              key={index}
            >
              <div className="row g-5">
                {scheduleItems.map((item, itemIndex) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={itemIndex}>
                    <div className="bg-dark rounded text-center py-5 px-3">
                      <h6 className="text-uppercase text-light mb-3">{item.time}</h6>
                      <h5 className="text-uppercase text-primary">{item.className}</h5>
                      <p className="text-uppercase text-secondary mb-0">{item.instructor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;