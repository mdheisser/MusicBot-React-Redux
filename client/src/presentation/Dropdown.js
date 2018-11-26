import React from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

const Dropdown = ({ menuItems, handleSelect }) =>
  <ButtonToolbar>
    <DropdownButton bsStyle='info' title='Search Category'
    id='dropdown-basic'>
      {menuItems.map((item, i) =>
        <MenuItem key={i} eventKey={i} onSelect={handleSelect}>
          {item}
        </MenuItem>
      )}
    </DropdownButton>
  </ButtonToolbar>




export default Dropdown;
