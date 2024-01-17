const request = require("supertest");
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../app');
const jwt = require('jsonwebtoken');
const db = require('../src/models/index');
const { dashboardTotalSales, dashboardSalesAccountManager, dashboardSalesPerSKU } = require("../src/services/dashboard.service");
const { mockSalesPerSKU } = require("./mockData/dashboardSalesPerSKU");
const transSOHDR = db.transSOHDR

describe('Dashboard Endpoint Unit-Testing', () => {

    before(() => {
        // Mock the behavior of jwt.verify to always return a valid user
        sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
            callback(null, { id: 'mockUserId' }); // Assuming the token is always valid for the mock user
        });
    });

    after(() => {
        // Restore the original authentication middleware after tests
        sinon.restore();
    });

    const fakeResult = [{
        so_no: 'PS-02368',
        account_mngr: 'Alisa Anne L. Demeterio',
        so_date: '2023-01-30T13:51:03.000Z',
        so_count: 1,
        n_sum_total: '144500.00'
    }]
    sinon.stub(transSOHDR, 'findAll').returns(fakeResult)

    it('should get the total sales', async () => {
        // const response = await request(app).get('/api/dashboard/getTotalSales').query({ day: 0 });
        const response = await dashboardTotalSales({ day: 0 })
        // expect(response.status).to.equal(200);
        expect(response).to.be.an('array');
    });

    it('should get the sales per account manager', async () => {
        const response = await dashboardSalesAccountManager({ day: 0 })
        expect(response).to.be.an('array');
    })

    // it('should get the sales per sku', async () => {
    //     sinon.stub(transSOHDR, 'findAll').resolves(mockSalesPerSKU)
    //     const response = await dashboardSalesPerSKU({ day: 0 })
    //     console.log(response);
    //     expect(response).to.be.an('array');
    // })

});

describe('--- Dashboard Endpoint Unit-Testing ---', () => {
    it('should get the sales per sku', async () => {
        const mockData = await mockSalesPerSKU()

        sinon.stub(transSOHDR, 'findAll').returns(mockData)
        const response = await dashboardSalesPerSKU({ day: 0 })

        // expect(response).to.be.an('array');
        expect(response).to.be.exist;
        expect(response).to.not.be.empty;
    })
});


// describe('getUserById', () => {
//     it('should return user data for a valid ID', async () => {
//         // const user = await request(app).get('/api/dashboard/getTotalSales').query({ day: 0 });


//         // Mock the database function to return a predefined user object
//         getTotalSales.mockResolvedValue({ id: 1, name: 'John Doe' });
//         // Make a request to the API endpoint
//         const response = await request(app).get('/api/dashboard/getTotalSales').query({ day: 0 });
//         console.log(response);


//         // expect(user).toEqual({ id: 1, name: 'John Doe' });
//     });

//     // it('should handle non-existent user gracefully', async () => {
//     //     const user = await getUserById(999);
//     //     expect(user).toBeNull();
//     // });
// });

// const mockRequest = () => {
//     return {
//         day: 0
//     };
// };

// const mockPayload = { id: 1, email: 'cardo@gmail.com' }
// const mockToken = jwt.sign(mockPayload, process.env.JWT_SECRET, {
//     expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
// })


/*
    TODO: Dashboard
        1. computeTotal

    TODO: CRM
        1.
*/

// Worrk in progress
// describe('Protected route with token', () => {

//     it('should return 403 if no cookie is provided', async () => {
//         const response = await request(app)
//             .get('/api/dashboard/getTotalSales');

//         expect(response.status).toBe(403);
//         expect(response.body).toEqual({ message: 'Session Expired' });
//     });

//     it('should return 401 if an invalid token is provided', async () => {
//         const response = await request(app)
//             .get('/api/dashboard/getTotalSales')
//             .set('Cookie', [`refreshToken=${mockToken}`])
//             .set('Authorization', `Bearer invalid-token`);

//         expect(response.status).toBe(401);
//         expect(response.body).toEqual({ message: 'Token Expired' });
//     });

//     // Valid test cases
//     it('should return 200 in getTotalSales', async () => {
//         const response = await request(app)
//             .get('/api/dashboard/getTotalSales')
//             .query(mockRequest)
//             .set('Authorization', `Bearer ${mockToken}`)
//             .set('Cookie', [`refreshToken=${mockToken}`])

//         expect(response.status).toBe(200);
//     });

//     it('should return 200 in getSalesAccountManager', async () => {
//         const response = await request(app)
//             .get('/api/dashboard/getSalesAccountManager')
//             .query(mockRequest)
//             .set('Authorization', `Bearer ${mockToken}`)
//             .set('Cookie', [`refreshToken=${mockToken}`])

//         expect(response.status).toBe(200);
//     });

//     it('should return 200 in getSalesPerSKU', async () => {
//         const response = await request(app)
//             .get('/api/dashboard/getSalesPerSKU')
//             .query(mockRequest)
//             .set('Authorization', `Bearer ${mockToken}`)
//             .set('Cookie', [`refreshToken=${mockToken}`])

//         expect(response.status).toBe(200);
//     });
// });