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

    describe('Reading data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'});
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'Karen', lastName: 'O', department: 'Music'});
            await testEmpTwo.save();
        });

        afterEach(async () => {	
          await Employee.deleteMany();	
        });

    it ('should return all the data with "find" method', async () => {
        const employees = await Employee.find();
        expect(employees).to.not.be.null;
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const empByFirstName = await Employee.findOne({ firstName: 'Matt' });	
      const empByLastName = await Employee.findOne({ lastName: 'Damon' });	
      const empByDep = await Employee.findOne({ department: 'Acting' });	
      expect(empByFirstName.firstName).to.be.equal('Matt');	
      expect(empByLastName.lastName).to.be.equal('Damon');	
      expect(empByDep.department).to.be.equal('Acting');
    });

    });

    describe('Creating data', () => {
        it('should insert new document with "insertOne" method', async () => {
            const newEmployee =  new Employee({firstName: 'Dwayne', lastName: 'Johnson', department: 'Acting'});
            await newEmployee.save();
            expect(newEmployee.isNew).to.be.false;
        });

        after(async () => {
          await Employee.deleteMany();
        }); 
        
    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'});
            await testEmpOne.save();
          
            const testEmpTwo = new Employee({ firstName: 'Karen', lastName: 'O', department: 'Music'});
            await testEmpTwo.save();
          });  
          
          afterEach(async () => {
            await Employee.deleteMany();
          }); 

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'}, {$set: { firstName: 'Matt', lastName: 'Damon', department: 'Music'}});

            const updatedEmployee = await Employee.findOne({firstName: 'Matt', lastName: 'Damon', department: 'Music'});
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'});
            employee.department = 'Music';
            await employee.save();
            
            const updatedDepartment = await Employee.findOne({firstName: 'Matt', lastName: 'Damon', department: 'Music'});
            expect(updatedDepartment).to.not.be.null;
        });
        
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, {$set: { department: 'Updated!'}});
            const updatedEmployees = await Employee.find();

            expect(updatedEmployees[0].department).to.be.equal('Updated!');
            expect(updatedEmployees[1].department).to.be.equal('Updated!');
        });
    });

    describe('Removing data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'});
            await testEmpOne.save();
          
            const testEmpTwo = new Employee({ firstName: 'Karen', lastName: 'O', department: 'Music'});
            await testEmpTwo.save();
          });  
          
          afterEach(async () => {
            await Employee.deleteMany();
          }); 

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'});
            const deletedEmployee = await Employee.findOne({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'});
            expect(deletedEmployee).to.be.null;
        });

        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'});
            employee.remove();
            const removedEmployee = await Employee.findOne({ firstName: 'Matt', lastName: 'Damon', department: 'Acting'});
            expect(removedEmployee).to.be.null;
        });

        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();

            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });
    });
});