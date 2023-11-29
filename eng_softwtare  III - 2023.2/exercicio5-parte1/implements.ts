class Order{
    id:number;
    constructor(id:number) {
        this.id = id;
    }
}

class MySQLDatabase{
    insert(order: Order){
        //insert
    }
    update(order:Order){
        //update
    }
}

class OrderService{
    database:MySQLDatabase;
    
    save(order:Order):void{
        if (order.id === undefined) {
            this.database.insert(order);
        } else {
            this.database.update(order);
        }
    }
}