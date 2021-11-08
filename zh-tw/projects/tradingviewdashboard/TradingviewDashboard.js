import React from 'react';

import {
  ProjectTitle,
  NewWindowLink,
  BackToProjects,
  YoutubeContainers,
  MetaTitle,
  GithubLink,
  MetaProjectDetail
} from '../../../components/index'

// import './ProjectDescription.css';
// import './TradingviewDashboard.css';

import head_pic from './tradingview-dashboard.png'

class ProjectDescription extends React.Component{
  render(){
    return (

      <div className="desc-container">
        <div className="project-description">
          <BackToProjects />

          <ProjectTitle project_title="tradingview dashboard" />

          <div className="desc-header-picture" >
            <img src={head_pic} alt="" />
          </div>

          <div className="desc-body">
            <h3 className="topic">Purpose</h3>
            <p>a simple page to monitor stock, while data provided by tradingview</p>

            <h3 className="topic">Demo</h3>
            <NewWindowLink link="https://louiscklaw.github.io/tradingview-tile-tryout" />

            <h3 className="topic">ref/repo:</h3>
            <NewWindowLink link="https://github.com/louiscklaw/tradingview-tile-tryout" />
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectDescription