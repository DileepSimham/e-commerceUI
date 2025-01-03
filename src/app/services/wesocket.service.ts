import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {Stomp} from '@stomp/stompjs'
import SockJs from 'sockjs-client';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  private stompClient: any

  private ordersSubject=new BehaviorSubject<any[]>([]);

  orders$=this.ordersSubject.asObservable();


  constructor(private http:HttpClient){

  }


  fetchInitialOrders(username:string){
    this.http.get<any[]>(`http://localhost:8081/api/orders/by-email?userEmail=${username}`).subscribe((orders)=>{
      this.ordersSubject.next(orders);
    })
  }


  connect(username:string){
    const socket=new SockJs('//localhost:8081/socket');

    this.stompClient=Stomp.over(socket)

    this.stompClient.connect({},()=>{
      console.log('Websocket connected!')

      this.stompClient?.subscribe(`/topic/orders/${username}`,(message)=>{
        const updatedOrders=JSON.parse(message.body);

        this.updatedOrders(updatedOrders)
      })
    })
  }


  private updatedOrders(updatedOrders: any){

    const currentOrders=this.ordersSubject.value;

    const orderIndex=currentOrders.findIndex(o=>o.id===updatedOrders.id);

    if(orderIndex>-1){
      currentOrders[orderIndex]=updatedOrders;
    }else{
      currentOrders.push(updatedOrders);
    }


    this.ordersSubject.next([...currentOrders]);

  }

  disconnect(){
    this.stompClient.disconnect(()=>{
      console.log("Disconnected")
    })
  }
 
}
