import uuid from 'uuid/v4';
import { IInvoice } from 'interfaces';

const data: IInvoice[] = [];
const numberOfInvoices = 8;

for (let i = 0; i < numberOfInvoices; i++) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  data.push({
    id: uuid(),
    customerName: `Customer ${i + 1}`,
    date: date,
    amount: Math.floor(Math.random() * 1000) + 100,
  });
}

export default data;
