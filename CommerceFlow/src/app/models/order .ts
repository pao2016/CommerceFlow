export class Order {
    constructor(
        public id: any = null, // ID opcional, inicializado como `null`
        public customerName: string = "", // Nombre del cliente
        public items: {
            productId: number;
            productName: string;
            quantity: number;
            price: number;
        }[] = [], // Lista de productos en la orden
        public totalAmount: number = 0, // Monto total de la orden
        public status: string = "Pending", // Estado de la orden (por defecto: "Pending")
        public createdAt: string = new Date().toISOString() // Fecha de creación por defecto
    ) { }
}
