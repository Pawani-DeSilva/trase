import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import LinkButton from 'react-components/shared/link-button.component';
import HighlightTextFragments from 'react-components/shared/highlight-text-fragments.component';

function ToolSearchResult({
  value,
  onClickAdd,
  selected,
  exporterNotSelected,
  importerNotSelected,
  itemProps,
  isHighlighted,
  item,
  contextId,
  defaultYear,
  isMapVisible
}) {
  const buttonList = [];

  if (selected) {
    buttonList.push(
      <button key="alreadyInSupplyChain" className="c-button -medium-large" disabled="true">
        Already in {isMapVisible ? 'map' : 'supply chain'}
      </button>
    );
  } else if (exporterNotSelected === importerNotSelected) {
    // The weird "if" above means that we only do NOT show this button if
    // node is both importer and exporter, and is added as one of them but no the other to the supply chain.
    // The "if" statement above that ensures it's also not shown if node is both and is selected
    // Commented out to hide the "add to supply chain"/"add to map" button
    // buttonList.push(
    //   <button
    //     key="addToSupplyChain"
    //     className="c-button -medium-large"
    //     onClick={e => onClickAdd(e, item)}
    //   >
    //     Add to {isMapVisible ? 'map' : 'supply chain'}
    //   </button>
    // );
  }

  if (!(exporterNotSelected && !importerNotSelected)) {
    if (exporterNotSelected) {
      buttonList.push(
        <button
          key="addAsExporter"
          onClick={e => onClickAdd(e, item.exporter)}
          className="c-button -medium-large"
        >
          Add as exporter
        </button>
      );
    }

    if (importerNotSelected) {
      buttonList.push(
        <button
          key="addAsImporter"
          onClick={e => onClickAdd(e, item.importer)}
          className="c-button -medium-large"
        >
          Add as importer
        </button>
      );
    }
  }

  return (
    <li {...itemProps} className={cx('c-search-result', { '-highlighted': isHighlighted })}>
      <div className="search-node-text-container">
        <span className="search-node-type">{item.type}</span>
        <span className="search-node-name">
          <HighlightTextFragments text={item.name} highlight={value} />
        </span>
      </div>
      <div className="search-node-actions-container">
        {buttonList}
        {item.profileType &&
          item.type.split(' & ').map(type => (
            <LinkButton
              className="-medium-large"
              key={item.name + type}
              to={{
                type: 'profileNode',
                payload: {
                  profileType: item.profileType,
                  query: {
                    contextId,
                    year: defaultYear,
                    nodeId: (item[type.toLowerCase()] || item).id
                  }
                }
              }}
            >
              {type} profile
            </LinkButton>
          ))}
      </div>
    </li>
  );
}

ToolSearchResult.propTypes = {
  item: PropTypes.object,
  value: PropTypes.string,
  selected: PropTypes.bool,
  onClickAdd: PropTypes.func,
  itemProps: PropTypes.object,
  isMapVisible: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  defaultYear: PropTypes.number,
  exporterNotSelected: PropTypes.bool,
  importerNotSelected: PropTypes.bool,
  contextId: PropTypes.number.isRequired
};

export default ToolSearchResult;
