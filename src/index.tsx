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
      const highEnd = values.highEnd ? values.highEnd : 0; // 0 or 100??

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
  }

  updateContentfulValue = async () => {
    // console.log(this.state);
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

  onChange = (event: any) => {
    this.setState({ lowEnd: event[0], highEnd: event[1] });
    this.updateContentfulValue();
  };

  render = () => {
    const { lowEnd, highEnd } = this.state;
    return (
      <div className="App">
        <Form spacing="condensed">
          <Slider
            rootStyle={sliderStyle}
            domain={[0, 100]}
            step={1}
            mode={2}
            onChange={this.onChange}
            values={[lowEnd, highEnd]}>
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
          <HelpText>
            {
              "Select the questionnaire score range associated with this result. Don't select ranges overlapping with other results!"
            }
          </HelpText>
        </Form>
      </div>
    );
  };
}

const sliderStyle = {
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

const HelpText = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-size: 0.875rem;
  line-height: 1.5;
  display: block;
  margin: 0;
  color: #8091a5;
  margin-bottom: 2rem;
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
