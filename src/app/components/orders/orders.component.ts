import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: any[] = [];
  username = 'simhamdileepkumar@gmail.com'; // Replace with dynamic value if needed
  isLoading = true;
  hasError = false;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }
  fetchOrders(): void {
    this.ordersService.getOrdersByUsername().subscribe({
      next: (data) => {
        this.orders = data.sort((a, b) => b.id - a.id); // Sort by 'id' in descending order
        console.log(this.orders);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }
  

}
