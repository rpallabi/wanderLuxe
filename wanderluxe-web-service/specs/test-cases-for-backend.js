const request = require("request");
const baseUrlPackage = "http://localhost:4000/package";
const baseUrlUser = "http://localhost:4000/user";
const baseUrlBook = "http://localhost:4000/book";

describe("TestCase Set 1: Set Db", () => {
    it("TestCase 1: Returns status code 200", (done) => {
        request.get(baseUrlUser + "/setup", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    it("TestCase 2: Returns Inserted Successfully", (done) => {
        request.get(baseUrlUser + "/setup", (error, response, body) => {
            expect(body).toBe("Insertion Successfull");
            done();
        });
    });
});

describe("TestCase Set 2: Get Hotdeals", () => {
    it("TestCase 1: Valid Response", (done) => {
        request.get(baseUrlPackage + "/hotdeals", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(body).toBeTruthy();
            done();
        });
    });
});

describe("TestCase Set 3: Get Search Bar Destination", () => {
    it("TestCase 1: Valid City Response", (done) => {
        request.get(baseUrlPackage + "/destinations/Paris", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(body).toBeTruthy();
            done();
        });
    });
    it("TestCase 2: Valid Continent Response", (done) => {
        request.get(baseUrlPackage + "/destinations/ASIA", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(body).toBeTruthy();
            done();
        });
    });
})