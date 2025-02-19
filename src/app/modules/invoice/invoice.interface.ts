export interface LineItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface Customer {
    name: string;
    email: string;
    address: string;
    phone?: string;
}

export interface Invoice {
    id: string;
    date: string;
    dueDate: string;
    customer: Customer;
    items: LineItem[];
    subtotal: number;
    tax: number;
    total: number;
    notes?: string;
}