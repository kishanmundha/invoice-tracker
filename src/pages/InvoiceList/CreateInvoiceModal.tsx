import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { IInvoice } from 'interfaces';

interface IProps {
  open: boolean;
  onCreate: (invoice: IInvoice) => void;
  onCancel: () => void;
}

interface IState {
  customerName: string;
  date: string;
  amount: string;
}

class CreateInvoiceModal extends React.Component<IProps, IState> {
  static defaultProps = {
    onCreate: () => null,
  }
  state: IState = {
    customerName: '',
    date: '',
    amount: '',
  };

  componentDidUpdate(prevProps: IProps) {
    if (Boolean(prevProps.open) !== Boolean(this.props.open)) {
      if (this.props.open) {
        this.setState({
          customerName: '',
          date: '',
          amount: '',
        })
      }
    }
  }

  handleCreate = () => {
    const { customerName, date, amount } = this.state;
    this.props.onCreate({
      customerName,
      date: new Date(date),
      amount: Number(amount),
    });
  }

  handleChangeField = (fieldName: string) => (event: any) => {
    this.setState({
      [fieldName]: event.target.value,
    } as any);
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onCancel}>
        <DialogTitle>Create Invoice</DialogTitle>
        <DialogContent style={{ minWidth: 600 }}>
          <div>
            <TextField
              margin="normal"
              fullWidth
              label="Customer name"
              value={this.state.customerName}
              onChange={this.handleChangeField('customerName')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              margin="normal"
              fullWidth
              type="date"
              label="Date"
              value={this.state.date}
              onChange={this.handleChangeField('date')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div>
            </div>
            <TextField
              margin="normal"
              fullWidth
              type="number"
              label="Amount"
              value={this.state.amount}
              onChange={this.handleChangeField('amount')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.onCancel}>
            Cancel
          </Button>
          <div style={{ flex: 1 }} />
          <Button color="secondary" variant="outlined" onClick={this.handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreateInvoiceModal;
