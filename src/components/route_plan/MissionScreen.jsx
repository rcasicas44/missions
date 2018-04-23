import React, {Component} from 'react';
import '../MissionScreen.css';
import gpsPointIcon from '../../images/gps_point.svg';
import timeIcon from '../../images/time.svg';
import currencyImage from '../../images/dav.svg';
import PropTypes from 'prop-types';
import {humanReadableVehicleStatus} from '../../lib/utils';

class MissionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogDismissed: false,
      showDownloadDialog: false
    };
  }

  approveCompletedMission() {
    this.props.approveCompletedMission();
    this.setState({ showDownloadDialog: true });
  }

  showPlanRequestedDialog() {
    return this.state.dialogDismissed === false ? (
      <div id="wallet-dialog-screen" className="screen">
        <div className="screen-background--dark"/>
        <div className="modal-container">
          <div className="modal-box wallet-dialog">
            <h1>Route Plan Is In Progress</h1>
            <p>Once your route plan is ready you will be<br/> 
            notified via the app</p>
            <div id="rote-plan-img">
              <img
                src="/images/route_plan.png"
                alt="Route Plan"
              />
            </div>
            <button onClick={this.dismissDialog.bind(this)} className="big-button">
              OK
            </button>
          </div>
        </div>
      </div>) : (<div/>);
  }

  showPlanReadyDialog() {
    return this.state.showDownloadDialog ? (
      <div id="wallet-dialog-screen" className="screen">
        <div className="screen-background--dark"/>
        <div className="modal-container">
          <div className="modal-box wallet-dialog">
            <h1>Your Route Plan is Ready</h1>
            <p>Click the ‘Download’ button below to<br /> 
            view the full details of your route plan.</p>
            <button onClick={this.dismissDialog.bind(this)} className="big-button">
              DOWNLOAD
            </button>
          </div>
        </div>
      </div>) : (<div/>);
  }

  dismissDialog() {
    this.setState({ dialogDismissed: true });
  }

  render() {
    switch(this.props.missionStatus) {
    case 'completed': {
      return (
        <div>
          <div className="mission-info">
            <div className="mission-info-summary">
              {
                // TODO: draw path on map
              }
              <h1>Route Plan is Ready!</h1>
              <p>Press ‘Confirm’ to view route instructions</p>
              <p>Cost for delivery:</p>
              <h1>{(this.props.price/1000000000000000000).toFixed(2)} <img src={currencyImage} className="currency-symbol" alt="DAV"/></h1>
              <button onClick={this.approveCompletedMission.bind(this)} className="big-button close" >
                CONFIRM
              </button>
            </div>
          </div>
          { this.showPlanReadyDialog() }
        </div>
      );
    }
    case 'confirmed': {
      return this.showPlanReadyDialog();
    }
    case 'in_progress': {
      return this.showPlanRequestedDialog();
    }
    default: {
      return (
        <div className="mission-info">
          <div className="mission-info-container">
            <div className="mission-info-icon">
              <img src={gpsPointIcon} alt="GPS Point Icon"/>
            </div>
            <div className="mission-info-text">
              <p>Current State:</p>
              <h3>{humanReadableVehicleStatus[this.props.vehicleStatus]}</h3>
            </div>
          </div>
          <div className="mission-info-container">
            <div className="mission-info-icon">
              <img src={timeIcon} alt="Time Icon"/>
            </div>
            <div className="mission-info-text">
              <p>Estimated time to {this.props.leg} location:</p>
              <h3>{parseFloat(this.props.timeLeftInLeg) > 1 ? `${this.props.timeLeftInLeg} minutes` : 'less than a minute'}</h3>
            </div>
          </div>
        </div>
      );
    }
    }
  }
}

MissionScreen.propTypes = {
  history: PropTypes.object.isRequired,
  appPath: PropTypes.string,
  vehicleStatus: PropTypes.string,
  missionStatus: PropTypes.string.isRequired,
  leg: PropTypes.string,
  timeLeftInLeg: PropTypes.number,
  price: PropTypes.number,
  approveCompletedMission: PropTypes.func.isRequired,
};

export default MissionScreen;