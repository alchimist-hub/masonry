import React from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  WindowScroller,
  Masonry
} from "react-virtualized";
import { Link, Switch, Route } from "react-router-dom";
import createCellPositioner from "./createCellPositioner";
import PropTypes from "prop-types";
import { debounce, throttle } from "lodash";
import fakerData from "./fakerData";
import faker from "faker";

import "./styles/App.css";

class OverviewList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: true,
      columnWidth: 200,
      height: 300,
      gutterSize: 10,
      items1: this.props.items
    };

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true
    });
    this.handlethrottled = throttle(this.handlescroll, 100);
    this.handledebounced = debounce(this.handlescroll, 100);
    this.handleClick = this.handleClick.bind(this);
    this.handlescroll = this.handlescroll.bind(this);
    this._onResize = this._onResize.bind(this);
    this._cellRenderer = this._cellRenderer.bind(this);
    this._setMasonryRef = this._setMasonryRef.bind(this);
    this._calculateColumnCount = this._calculateColumnCount.bind(this);
    this._resetCellPositioner = this._resetCellPositioner.bind(this);
  }

  _calculateColumnCount() {
    const { columnWidth, gutterSize } = this.state;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }

  _cellRenderer({ index, key, parent, style }) {
    const { items1 } = this.state;
    const { columnWidth } = this.state;

    const datum = items1[index % items1.length];
    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <div
          className={"cell"}
          style={{
            ...style,
            width: columnWidth
          }}
        >
          <Link to="/feed">
            <div
              style={{
                backgroundColor: datum.color,
                borderRadius: "0.5rem",
                height: datum.size * 3,
                marginBottom: "0.5rem",
                width: "100%",
                fontSize: 20,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onClick={this.handleClick}
            >
              {index}
            </div>
          </Link>
          {datum.random}
        </div>
      </CellMeasurer>
    );
  }

  static contextTypes = {
    customElement: PropTypes.any
  };

  _setMasonryRef(ref) {
    this._masonry = ref;
  }

  _onResize({ width }) {
    this._width = width;

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === "undefined") {
      const { columnWidth, gutterSize } = this.state;

      this._cellPositioner = createCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize
      });
    }
  }

  _resetCellPositioner() {
    const { columnWidth, gutterSize } = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize
    });
  }

  handlescroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    //e.preventDefault()
    const ROW_HEIGHTS = [25, 50, 75, 100];
    if (scrollTop > scrollHeight * 0.7) {
      //console.log('great it did work')
      const items = this.state.items1;
      console.log("hi there " + Array.isArray(items));
      for (let i = 0; i < 12; i++) {
        items.push({
          size: ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)],
          color: faker.internet.color()
        });
      }
      console.log("hi there " + items.length);
      this.setState(state => ({ items1: items }));
    }
  };
  handleClick = async () => {
    await this.setState(state => ({
      isClicked: !state.isClicked
    }));
  
    console.log("clicked " + this.state.isClicked);
  };

  render() {
    //const { items } = this.state.items1;
    this._initCellPositioner();

    return (
      <WindowScroller scrollElement={this.context.customElement}>
        {({ height, isScrolling, registerChild, scrollTop }) => (
          <AutoSizer
            disableHeight
            height={height}
            onResize={this._onResize}
            overscanByPixels={0}
            scrollTop={scrollTop}
          >
            {({ width }) => (
              <Masonry
                onScroll={this.handledebounced}
                autoHeight
                cellCount={this.state.items1.length}
                cellMeasurerCache={this._cache}
                cellPositioner={this._cellPositioner}
                cellRenderer={this._cellRenderer}
                height={height}
                overscanByPixels={0}
                ref={this._setMasonryRef}
                scrollTop={scrollTop}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    );
  }
}

export default OverviewList;
