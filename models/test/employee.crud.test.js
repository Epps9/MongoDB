const Employee = require('../employee.model')
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe ('Employee', () => {
    before(async () => {

        try {
          const fakeDB = new MongoMemoryServer();
      
          const uri = await fakeDB.getConnectionString();
      
          mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      
        } catch(err) {
          console.log(err);
        }
      
      });
      
    after(() => {
        mongoose.models = {};
      }); 

    describe('Reading data', () => {

        before(async () => {
            const testEmpOne = new Employee({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'});
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'Karen', lastName: 'O', department: 'Music'});
            await testEmpTwo.save();
        });

    it ('should return all the data with "find" method', async () => {
        const employees = await Employee.find();
        const expectedLength = 2;
        expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
        const employee = await Employee.findOne({firstName: 'Michael'});
        const expectedFirstName = 'Michael';
        expect(employee.firstName).to.be.equal(expectedFirstName);
    });

    });

});