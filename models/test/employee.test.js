const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe ('Employee', () => {
    it('should throw an error if no  arg', () => {
        const emp = new Employee ({});
        emp.validate(err => {
            expect(err.errors.department).to.exist;
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
        });
        after(() => {
            mongoose.models = {};
          });
    });
    
    it ('it should throw an err if firstName, lastName and department are not strings ', () => {
        const cases = [ {}, [] ];
        for (let firstName of cases) {
        const emp = new Employee({firstName});
        emp.validate(err => {
            expect(err.errors.firstName).to.exist; 
        });
        };
        for (let lastName of cases) {
        const emp = new Employee({lastName});
        emp.validate(err => {
            expect(err.errors.lastName).to.exist; 
        });
        };
        for (let department of cases) {
        const emp = new Employee({department});
        emp.validate(err => {
            expect(err.errors.department).to.exist; 
        });
        }
        after(() => {
            mongoose.models = {};
          });
    });

    it ('should not throw an error if everything is ok', () => {
       const firstName = 'Ewa';
       const lastName = 'Witkowska';
       const department = 'Marketing';
            const emp = new Employee({firstName, lastName, department});
            emp.validate(err => {
                expect(err).to.not.exist;
            });
    });

});

