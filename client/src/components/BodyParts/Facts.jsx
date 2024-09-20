import React, { useState, useEffect, useCallback, useRef } from 'react';
export default function Facts() {
    const [experience, setExperience] = useState(0);
    const [trainers, setTrainers] = useState(0);
    const [projects, setProjects] = useState(0);
    const [clients, setClients] = useState(0);
    const inViewRef = useRef(false);
    const timerRef = useRef(null);

    const handleScroll = () => {
        const element = document.getElementById('facts');
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        if (isInView && !inViewRef.current) {
            inViewRef.current = true;
            startCounter();
        } else if (!isInView && inViewRef.current) {
            inViewRef.current = false;
            clearInterval(timerRef.current);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const startCounter = () => {
        timerRef.current = setInterval(() => {
            setExperience(prevExperience => {
                if (prevExperience < 777) return prevExperience + 1;
                return prevExperience;
            });
            setTrainers(prevTrainers => {
                if (prevTrainers < 777) return prevTrainers + 1;
                return prevTrainers;
            });
            setProjects(prevProjects => {
                if (prevProjects < 777) return prevProjects + 1;
                return prevProjects;
            });
            setClients(prevClients => {
                if (prevClients < 777) return prevClients + 1;
                return prevClients;
            });
        }, 1);
    };

    return (
        <div id="facts" className="container-fluid bg-dark facts p-5 my-5">
            <div className="row gx-5 gy-4 py-5">
                <div className="col-lg-3 col-md-6">
                    <div className="d-flex">
                        <div
                            className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                            style={{ width: 60, height: 60 }}
                        >
                            <i className="fa fa-star fs-4 text-white" />
                        </div>
                        <div className="ps-4">
                            <h5 className="text-secondary text-uppercase">Experience</h5>
                            <h1 className="display-5 text-white mb-0">{experience.toLocaleString()}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="d-flex">
                        <div
                            className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                            style={{ width: 60, height: 60 }}
                        >
                            <i className="fa fa-users fs-4 text-white" />
                        </div>
                        <div className="ps-4">
                            <h5 className="text-secondary text-uppercase">Our Trainers</h5>
                            <h1 className="display-5 text-white mb-0">{trainers.toLocaleString()}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="d-flex">
                        <div
                            className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                            style={{ width: 60, height: 60 }}
                        >
                            <i className="fa fa-check fs-4 text-white" />
                        </div>
                        <div className="ps-4">
                            <h5 className="text-secondary text-uppercase">Complete Project</h5>
                            <h1 className="display-5 text-white mb-0">{projects.toLocaleString()}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="d-flex">
                        <div
                            className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                            style={{ width: 60, height: 60 }}
                        >
                            <i className="fa fa-mug-hot fs-4 text-white" />
                        </div>
                        <div className="ps-4">
                            <h5 className="text-secondary text-uppercase">Happy Clients</h5>
                            <h1 className="display-5 text-white mb-0">{clients.toLocaleString()}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}