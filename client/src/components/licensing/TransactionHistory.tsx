import React, { useState } from 'react';
import { License } from '../../../shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FiArrowDown, FiArrowUp, FiChevronDown, FiClock, FiCreditCard, FiDollarSign, FiDownload, FiPlus } from 'react-icons/fi';

interface TransactionHistoryProps {
  license: License;
}

interface Transaction {
  date: string;
  amount: number;
  type: 'charge' | 'refund' | 'credit';
  description: string;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
}

export default function TransactionHistory({ license }: TransactionHistoryProps) {
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  
  // Transactions from license data
  const transactions = license.transactionHistory;
  
  // Generate demo invoices based on transactions
  const demoInvoices: Invoice[] = React.useMemo(() => {
    return transactions.map((transaction, index) => {
      const invoiceStatus = index % 5 === 0 ? 'pending' : index % 10 === 0 ? 'overdue' : 'paid';
      const invoiceDate = new Date(transaction.date);
      
      // Generate invoice items based on description
      const items = [];
      
      if (transaction.description.includes('Subscription')) {
        items.push({
          description: `${license.licenseType.charAt(0).toUpperCase() + license.licenseType.slice(1)} Plan Subscription`,
          quantity: 1,
          unitPrice: transaction.amount * 0.8,
          amount: transaction.amount * 0.8
        });
        
        items.push({
          description: 'User Access Fees',
          quantity: license.currentUsers,
          unitPrice: (transaction.amount * 0.2) / license.currentUsers,
          amount: transaction.amount * 0.2
        });
      } else if (transaction.description.includes('API')) {
        items.push({
          description: 'API Usage Fees',
          quantity: 1,
          unitPrice: transaction.amount,
          amount: transaction.amount
        });
      } else {
        items.push({
          description: transaction.description,
          quantity: 1,
          unitPrice: transaction.amount,
          amount: transaction.amount
        });
      }
      
      return {
        id: `INV-${10000 + index}`,
        date: invoiceDate.toISOString(),
        amount: transaction.amount,
        status: invoiceStatus as 'paid' | 'pending' | 'overdue',
        items
      };
    });
  }, [license, transactions]);
  
  // Filter transactions based on period
  const getFilteredTransactions = () => {
    if (filterPeriod === 'all') return transactions;
    
    const now = new Date();
    let startDate = new Date();
    
    if (filterPeriod === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (filterPeriod === 'quarter') {
      startDate.setMonth(now.getMonth() - 3);
    } else if (filterPeriod === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate;
    });
  };
  
  const filteredTransactions = getFilteredTransactions();
  
  // Calculate summary metrics
  const summaryMetrics = React.useMemo(() => {
    const total = filteredTransactions.reduce((sum, transaction) => {
      if (transaction.type === 'charge') {
        return sum + transaction.amount;
      } else if (transaction.type === 'refund' || transaction.type === 'credit') {
        return sum - transaction.amount;
      }
      return sum;
    }, 0);
    
    const charges = filteredTransactions.filter(transaction => transaction.type === 'charge')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    const refunds = filteredTransactions.filter(transaction => transaction.type === 'refund' || transaction.type === 'credit')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    return { total, charges, refunds };
  }, [filteredTransactions]);
  
  // Data for pie chart
  const pieChartData = React.useMemo(() => {
    // Count transactions by type
    const counts = {
      subscription: 0,
      api: 0,
      storage: 0,
      other: 0
    };
    
    filteredTransactions.forEach(t => {
      if (t.description.toLowerCase().includes('subscription')) {
        counts.subscription += t.amount;
      } else if (t.description.toLowerCase().includes('api')) {
        counts.api += t.amount;
      } else if (t.description.toLowerCase().includes('storage')) {
        counts.storage += t.amount;
      } else {
        counts.other += t.amount;
      }
    });
    
    return [
      { name: 'Subscription', value: counts.subscription },
      { name: 'API Usage', value: counts.api },
      { name: 'Storage', value: counts.storage },
      { name: 'Other', value: counts.other }
    ].filter(item => item.value > 0);
  }, [filteredTransactions]);
  
  // Data for bar chart - monthly spending
  const barChartData = React.useMemo(() => {
    // Group transactions by month
    const monthlyData: {[key: string]: number} = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    filteredTransactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      
      if (transaction.type === 'charge') {
        monthlyData[monthYear] += transaction.amount;
      } else {
        monthlyData[monthYear] -= transaction.amount;
      }
    });
    
    // Convert to array and sort by date
    return Object.entries(monthlyData).map(([date, amount]) => ({
      date,
      amount
    })).sort((a, b) => {
      const [monthA, yearA] = a.date.split(' ');
      const [monthB, yearB] = b.date.split(' ');
      
      if (yearA !== yearB) {
        return parseInt(yearA) - parseInt(yearB);
      }
      
      return monthNames.indexOf(monthA) - monthNames.indexOf(monthB);
    });
  }, [filteredTransactions]);
  
  // Colors for pie chart
  const COLORS = ['#0047AB', '#8B5CF6', '#10B981', '#F59E0B'];
  
  const viewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDialogOpen(true);
  };
  
  const renderTransactionRow = (transaction: Transaction, index: number) => {
    const transactionDate = new Date(transaction.date).toLocaleDateString();
    const invoice = demoInvoices[index];
    
    return (
      <TableRow key={index}>
        <TableCell className="font-medium">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              transaction.type === 'charge' 
                ? 'bg-red-100 text-red-600' 
                : 'bg-green-100 text-green-600'
            }`}>
              {transaction.type === 'charge' 
                ? <FiArrowUp size={14} /> 
                : <FiArrowDown size={14} />
              }
            </div>
            <div>
              <div>{transaction.description}</div>
              <div className="text-xs text-gray-500">{transactionDate}</div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <Badge 
            variant="outline" 
            className={`
              ${invoice.status === 'paid' ? 'bg-green-50 text-green-700 border-green-100' : ''}
              ${invoice.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : ''}
              ${invoice.status === 'overdue' ? 'bg-red-50 text-red-700 border-red-100' : ''}
            `}
          >
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <div className={transaction.type === 'charge' ? 'text-red-600' : 'text-green-600'}>
            {transaction.type === 'charge' ? '-' : '+'}${transaction.amount.toFixed(2)}
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm" onClick={() => viewInvoice(invoice)}>
            View
          </Button>
        </TableCell>
      </TableRow>
    );
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Transaction History</CardTitle>
            <CardDescription>View and manage your billing history</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center">
              <FiDownload className="mr-1" size={14} />
              Export
            </Button>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-blue-50 p-2 rounded-full">
                <FiDollarSign className="text-blue-500" size={16} />
              </div>
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                Total
              </Badge>
            </div>
            <div className="text-2xl font-semibold mt-1">${summaryMetrics.total.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Net amount for selected period</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-red-50 p-2 rounded-full">
                <FiArrowUp className="text-red-500" size={16} />
              </div>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100">
                Charges
              </Badge>
            </div>
            <div className="text-2xl font-semibold mt-1">${summaryMetrics.charges.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Total charges for selected period</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-green-50 p-2 rounded-full">
                <FiArrowDown className="text-green-500" size={16} />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                Refunds/Credits
              </Badge>
            </div>
            <div className="text-2xl font-semibold mt-1">${summaryMetrics.refunds.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Total refunds for selected period</div>
          </div>
        </div>
        
        <Tabs defaultValue="transactions" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Transaction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(renderTransactionRow)
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <div className="text-gray-500">No transactions found for the selected period.</div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium mb-2">Spending by Category</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium mb-2">Monthly Spending</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => value.split(' ')[0]}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                      <Bar dataKey="amount" fill="#0047AB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Invoice Dialog */}
      <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              Invoice #{selectedInvoice?.id} - {selectedInvoice && new Date(selectedInvoice.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="space-y-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-lg">Garment3D - Empire OS</h4>
                  <div className="text-sm text-gray-500">1234 Innovation Way</div>
                  <div className="text-sm text-gray-500">San Francisco, CA 94107</div>
                </div>
                <div className="text-right">
                  <h4 className="font-medium">Bill To:</h4>
                  <div className="text-sm">{license.organizationName}</div>
                  {license.contactName && <div className="text-sm">{license.contactName}</div>}
                  {license.contactEmail && <div className="text-sm">{license.contactEmail}</div>}
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md">
                <div>
                  <span className="text-sm font-medium">Invoice Status:</span>
                  <Badge 
                    variant="outline" 
                    className={`ml-2 ${
                      selectedInvoice.status === 'paid' ? 'bg-green-50 text-green-700 border-green-100' : 
                      selectedInvoice.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-red-50 text-red-700 border-red-100'
                    }`}
                  >
                    {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <FiClock className="text-gray-400 mr-1" size={14} />
                  <span className="text-sm text-gray-500">
                    {selectedInvoice.status === 'paid' ? 'Paid on ' : 'Due on '}
                    {new Date(selectedInvoice.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Description</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                      <TableCell className="text-right font-medium">${selectedInvoice.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              {selectedInvoice.status === 'pending' || selectedInvoice.status === 'overdue' ? (
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Download PDF</Button>
                  <Button className="flex items-center">
                    <FiCreditCard className="mr-2" size={14} />
                    Pay Now
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button variant="outline">Download PDF</Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}