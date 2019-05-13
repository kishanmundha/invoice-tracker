import React from 'react';
import { CircularProgress, IconButton, Icon } from '@material-ui/core';
import moment from 'moment';
import Header from './Header';
import TableResult from './TableResult';
import { IInvoice } from 'interfaces';
import { InvoiceService } from 'services';
import CreateInvoiceModal from './CreateInvoiceModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditInvoiceModal from './EditInvoiceModal';
import DateSearchInput from './DateSearchInput';

interface IState {
  loading: boolean;
  data: IInvoice[];
  selectedInvoice: IInvoice;
  openNewInvoice: boolean;
  openDeleteConfirmation: boolean;
  openEdit: boolean;
  deleting: boolean;
  editing: boolean;
  filterDate: string;
}

class InvoiceList extends React.Component<any, IState> {
  state: IState = {
    loading: true,
    data: [],
    openNewInvoice: false,
    selectedInvoice: null,
    openDeleteConfirmation: false,
    openEdit: false,
    deleting: false,
    editing: false,
    filterDate: '',
  };

  async componentDidMount() {
    const data = await InvoiceService.getList();

    this.setState({
      loading: false,
      data,
    })
  }

  handleOpenDelete = async (invoice: IInvoice) => {
    this.setState({
      selectedInvoice: invoice,
      openDeleteConfirmation: true,
    })
  }

  handleCloseDelete = () => {
    this.setState({
      selectedInvoice: null,
      openDeleteConfirmation: false,
    })
  }

  handleOpenEdit = async (invoice: IInvoice) => {
    this.setState({
      selectedInvoice: invoice,
      openEdit: true,
    })
  }

  handleCloseEdit = async () => {
    this.setState({
      selectedInvoice: null,
      openEdit: false,
    })
  }

  handleDeleteConfirm = async () => {
    this.setState({
      openDeleteConfirmation: false,
      deleting: true,
    });

    await InvoiceService.delete(this.state.selectedInvoice.id);
    const data = await InvoiceService.getList();

    this.setState({
      data,
      deleting: false,
    });
  }

  handleEditInvoice = async (invoice: IInvoice) => {
    this.setState({
      openEdit: false,
      editing: true,
    });

    await InvoiceService.edit(invoice);
    const data = await InvoiceService.getList();

    this.setState({
      data,
      editing: false,
    });
  }

  handleOpenNewInvoice = () => {
    this.setState({
      openNewInvoice: true,
    })
  }

  handleCloseNewInvoice = () => {
    this.setState({
      openNewInvoice: false,
    })
  }

  handleCreateInvoice = async (invoice: IInvoice) => {
    await InvoiceService.create(invoice);

    this.setState({
      openNewInvoice: false,
    });

    const data = await InvoiceService.getList();

    this.setState({
      data,
    })
  }

  renderLoading() {
    return (
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    )
  }

  renderData() {
    const { data, filterDate } = this.state;
    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <TableResult
          data={filterDate ? data.filter(x => moment(x.date).format('YYYY-MM-DD') === moment(filterDate).format('YYYY-MM-DD')) : data}
          onDelete={this.handleOpenDelete}
          onEdit={this.handleOpenEdit}
          deleting={this.state.deleting ? this.state.selectedInvoice : null}
          editing={this.state.editing ? this.state.selectedInvoice : null}
        />
      </div>
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header
          title="Invoices"
          rightComponent={(
            <React.Fragment>
              <DateSearchInput
                value={this.state.filterDate}
                onChange={(event) => this.setState({ filterDate: event.target.value })}
              />
              <IconButton color="inherit" onClick={this.handleOpenNewInvoice}>
                <Icon>add</Icon>
              </IconButton>
            </React.Fragment>
          )}
        />
        {loading && this.renderLoading()}
        {!loading && this.renderData()}
        <CreateInvoiceModal
          open={this.state.openNewInvoice}
          onCancel={this.handleCloseNewInvoice}
          onCreate={this.handleCreateInvoice}
        />
        <DeleteConfirmModal
          open={this.state.openDeleteConfirmation}
          onCancel={this.handleCloseDelete}
          onDelete={this.handleDeleteConfirm}
        />
        <EditInvoiceModal
          open={this.state.openEdit}
          invoice={this.state.selectedInvoice}
          onCancel={this.handleCloseEdit}
          onEdit={this.handleEditInvoice}
        />
      </div>
    )
  }
}

export default InvoiceList;
