import React from 'react';
import CHART_CONFIG from 'react-components/dashboard-element/dashboard-widget/dashboard-widget-config';
import DashboardWidgetTooltip from 'react-components/dashboard-element/dashboard-widget/dashboard-widget-tooltip';

const meta = {
  xAxis: {
    label: 'Year',
    prefix: '',
    format: '',
    suffix: ''
  },
  yAxis: {
    label: 'Trade volume',
    prefix: '',
    format: '',
    suffix: 't'
  },
  x: {
    type: 'category',
    label: 'Year',
    tooltip: {
      prefix: '',
      format: '',
      suffix: ''
    }
  },
  y1: {
    type: 'number',
    label: '',
    tooltip: {
      prefix: '',
      format: '',
      suffix: ''
    }
  }
};

const tooltip = {
  ...CHART_CONFIG.tooltip,
  content: <DashboardWidgetTooltip meta={meta} />,
  cursor: {
    opacity: 0.5,
    stroke: '#9a1e2a',
    strokeWidth: 2
  }
};

const colors = [
  { label: 'Trade volume', color: '#fff0c2' },
  { label: 'Production of soy', color: '#ee5463' }
];

const lineConfig = {
  ...CHART_CONFIG.line,
  tooltip,
  colors,
  yKeys: {
    lines: {
      y1: { fill: '#fff0c2', stroke: '#fff0c2' },
      y2: { fill: '#ee5463', stroke: '#ee5463' }
    }
  },
  yAxisLabel: { text: 'Label', suffix: 't' }
};

export default {
  line: lineConfig,
  bar: {
    ...lineConfig,
    type: 'bar',
    yKeys: {
      bars: {
        y1: { fill: '#fff0c2', stroke: '#fff0c2', interval: 'preserveStartEnd' },
        y2: { fill: '#ee5463', stroke: '#ee5463', interval: 'preserveStartEnd' }
      }
    }
  },
  stackedBar: {
    ...lineConfig,
    type: 'bar',
    yKeys: {
      bars: {
        y1: { fill: '#fff0c2', stroke: '#fff0c2', interval: 'preserveStartEnd', stackId: 'bar' },
        y2: { fill: '#fd7d8a', stroke: '#fd7d8a', interval: 'preserveStartEnd', stackId: 'bar' }
      }
    }
  },
  pie: {
    ...CHART_CONFIG.pie,
    tooltip,
    colors,
    type: 'pie',
    yKeys: {
      pies: {
        y1: {
          nameKey: 'x',
          innerRadius: '60%',
          outerRadius: '80%'
        }
      }
    }
  }
};