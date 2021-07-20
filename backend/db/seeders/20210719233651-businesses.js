'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Businesses', [
      { ownerId: 1, title: 'DoorBucks', description: 'Door-to-door coffee', lat: 32.861, lng: 32.871, address: '1111 Coffee Street', city: 'Bean', state: 'North Carolina', zipCode: '27606', createdAt: new Date(), updatedAt: new Date() },
      { ownerId: 1, title: 'Club Coffee', description: 'Exclusive nightlife coffee', lat: 21.991, lng: 66.441, address: '2222 Coffee Street', city: 'Bean', state: 'North Carolina', zipCode: '27254', createdAt: new Date(), updatedAt: new Date() },
      { ownerId: 2, title: 'Coffee Express', description: 'Choo-choo', lat: 12.541, lng: 42.411, address: '3333 Coffee Street', city: 'Bean', state: 'North Carolina', zipCode: '26455', createdAt: new Date(), updatedAt: new Date() },
      { ownerId: 2, title: 'Coffee Time', description: 'Would ya look at the time', lat: 21.121, lng: 65.451, address: '4444 Coffee Street', city: 'Bean', state: 'North Carolina', zipCode: '21456', createdAt: new Date(), updatedAt: new Date() },
      { ownerId: 2, title: 'Aroma Macha', description: 'Smells like dirt', lat: 38.211, lng: 61.221, address: '5555 Coffee Street', city: 'Bean', state: 'North Carolina', zipCode: '26875', createdAt: new Date(), updatedAt: new Date() },
      { ownerId: 3, title: 'Lava Java', description: 'Burn your tongue off too!', lat: 66.611, lng: 88.211, address: '6666 Coffee Street', city: 'Bean', state: 'North Carolina', zipCode: '12456', createdAt: new Date(), updatedAt: new Date() },
      { ownerId: 3, title: 'The Grind', description: "It's the griiiiiiiiiiiiiiiiiiiiiiiiind", lat: 33.551, lng: 11.121, address: '7777 Coffee Street', city: 'Bean', state: 'North Carolina', zipCode: '32156', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Businesses', {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
