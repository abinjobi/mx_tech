const { chromium } = require('playwright');

const userEmail = '';
const password = '';
const baseUrl = 'https://www.amazon.in/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.in%2F%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0';
const ordersPage = "https://www.amazon.in/your-orders";

(async () => {
    const browser = await chromium.launch({ headless: false });

    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(baseUrl);

        await page.fill('input[name="email"]', userEmail);
        await page.click('input#continue');
        await page.fill('input[name="password"]', password);
        await page.click('input#signInSubmit');

        await page.waitForSelector('input[name="otpCode"]');
   
        await page.waitForSelector('input[name="otpCode"]', { state: 'detached' });

        await page.goto(ordersPage);
        
        await page.waitForSelector('.a-fixed-left-grid.item-box', { timeout: 60000 });

        const orders = await page.$$eval('.a-box-group.a-spacing-base', (itemBoxes) => {
            return itemBoxes.map((itemBox) => {
                const titleElement = itemBox.querySelector('.yohtmlc-product-title');
                const priceElement = itemBox.querySelector('div.a-column.a-span2 .a-row .a-size-base.a-color-secondary');
                const linkElement = itemBox.querySelector('a.a-link-normal');

                return {
                    title: titleElement ? titleElement.textContent.trim() : 'No Title',
                    price: priceElement ? priceElement.textContent.trim() : 'No Price',
                    link: linkElement ? linkElement.href : 'No Link',
                };
            });
        });

        if (orders.length === 0) {
            console.log('No items in the orders list.');
        } else {
            const firstTenOrders = orders.slice(0, 10);
            console.log(firstTenOrders);
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await browser.close();
    }
})();