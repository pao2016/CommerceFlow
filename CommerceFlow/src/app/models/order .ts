export class Order {
    constructor(
        public id: any = null,
        public customerName: string = '',
        public items: { productId: number; productName: string; quantity: number; price: number }[] = [],
        public totalAmount: number = 0,
        public status: string = 'Pending',
        public createdAt: string = new Date().toISOString()
    ) { }
}
