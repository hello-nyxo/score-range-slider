import React from 'react';
import { render } from 'react-dom';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import SliderField from './SliderField';
import styled from 'styled-components';

interface AppProps {
  sdk: FieldExtensionSDK;
}

interface AppState {
  // duration: number;
  // jetlag: number;
  // consistency: number;
  // efficiency: number;
  lowEnd: number;
  highEnd: number;
}

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -7,
        marginTop: 25,
        zIndex: 2,
        width: 25,
        height: 25,
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#2C4870',
        color: '#333'
      }}
      {...getHandleProps(id)}>
      <div style={{ fontFamily: 'Helvetica', fontSize: 12, marginTop: -25 }}>{value}</div>
    </div>
  );
}

function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 8,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#546C91',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {
        ...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */
      }
    />
  );
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const values = props.sdk.field.getValue();

    if (values) {
      const lowEnd = values.lowEnd ? values.lowEnd : 0;
      const highEnd = values.highEnd ? values.highEnd : 0; // 0 vai 100??

      this.state = {
        lowEnd: lowEnd,
        highEnd: highEnd
      };
    } else {
      this.state = {
        lowEnd: 0,
        highEnd: 100
      };
    }
    //   const duration = values.duration ? values.duration : 0;
    //   const jetlag = values.jetlag ? values.jetlag : 0;
    //   const consistency = values.consistency ? values.consistency : 0;
    //   const efficiency = values.efficiency ? values.efficiency : 0;

    //   this.state = {
    //     duration: duration,
    //     jetlag: jetlag,
    //     consistency: consistency,
    //     efficiency: efficiency
    //   };
    // } else {
    //   this.state = {
    //     duration: 0,
    //     jetlag: 0,
    //     consistency: 0,
    //     efficiency: 0
    //   };
    // }
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
      const { lowEnd, highEnd } = this.state;
      const update = {
        lowEnd,
        highEnd
      };
      await this.props.sdk.field.setValue(update);
    } else {
      await this.props.sdk.field.removeValue();
    }
  };

  // updateContentfulValue = async () => {
  //   if (this.state) {
  //     const { duration, jetlag, consistency, efficiency } = this.state;
  //     const update = {
  //       duration,
  //       jetlag,
  //       consistency,
  //       efficiency
  //     };
  //     await this.props.sdk.field.setValue(update);
  //   } else {
  //     await this.props.sdk.field.removeValue();
  //   }
  // };

  updateCallback = (item: any) => {
    this.setState(prevState => ({ ...prevState, ...item }));
    this.updateContentfulValue();
  };

  // onValueChange = (event: ChangeEvent<any>) => {
  //   updateCallback({ [fieldName]: parseInt(event.target.value) });
  // };

  onChange = () => {
    console.log('seepra'); // ei toimi..
  };

  render = () => {
    const { lowEnd, highEnd } = this.state;
    return (
      <div className="App">
        <Form spacing="condensed">
          <Slider rootStyle={sliderStyle} domain={[0, 100]} step={1} mode={2} values={[0, 100]}>
            <Rail>{({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}</Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                  {handles.map(handle => (
                    <Handle key={handle.id} handle={handle} getHandleProps={getHandleProps} />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks left={false} right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="slider-tracks">
                  {tracks.map(({ id, source, target }) => (
                    <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
                  ))}
                </div>
              )}
            </Tracks>
          </Slider>

          {/* <SliderField
            value={duration}
            fieldLabel="Score Range"
            fieldName="duration"
            updateCallback={this.updateCallback}
            helpText="Select the questionnaire score range associated with this result. Don't select ranges overlapping with other results!"
          /> */}

          {/* <SliderField
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
          /> */}
        </Form>
      </div>
    );
  };
}

const sliderStyle = {
  // Give the slider some width
  position: 'relative',
  width: '98%',
  height: 80
};

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 8,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: '#D6D8E3'
};

const Form = styled.form`
  align-content: center;
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
