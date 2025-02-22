import React from 'react'

import PropTypes from 'prop-types'

import './items.css'

const Items = (props) => {
  return (
    <div className={`items-items ${props.rootClassName} `}>
      <div data-role="accordion-container" className="items-element accordion">
        <div className="items-content">
          <span className="items-header">{props.header}</span>
          <span data-role="accordion-content" className="items-description">
            {props.description}
          </span>
        </div>
        <div className="items-icon-container">
          <svg
            viewBox="0 0 1024 1024"
            data-role="accordion-icon-closed"
            className="items-icon"
          >
            <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
          <svg
            viewBox="0 0 1024 1024"
            data-role="accordion-icon-open"
            className="items-icon02"
          >
            <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
      </div>
      <div data-role="accordion-container" className="items-element1 accordion">
        <div className="items-content1">
          <span className="items-header1">{props.header1}</span>
          <span data-role="accordion-content" className="items-description1">
            {props.description1}
          </span>
        </div>
        <div className="items-icon-container1">
          <svg
            viewBox="0 0 1024 1024"
            data-role="accordion-icon-closed"
            className="items-icon04"
          >
            <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
          <svg
            viewBox="0 0 1024 1024"
            data-role="accordion-icon-open"
            className="items-icon06"
          >
            <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
      </div>
      <div data-role="accordion-container" className="items-element2 accordion">
        <div className="items-content2">
          <span className="items-header2">{props.header2}</span>
          <span data-role="accordion-content" className="items-description2">
            {props.description2}
          </span>
        </div>
        <div className="items-icon-container2">
          <svg
            viewBox="0 0 1024 1024"
            data-role="accordion-icon-closed"
            className="items-icon08"
          >
            <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
          <svg
            viewBox="0 0 1024 1024"
            data-role="accordion-icon-open"
            className="items-icon10"
          >
            <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

Items.defaultProps = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  description1:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  description2:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  header: 'Esse cillum dolore eu fugiat nulla pariatur.',
  header1: 'Esse cillum dolore eu fugiat nulla pariatur.',
  rootClassName: '',
  header2: 'Esse cillum dolore eu fugiat nulla pariatur.',
}

Items.propTypes = {
  description: PropTypes.string,
  description1: PropTypes.string,
  description2: PropTypes.string,
  header: PropTypes.string,
  header1: PropTypes.string,
  rootClassName: PropTypes.string,
  header2: PropTypes.string,
}

export default Items
