import React from 'react';
import PropTypes from 'prop-types';

const Logger = props => (
  <div>
    {props.logs.map(log =>
      (
        <div key={log.line}>
          { props.viewLineNumber &&
            <span>{log.line} -</span>
          }
          {log.value}
        </div>
      ))
    }
  </div>);

Logger.defaultProps = {
  logs: [],
  viewLineNumber: false,
};

Logger.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object),
  viewLineNumber: PropTypes.bool,
};

export default Logger;
