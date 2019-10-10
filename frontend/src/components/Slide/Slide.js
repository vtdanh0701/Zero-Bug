import React, { Component } from 'react'
import './NewSlide.css'

export default class Slide extends Component {
    render() {
        return (
            <div id="carouselExampleIndicators" className="carousel no-padding slide" data-ride="carousel" data-interval='false'>
                  <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className='logo animated zoomIn d-block w-100'>
                            <i className="ion ion-bug"></i>
                            <i className='far fa-chart-bar'></i>
                        </div>
                        <div className='caption'>
                          <h5>Welcome to Zero Bug</h5>
                          <p>The all-inclusive project management solution that travels along with you. Collaborate and track your projects on the go.</p>
                        </div>
                        
                    </div>
                    <div className="carousel-item ">
                      <div className='logo d-block w-100'>
                            <i className="ion ion-bug bug-rotate" ></i>
                            <div className='circle circle-rotate'>
                                <div className='user-container'>
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className='bug-container'>
                                    <i className="fas fa-bug"></i>
                                </div>
                                <div className='project-container'>
                                    <i className="ion ion-clipboard"></i>
                                </div>
                            </div>
                      </div>
                      <div className='caption'>
                              <h5>Quick access wherever you are</h5>
                              <p>Access your project feed, bug even as you are away from your desk.</p>
                      </div>
                      
                    </div>
                    
                    <div className="carousel-item">
                      
                      <div className='logo animated zoomIn fast d-block w-100'>
                        <div className='platform-container'>
                          <div className='desktop-container'>
                            <i className="fas fa-desktop"></i>
                          </div>
                          <div className='tablet-container'>
                            <i className="fas fa-tablet-alt"></i>
                          </div>
                          <div className='mobile-container'>
                            <i className="fas fa-mobile-alt"></i>
                          </div>
                          <div className='tablet-screen'>
                            <i className='ion ion-bug'></i>
                          </div>
                        </div>
                         
                      </div>
                      <div className='caption'>
                        <h5>Support Multiple Platforms</h5>
                        <p>Design to work great on Desktop, Laptop, Tablet and Mobile. </p>
                      </div>
                      
                    </div>
                    
                  </div>
                 
                  

                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <i className="fas fa-chevron-left carousel-control-prev-icon" aria-hidden="true"></i>
                    <span className="sr-only">Previous</span>
                  </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <i className="fas fa-chevron-right carousel-control-next-icon" aria-hidden="true"></i>
                    <span className="sr-only">Next</span>
                  </a>
            </div>
        )
    }
}
