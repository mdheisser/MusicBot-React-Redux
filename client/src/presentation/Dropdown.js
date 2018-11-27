import React from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

function Dropdown(props) {
  const handleSelect = (eventKey, event) =>
    props.handleSelect(event)

  return (
    <ButtonToolbar>
      <DropdownButton bsStyle='info' title='Search Category'
      id='dropdown-basic'>
        {props.menuItems.map((item, i) =>
          <MenuItem key={i} eventKey={i} onSelect={handleSelect}
          value={item}>
            {item}
          </MenuItem>
        )}
      </DropdownButton>
    </ButtonToolbar>
  )
}

export default Dropdown;
