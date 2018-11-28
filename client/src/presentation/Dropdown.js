import React from 'react';
import { ButtonToolbar, Dropdown, MenuItem, Button } from 'react-bootstrap';

function DropdownButtons(props) {
  const handleSelect = (eventKey, event) =>
    props.handleSelect(event)

  return (
    <ButtonToolbar>
      <Dropdown>
        <Dropdown.Toggle>
          <Button bsStyle='info' id="button-1"> Select Category </Button>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {props.menuItems.map((item, i) =>
            <MenuItem key={i} eventKey={i} onSelect={handleSelect}
            value={item}>
              {item}
            </MenuItem>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </ButtonToolbar>
  )
}

export default DropdownButtons;
