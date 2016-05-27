import { Driver }            from '../driver';

export var MOCK_DRIVERS: Driver[] = [
  { selected: false, drivername: 'driver0', password: 'zzzz', ability: 'Scooter', firstname: 'Driver',
    lastname: 'Zero', email: 'driverZero@email.com', address: '77 Sunset Strip', city: 'Los Angeles',
    state: 'CA', zip: '99999', phone: '1.310.555.1212' },
  { selected: false, drivername: 'driver1', password: 'zzzzz', ability: 'Automatic', firstname: 'Xriver',
    lastname: 'One', email: 'driverOne@email.com', address: '123 Main St', city: 'San Diego',
    state: 'CA', zip: '98888', phone: '1.619.555.1212' }];
