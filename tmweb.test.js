const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultTimeout(50000);
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Tests for Cinema", () => {

    test("Should reserve ticket and get a code", async () => {
        const expectedPayment = "Вы выбрали билеты:";
        const expectedTicket = "Электронный билет";
        await clickElement(page, "a:nth-child(2)");
        await clickElement (page, ".movie-seances__time[href='#'][data-seance-id='199']");
        await clickElement (page, "div[class='buying-scheme__wrapper'] div:nth-child(3) span:nth-child(5)");
        await clickElement (page, ".acceptin-button");
        const actualPayment = await getText(page, "h2.ticket__check-title");
        expect(actualPayment).toContain(expectedPayment);
        await clickElement (page, ".acceptin-button");
        const actualTicket = await getText(page, "h2.ticket__check-title");
        expect(actualTicket).toContain(expectedTicket);
    });

    test("Should reserve 2 ticket and get a code", async () => {
        const expectedPayment = "Вы выбрали билеты:";
        const expectedTicket = "Электронный билет";
        await clickElement(page, "a:nth-child(2)");
        await clickElement (page, ".movie-seances__time[href='#'][data-seance-id='190']");
        await clickElement (page, "div:nth-child(2) span:nth-child(5)");
        await clickElement (page, "div:nth-child(2) span:nth-child(6)");
        await clickElement (page, ".acceptin-button");
        const actualPayment = await getText(page, "h2.ticket__check-title");
        expect(actualPayment).toContain(expectedPayment);
        await clickElement (page, ".acceptin-button");
        const actualTicket = await getText(page, "h2.ticket__check-title");
        expect(actualTicket).toContain(expectedTicket);
    });

    test("Selecting a occupied seat", async () =>{
        await page.setDefaultTimeout(120000);
        await clickElement(page, "a:nth-child(2)");
        await clickElement (page, ".movie-seances__time[href='#'][data-seance-id='199']");
        await clickElement (page, "div[class='buying-scheme__wrapper'] div:nth-child(3) span:nth-child(5)");
        expect(            
            String(                
                await page.$eval("button", (button) => {
                    return button.disabled;
                })
            )
        ).toContain("true");                  
    });
});