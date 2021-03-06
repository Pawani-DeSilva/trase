import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import DashboardElement from 'react-components/dashboard-element/dashboard-element.component';
import {
  getActiveIndicatorsData,
  getDirtyBlocks,
  getDynamicSentence
} from 'react-components/dashboard-element/dashboard-element.selectors';
import { getPanelId } from 'utils/dashboardPanel';
import {
  openIndicatorsStep as openIndicatorsStepFn,
  setDashboardActivePanel as setDashboardActivePanelFn
} from 'react-components/dashboard-element/dashboard-element.actions';
import { DASHBOARD_STEPS } from 'constants';

const mapStateToProps = state => ({
  indicators: state.dashboardElement.data.indicators,
  activeIndicators: getActiveIndicatorsData(state),
  dynamicSentenceParts: getDynamicSentence(state),
  dirtyBlocks: getDirtyBlocks(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDashboardActivePanel: setDashboardActivePanelFn,
      openIndicatorsStep: openIndicatorsStepFn,
      goToRoot: () => ({ type: 'dashboardRoot' })
    },
    dispatch
  );

class DashboardElementContainer extends React.Component {
  static propTypes = {
    dirtyBlocks: PropTypes.object,
    activeIndicators: PropTypes.array,
    goToRoot: PropTypes.func.isRequired,
    dynamicSentenceParts: PropTypes.array,
    openIndicatorsStep: PropTypes.func.isRequired,
    setDashboardActivePanel: PropTypes.func.isRequired
  };

  hasVisitedBefore = {
    key: 'TRASE__HAS_VISITED_DASHBOARDS_BEFORE',
    get() {
      return !ALWAYS_DISPLAY_DASHBOARD_INFO && localStorage.getItem(this.key);
    },
    set(key) {
      return localStorage.setItem(this.key, key);
    }
  };

  state = {
    modalOpen: true,
    editMode: false,
    step: this.hasVisitedBefore.get() ? DASHBOARD_STEPS.sources : DASHBOARD_STEPS.welcome
  };

  componentDidMount() {
    if (!this.hasVisitedBefore.get()) {
      this.hasVisitedBefore.set(Date.now());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { step } = this.state;
    if (step !== prevState.step) {
      const { setDashboardActivePanel, openIndicatorsStep } = this.props;
      if (step !== DASHBOARD_STEPS.indicators) {
        setDashboardActivePanel(getPanelId(step));
      } else {
        openIndicatorsStep();
      }
    }
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  reopenPanel = step => this.setState({ step, editMode: true, modalOpen: true });

  updateStep = step => this.setState({ step });

  render() {
    const { step, modalOpen, editMode } = this.state;
    const {
      goToRoot,
      activeIndicators,
      dynamicSentenceParts,
      dirtyBlocks,
      openIndicatorsStep
    } = this.props;
    return (
      <DashboardElement
        step={step}
        editMode={editMode}
        goToRoot={goToRoot}
        modalOpen={modalOpen}
        dirtyBlocks={dirtyBlocks}
        setStep={this.updateStep}
        closeModal={this.closeModal}
        reopenPanel={this.reopenPanel}
        activeIndicators={activeIndicators}
        openIndicatorsStep={openIndicatorsStep}
        dynamicSentenceParts={dynamicSentenceParts}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardElementContainer);
