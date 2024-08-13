import React from 'react';

export default function TeamMember({ image, name, title, socialLinks }){
  return (
    <div className="col-lg-4 col-md-6">
      <div className="team-item position-relative">
        <div className="position-relative overflow-hidden rounded">
          <img className="img-fluid w-100" src={image} alt="" />
          <div className="team-overlay">
            <div className="d-flex align-items-center justify-content-start">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  className="btn btn-light btn-square rounded-circle mx-1"
                  href={link.href}
                  target="_blank"
                >
                  <i className={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className="position-absolute start-0 bottom-0 w-100 rounded-bottom text-center p-4"
          style={{ background: "rgba(34, 36, 41, .9)" }}
        >
          <h5 className="text-uppercase text-light">{name}</h5>
          <p className="text-uppercase text-secondary m-0">{title}</p>
        </div>
      </div>
    </div>
  );
};
