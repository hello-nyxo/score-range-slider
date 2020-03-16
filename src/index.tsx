import React from 'react';
import { render } from 'react-dom';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import SliderField from './SliderField';
import RadarChart from './Radar';
import styled from 'styled-components';

interface AppProps {
  sdk: FieldExtensionSDK;
}

interface AppState {
  duration: number;
  jetlag: number;
  consistency: number;
  efficiency: number;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const values = props.sdk.field.getValue();

    if (values) {
      const duration = values.duration ? values.duration : 0;
      const jetlag = values.jetlag ? values.jetlag : 0;
      const consistency = values.consistency ? values.consistency : 0;
      const efficiency = values.efficiency ? values.efficiency : 0;

      this.state = {
        duration: duration,
        jetlag: jetlag,
        consistency: consistency,
        efficiency: efficiency
      };
    } else {
      this.state = {
        duration: 0,
        jetlag: 0,
        consistency: 0,
        efficiency: 0
      };
    }
  }

  detachExternalChangeHandler: Function | null = null;

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = (value: any) => {
    // const { duration, jetlag, consistency, efficiency } = value;
  };

  updateContentfulValue = async () => {
    if (this.state) {
      const { duration, jetlag, consistency, efficiency } = this.state;
      const update = {
        duration,
        jetlag,
        consistency,
        efficiency
      };
      await this.props.sdk.field.setValue(update);
    } else {
      await this.props.sdk.field.removeValue();
    }
  };

  updateCallback = (item: any) => {
    this.setState(prevState => ({ ...prevState, ...item }));
    this.updateContentfulValue();
  };

  render = () => {
    const { duration, jetlag, consistency, efficiency } = this.state;
    return (
      <div className="App">
        <Form spacing="condensed">
          <RadarChart data={this.state} />

          <SliderField
            value={duration}
            fieldLabel="Duration of Sleep"
            fieldName="duration"
            updateCallback={this.updateCallback}
            helpText="Duration is the measure of how long the nights are. Nights that are below the designated length give a lower score, as do nights that exceed it by a large margin."
          />
          <SliderField
            value={jetlag}
            fieldLabel="Social Jet Lag"
            fieldName="jetlag"
            updateCallback={this.updateCallback}
            helpText="Social Jet lag measures the differences between weekend and weekday nights. Lower score means user has more problems in keeping a consistent sleep schedule."
          />
          <SliderField
            value={consistency}
            fieldLabel="Sleep Consistency"
            fieldName="consistency"
            updateCallback={this.updateCallback}
            helpText="Sleep consistency is a measure of how consistent the user's sleep is between each night. "
          />
          <SliderField
            value={efficiency}
            fieldLabel="Sleep Efficiency"
            fieldName="efficiency"
            updateCallback={this.updateCallback}
            helpText="Sleep efficiency is a measure of how efficiently user sleep. 
            It is calculated based on difference between time spent in bed versus time spent asleep.
             Night with many wake ups and disruptions also gives a lower efficiency number."
          />
        </Form>
      </div>
    );
  };
}

const Form = styled.form`
  display: block;
`;

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
