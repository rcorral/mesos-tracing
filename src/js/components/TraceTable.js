var moment = require('moment');
var React = require('react');

var EventTypes = require('../constants/EventTypes');
var RedisStore = require('../stores/RedisStore');

export default React.createClass({

  getInitialState: function() {
    return {
      traceList: []
    };
  },

  componentDidMount: function() {
    RedisStore.on(EventTypes.TRACE_META_UPDATED, this.onTraceMetaUpdate);
  },

  onTraceMetaUpdate: function() {
    this.setState({traceList: RedisStore.getTraces()});
  },

  getTableRows: function() {
    var list = this.state.traceList;
    var traceIDs = Object.keys(list);

    return traceIDs.map(function(traceID) {
      var trace = list[traceID];
      var date = moment.unix(trace.timestamp).fromNow();

      return (
        <tr key={traceID}>
          <td>{trace.traceID}</td>
          <td>{date}</td>
          <td>{trace.spanCount}</td>
        </tr>
      );
    });
  },

  render: function() {

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Trace ID</th>
            <th>Timestamp</th>
            <th>Span count</th>
          </tr>
        </thead>
        <tbody>{this.getTableRows()}</tbody>
      </table>
    );
  }

});
