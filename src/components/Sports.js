import React from 'react';
import { Link } from 'react-router-dom';
import './Sports.css';

const Sport = () => {
    return (
        <div className='full10'>
        <div className="sport-container">
            <h1 className="title">The Importance and Value of Sports</h1>
            <p className="intro">
                Sports play a crucial role in the physical, mental, and social development of students. 
                Engaging in sports activities not only helps in maintaining physical fitness but also teaches 
                important life skills such as teamwork, leadership, discipline, and perseverance. Sports 
                foster a sense of camaraderie, boost self-esteem, and contribute to the overall well-being of students.
            </p>
            
            <h2 className="subtitle">Available Sports in Our School</h2>
            <ul className="sports-list">
                <li>
                    <Link to="/sports/football">Football</Link>
                    <div className="sport-details">
                        <strong>Explanation:</strong> Football is one of the most popular sports worldwide, requiring skill, strategy, and teamwork.
                        <br />
                        <strong>Advantages:</strong> Enhances cardiovascular health, builds endurance, improves coordination.
                        <br />
                        <strong>Disadvantages:</strong> Risk of injury, requires a large playing area.
                        <br />
                        <strong>Extra Information:</strong> Football helps in developing leadership and strategic thinking.
                    </div>
                </li>
                <li>
                    <Link to="/sports/basketball">Basketball</Link>
                    <div className="sport-details">
                        <strong>Explanation:</strong> Basketball is a fast-paced sport that combines physical agility with strategic plays.
                        <br />
                        <strong>Advantages:</strong> Improves hand-eye coordination, builds muscle strength, promotes teamwork.
                        <br />
                        <strong>Disadvantages:</strong> Can be physically demanding, potential for joint injuries.
                        <br />
                        <strong>Extra Information:</strong> Basketball helps in developing quick decision-making skills.
                    </div>
                </li>
                <li>
                    <Link to="/sports/cricket">Cricket</Link>
                    <div className="sport-details">
                        <strong>Explanation:</strong> Cricket is a sport that emphasizes skill, patience, and teamwork, played with a bat and ball.
                        <br />
                        <strong>Advantages:</strong> Builds concentration, improves stamina, promotes teamwork.
                        <br />
                        <strong>Disadvantages:</strong> Requires a large playing area, can be time-consuming.
                        <br />
                        <strong>Extra Information:</strong> Cricket teaches patience and strategic planning.
                    </div>
                </li>
                <li>
                    <Link to="/sports/swimming">Swimming</Link>
                    <div className="sport-details">
                        <strong>Explanation:</strong> Swimming is a full-body workout sport that enhances cardiovascular and muscular endurance.
                        <br />
                        <strong>Advantages:</strong> Low impact on joints, improves lung capacity, enhances flexibility.
                        <br />
                        <strong>Disadvantages:</strong> Requires access to a pool, potential for drowning if not careful.
                        <br />
                        <strong>Extra Information:</strong> Swimming is excellent for improving breathing control and overall fitness.
                    </div>
                </li>
                <li>
                    <Link to="/sports/athletics">Athletics</Link>
                    <div className="sport-details">
                        <strong>Explanation:</strong> Athletics encompasses a variety of track and field events that test speed, strength, and endurance.
                        <br />
                        <strong>Advantages:</strong> Enhances overall physical fitness, promotes healthy competition, improves discipline.
                        <br />
                        <strong>Disadvantages:</strong> High physical demand, risk of overuse injuries.
                        <br />
                        <strong>Extra Information:</strong> Athletics encourages a spirit of competition and personal improvement.
                    </div>
                </li>
            </ul>
        </div>
        </div>
    );
};

export default Sport;
