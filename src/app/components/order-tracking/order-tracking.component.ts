import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // Make sure you have this service
import { Order } from '../model/order.model';
import { WebSocketService } from '../../services/wesocket.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService, private websocketService: WebSocketService) {

  }

  ngOnInit(): void {

    // Retrieve the user details from sessionStorage
    const userDetails = JSON.parse(window.sessionStorage.getItem("userdetails"));
    // Extract the email
    const email = userDetails ? userDetails.email : null
    this.websocketService.fetchInitialOrders(email);
    this.websocketService.connect(email);
    this.websocketService.orders$.subscribe((orders) => {
      // this.orders = orders;
      this.orders = orders
      .filter(order => order.orderStatus !== 'DELIVERED') // Filter out orders with 'DELIVERED' status
      .sort((a, b) => b.id - a.id); // Sort by 'id' in descending order
    })
  }

  ngOnDestroy() {
    this.websocketService.disconnect();
  }




}
