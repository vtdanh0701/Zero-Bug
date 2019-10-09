import React, { Component} from 'react';
import './LandingPage.css'
import slide1 from '../assets/img/slide1.png'
import slide2 from '../assets/img/slide2.png'
import slide3 from '../assets/img/slide3.jpg'
import cardImg1 from '../assets/img/card_img1.jpeg';
import cardImg2 from '../assets/img/card_img2.png'
import cardImg3 from '../assets/img/card_img3.png'
import cardImg4 from '../assets/img/card_img4.jpg'



class LandingPage extends Component {
   
    render(){
        return(
            <div className='landing'>

                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-interval="4000">
                    <img src={slide1} className="d-block w-100 " alt="..."/>
                    </div>
                    <div className="carousel-item" data-interval="4000">
                    <img src={slide2} className="d-block w-100 " alt="..."/>
                    </div>
                    <div className="carousel-item" data-interval="4000">
                    <img src={slide3} className="d-block w-100 " alt="..."/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
                <h1>About Zero Bug</h1>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Manage Bugs</h5>
                        <img src={cardImg1} className="card-img-top" alt="..."/>
                        <p className="card-text">Ability to define Special Event days (days where employees cannot request time-off, are warned or notified on the calendar)</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Manage Errors</h5>
                        <img src={cardImg2} className="card-img-top" alt="..."/>
                        <p className="card-text">Three levels of users (Administrators, Managers, Employees), each with their own different permissions.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Manage Users</h5>
                        <img src={cardImg3} className="card-img-top" alt="..."/>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Manage Login</h5>
                        <img src={cardImg4} className="card-img-top" alt="..."/>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default LandingPage;