import React from 'react';
import { Table, TableRow, TableHead, TableCell, TableBody, IconButton, Icon, Menu, MenuItem, CircularProgress, Typography } from '@material-ui/core';
import moment from 'moment';
import { IInvoice } from 'interfaces';

interface IInvoiceRowProps {
  invoice: IInvoice;
  onDelete: () => void;
  onEdit: () => void;
  deleting: boolean;
  editing: boolean;
}

class InvoiceRow extends React.Component<IInvoiceRowProps> {
  state = {
    anchorEl: null,
  }

  handleOpenOptions = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleCloseOptions = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { invoice, onDelete, onEdit, deleting, editing } = this.props;
    return (
      <TableRow
      >
        <TableCell>{invoice.customerName}</TableCell>
        <TableCell>{moment(invoice.date).format('MMM DD, YYYY')}</TableCell>
        <TableCell align="right">$ {invoice.amount.toFixed(2)}</TableCell>
        <TableCell align="center" style={{ maxWidth: 96, width: 96 }}>
          {(deleting || editing) && (
            <CircularProgress size={16} />
          )}
          {!deleting && !editing && (
            <React.Fragment>
              <IconButton onClick={this.handleOpenOptions}>
                <Icon>more_vert</Icon>
              </IconButton>
              <Menu
                open={Boolean(this.state.anchorEl)}
                anchorEl={this.state.anchorEl}
                onClose={this.handleCloseOptions}
                PaperProps={{
                  style: {
                    width: 200,
                  },
                }}
              >
                <MenuItem onClick={() => {
                  this.handleCloseOptions();
                  onEdit();
                }}
                >
                  Edit
            </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.handleCloseOptions();
                    onDelete();
                  }}
                  style={{ color: 'red' }}
                >
                  Delete
            </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </TableCell>
      </TableRow>
    );
  }
}

interface IProps {
  data: IInvoice[];
  deleting: IInvoice;
  editing: IInvoice;
  onEdit: (invoice: IInvoice) => void;
  onDelete: (invoice: IInvoice) => void;
}

class TableResult extends React.Component<IProps> {
  getTotal = () => {
    const { data } = this.props;

    const total = data.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.amount;
    }, 0);

    return total;
  }

  render() {
    const { data, onEdit, onDelete, deleting, editing } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(invoice => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              onDelete={() => onDelete(invoice)}
              onEdit={() => onEdit(invoice)}
              deleting={Boolean(deleting) && deleting.id === invoice.id}
              editing={Boolean(editing) && editing.id === invoice.id}
            />
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell><Typography variant="subtitle2">Total</Typography></TableCell>
            <TableCell align="right"><Typography variant="subtitle2">$ {this.getTotal().toFixed(2)}</Typography></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

export default TableResult;
