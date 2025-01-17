var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var chromium = require('playwright').chromium;
var userEmail = '9655159490';
var password = 'PanAm1736*#';
var baseUrl = 'https://www.amazon.in/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.in%2F%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0';
var ordersPage = "https://www.amazon.in/your-orders";
(function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, context, page, orders, firstTenOrders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, chromium.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 15, 16, 18]);
                return [4 /*yield*/, browser.newContext()];
            case 3:
                context = _a.sent();
                return [4 /*yield*/, context.newPage()];
            case 4:
                page = _a.sent();
                return [4 /*yield*/, page.goto(baseUrl)];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.fill('input[name="email"]', userEmail)];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.click('input#continue')];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.fill('input[name="password"]', password)];
            case 8:
                _a.sent();
                return [4 /*yield*/, page.click('input#signInSubmit')];
            case 9:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector('input[name="otpCode"]')];
            case 10:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector('input[name="otpCode"]', { state: 'detached' })];
            case 11:
                _a.sent();
                return [4 /*yield*/, page.goto(ordersPage)];
            case 12:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector('.a-fixed-left-grid.item-box', { timeout: 60000 })];
            case 13:
                _a.sent();
                return [4 /*yield*/, page.$$eval('.a-box-group.a-spacing-base', function (itemBoxes) {
                        return itemBoxes.map(function (itemBox) {
                            var titleElement = itemBox.querySelector('.yohtmlc-product-title');
                            var priceElement = itemBox.querySelector('div.a-column.a-span2 .a-row .a-size-base.a-color-secondary');
                            var linkElement = itemBox.querySelector('a.a-link-normal');
                            return {
                                title: titleElement ? titleElement.textContent.trim() : 'No Title',
                                price: priceElement ? priceElement.textContent.trim() : 'No Price',
                                link: linkElement ? linkElement.href : 'No Link',
                            };
                        });
                    })];
            case 14:
                orders = _a.sent();
                if (orders.length === 0) {
                    console.log('No items in the orders list.');
                }
                else {
                    firstTenOrders = orders.slice(0, 10);
                    console.log(firstTenOrders);
                }
                return [3 /*break*/, 18];
            case 15:
                error_1 = _a.sent();
                console.error('An error occurred:', error_1);
                return [3 /*break*/, 18];
            case 16: return [4 /*yield*/, browser.close()];
            case 17:
                _a.sent();
                return [7 /*endfinally*/];
            case 18: return [2 /*return*/];
        }
    });
}); })();
