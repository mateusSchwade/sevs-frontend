import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private firebaseRDatabase: AngularFireDatabase
  ) { }

  getListAll() {
    return this.firebaseRDatabase.list('/pedidos/')
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getListByCodusu(codusu) {
    return this.firebaseRDatabase.list('/pedidos/', duv => duv.orderByChild('codusu').equalTo(codusu))
      .snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.key, ...c.payload.val() }));
      }));
  }

  getListPedidosByStatus(status) {
    return this.firebaseRDatabase.list('/pedidos/', duv => duv.orderByChild('status').equalTo(status)).
      snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.key, ...c.payload.val() }));
      }));
  }
  getListPedidos() {
    return this.firebaseRDatabase.list('/pedidos/').
      snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.key, ...c.payload.val() }));
      }));
  }

  postPedido(pedido) {
    return this.firebaseRDatabase.list('/pedidos/').push(pedido);
  }

  putStatusPedido(pedido) {
    return this.firebaseRDatabase.list('/pedidos/').update(pedido.key, pedido);
  }

  removePedido(key) {
    return this.firebaseRDatabase.list('/pedidos/').remove(key);
  }

}
