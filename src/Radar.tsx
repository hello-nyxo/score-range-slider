import React from 'react';
import Radar from 'react-d3-radar';

interface Props {
  data: {
    duration: number;
    jetlag: number;
    consistency: number;
    efficiency: number;
  };
}

const RadarChart = (props: Props) => {
  const { data } = props;
  const variables = [
    { key: 'duration', label: 'Duration' },
    { key: 'jetlag', label: 'Jet lag' },
    { key: 'consistency', label: 'Consistency' },
    { key: 'efficiency', label: 'Efficiency' }
  ];

  return (
    <Radar
      width={500}
      height={300}
      padding={10}
      domainMax={100}
      highlighted={null}
      data={{
        variables: variables,
        sets: [
          {
            key: 'lesson',
            label: '',
            values: data
          }
        ]
      }}
    />
  );
};

export default RadarChart;
