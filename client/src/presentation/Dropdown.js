import React, { PureComponent } from 'react';
import { ButtonToolbar, Dropdown, MenuItem, Button } from 'react-bootstrap';

class DropdownButton extends PureComponent {
  constructor() {
    super();
    this.state = {
      button: 'Select Category'
    }
  }

  handleSelect = (eventKey, event) =>
    this.props.handleSelect(event)

  toggleDrop = (eventKey, event) => {
    this.setState({
      button: event.target.innerHTML
    })
  }


  render() {
    return (
      <ButtonToolbar>
        <Dropdown id="searchDropdown" onSelect={this.toggleDrop}>
          <Button bsStyle='info' id="button-1">{this.state.button}</Button>
          <Dropdown.Toggle />
          <Dropdown.Menu>
            {this.props.menuItems.map((item, i) =>
              <MenuItem key={i} eventKey={i} onSelect={this.handleSelect}
              value={item}>
                {item}
              </MenuItem>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </ButtonToolbar>
    )
  }
}

export default DropdownButton;
