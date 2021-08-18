import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import Actions from "../actions";
import Selectors from "../selectors";

export class Info extends Component {
  componentDidMount() {
    const { entity, name, url, options, params } = this.props;
    this.Load(entity, name, url, options, params);
  }

  componentDidUpdate(prevProps) {
    const { entity, name, url, options, params } = this.props;
    if (!isEqual(options, prevProps.options) || !isEqual(params, prevProps.params)) {
      this.Load(entity, name, url, options, params);
    }
  }

  Load = (
    entity = "info",
    name,
    url,
    options,
    { page = 1, limit = 0, sort = "", fields = [], include = [], filter = [] } = {}
  ) => {
    const { LoadInfo } = this.props;
    LoadInfo({
      entity,
      name,
      url,
      options,
      params: { page, limit, sort, fields, include, filter }
    });
  };

  render() {
    const { items, isFetched, meta, children } = this.props;
    return children({ items, meta, isFetched });
  }
}

const mapStateToProps = () => {
  const getInfo = Selectors.getInfo();

  return (state, props) => {
    const { items, isFetched, meta } = getInfo(state, props);

    return { items, isFetched, meta };
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      LoadInfo: Actions.LoadInfo.request
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Info);
