import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
interface Props {
  updateCallback: Function;
  value: number;
  value2: number;
  fieldName: string;
  fieldLabel: string;
  helpText: string;
}

const SliderField = (props: Props) => {
  const { updateCallback, fieldName, value, value2, helpText, fieldLabel } = props;

  const onValueChange = (event: ChangeEvent<any>) => {
    updateCallback({ [fieldName]: parseInt(event.target.value) });
  };
  const onValueChange2 = (event: ChangeEvent<any>) => {
    updateCallback({ [fieldName]: parseInt(event.target.value2) });
  };

  return (
    <>
      <Label htmlFor={fieldName}>{fieldLabel}</Label>
      <InputContainer>
        <Input
          name={fieldName}
          value={value}
          type="range"
          min="0"
          max="100"
          onChange={onValueChange}
        />
        <Value>{value}</Value>
        <Input
          name={fieldName}
          value={value2}
          type="range"
          min="0"
          max="100"
          onChange={onValueChange2}
        />
        <Value>{value2}</Value>
      </InputContainer>

      <HelpText>{helpText}</HelpText>
    </>
  );
};

export default SliderField;

const Label = styled.label`
  text-transform: capitalize;
  display: inline-block;
  color: #2a3039;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-size: 0.875rem;
  line-height: 1.5;
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

const InputContainer = styled.div`
  display: flex;
  align-content: center;
`;

const Value = styled(Label)`
  padding: 1rem;
  min-width: 3rem;
  text-align: center;
  color: #2a3039;
  font-weight: 600;
`;

const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  margin: 13.8px 0;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: #3c80cf;
    border-radius: 1.3px;
    border: 0.2px solid #c5d2d8;
  }

  input[type='range']:nth-child(2)::-webkit-slider-runnable-track {
    background: none;
  }

  &::-webkit-slider-thumb {
    z-index: 1;
    position: relative;

    border: 1.5px solid #000000;
    height: 36px;
    width: 18px;
    border-radius: 2px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }

  input[type='range']:nth-child(1)::-webkit-slider-thumb {
    z-index: 0;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }
  &::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: #3c80cf;
    border-radius: 1.3px;
    border: 0.2px solid #c5d2d8;
  }
  &::-moz-range-thumb {
    border: 1.5px solid #000000;
    height: 36px;
    width: 18px;
    border-radius: 2px;
    background: #ffffff;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #c5d2d8;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &::-ms-fill-upper {
    background: #3c80cf;
    border: 0.2px solid #c5d2d8;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &::-ms-thumb {
    border: 1.5px solid #000000;
    height: 36px;
    width: 18px;
    border-radius: 2px;
    background: #ffffff;
    cursor: pointer;
    height: 8.4px;
  }
  &:focus::-ms-fill-lower {
    background: #3c80cf;
  }
  &:focus::-ms-fill-upper {
    background: #367ebd;
  }
`;
