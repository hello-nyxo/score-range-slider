import * as React from "react";
import { render } from "react-dom";
import { TextInput } from "@contentful/forma-36-react-components";
import { init, FieldExtensionSDK } from "contentful-ui-extensions-sdk";
import "@contentful/forma-36-react-components/dist/styles.css";
import "./index.css";

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
    const {
      duration = 0,
      jetlag = 0,
      consistency = 0,
      efficiency = 0
    } = props.sdk.field.getValue();

    this.state = {
      duration: parseInt(duration),
      jetlag: parseInt(jetlag),
      consistency: parseInt(consistency),
      efficiency: parseInt(efficiency)
    };
  }

  detachExternalChangeHandler: Function | null = null;

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(
      this.onExternalChange
    );
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = (value: {
    efficiency: string;
    duration: string;
    jetlag: string;
    consistency: string;
  }) => {
    console.log("onExternalChange", value);
    const { efficiency, duration, jetlag, consistency } = value;
    this.setState({
      efficiency: parseInt(efficiency),
      duration: parseInt(duration),
      jetlag: parseInt(jetlag),
      consistency: parseInt(consistency)
    });
  };

  updateContentfulValue = async () => {
    if (this.state) {
      const { efficiency, duration, jetlag, consistency } = this.state;

      const update = {
        efficiency,
        duration,
        jetlag,
        consistency
      };

      console.log("this.updateContentfulValue", update);
      await this.props.sdk.field.setValue(update);
    } else {
      await this.props.sdk.field.removeValue();
    }
  };

  // onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.currentTarget.value;
  //   this.setState({ value });
  //   if (value) {
  //     await this.props.sdk.field.setValue(value);
  //   } else {
  //     await this.props.sdk.field.removeValue();
  //   }
  // };

  handleDurationChange = async (event: any) => {
    await this.setState({ duration: event.target.value });
    await this.updateContentfulValue();
  };

  handleJetlagChange = async (event: any) => {
    await this.setState({ jetlag: event.target.value });
    await this.updateContentfulValue();
  };

  handleConsistencyChange = async (event: any) => {
    await this.setState({ consistency: event.target.value });
    await this.updateContentfulValue();
  };

  handleEfficiencyChange = async (event: any) => {
    await this.setState({ efficiency: event.target.value });
    await this.updateContentfulValue();
  };

  // handleEveningTypeChange = (event: any) => {
  //   setEveningType(event.target.value);
  // };

  // handleMorningTypeChange = (event: any) => {
  //   setMorningType(event.target.value);
  // };

  // handleQualityChange = (event: any) => {
  //   setQuality(event.target.value);
  // };

  render = () => {
    return (
      <div className="App">
        <div className="gridContainer">
          <div className="sliderHeader">
            {" "}
            <h2> Duration </h2>
          </div>
          <input
            value={this.state.duration}
            type="range"
            min="0"
            max="100"
            className="sliderRange"
            onChange={this.handleDurationChange}
          />
          <span className="valueField">{this.state.duration}</span>

          <div className="sliderHeader">
            {" "}
            <h2> Social Jetlag </h2>
          </div>
          <input
            value={this.state.jetlag}
            type="range"
            min="0"
            max="100"
            className="sliderRange"
            onChange={this.handleJetlagChange}
          />
          <span className="valueField">{this.state.jetlag}</span>

          <div className="sliderHeader">
            {" "}
            <h2> Consistency </h2>
          </div>
          <input
            value={this.state.consistency}
            type="range"
            min="0"
            max="100"
            className="sliderRange"
            onChange={this.handleConsistencyChange}
          />
          <span className="valueField">{this.state.consistency}</span>

          <div className="sliderHeader">
            {" "}
            <h2> Efficiency </h2>
          </div>
          <input
            value={this.state.efficiency}
            type="range"
            min="0"
            max="100"
            className="sliderRange"
            onChange={this.handleEfficiencyChange}
          />
          <span className="valueField">{this.state.efficiency}</span>

          {/* <div className="sliderHeader">
            {' '}
            <h2> Evening Type </h2>
          </div>
          <Input
            value={eveningType}
            type="range"
            min="0"
            max="100"
            class="sliderRange"
            onChange={handleEveningTypeChange}
          />
          <span className="valueField">{this.state}</span> */}

          {/* <div className="sliderHeader">
            {' '}
            <h2> Morning Type </h2>
          </div>
          <Input
            value={morningType}
            type="range"
            min="0"
            max="100"
            class="sliderRange"
            onChange={handleMorningTypeChange}
          />
          <span class="valueField">{morningType}</span>

          <div class="sliderHeader">
            {' '}
            <h2> Sleep Quality </h2>
          </div>
          <Input
            value={quality}
            type="range"
            min="0"
            max="100"
            class="sliderRange"
            onChange={handleQualityChange}
          />
          <span class="valueField">{quality}</span> */}
        </div>
      </div>
    );
  };
}

init(sdk => {
  render(
    <App sdk={sdk as FieldExtensionSDK} />,
    document.getElementById("root")
  );
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
