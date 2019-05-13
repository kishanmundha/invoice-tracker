import uuid from 'uuid/v4';
import { IInvoice } from 'interfaces';

import data from './invoice-data';

const delay = (ms: number) => {
  return new Promise(resovle => setTimeout(() => resovle(), ms));
};

class InvoiceService {
  async getList() {
    await delay(1000);
    return data;
  }
  async create(invoice: IInvoice) {
    data.push({
      id: uuid(),
      ...invoice,
    })
  }

  async edit(invoice: IInvoice) {
    await delay(1000);
    const index = data.findIndex(x => x.id === invoice.id);

    if (index === -1) {
      throw new Error('Invoice not found');
    }

    data[index] = invoice;
  }

  async delete(id: string) {
    await delay(1000);
    const index = data.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error('Invoice not found');
    }

    data.splice(index, 1);
  }

  async deleteMultiple(ids: string[]) {
    for (let id of ids) {
      const index = data.findIndex(x => x.id === id);

      if (index === -1) {
        continue;
      }

      data.splice(index, 1);
    }
  }
}

export default new InvoiceService();
