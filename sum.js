const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  // Seeds 89 to 98
  for (let seed = 89; seed <= 98; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log("Visiting:", url);

    await page.goto(url);

    // Wait for tables to load (important for dynamic content)
    await page.waitForSelector("table");

    // Extract all numbers from tables
    const sum = await page.evaluate(() => {
      let total = 0;
      const cells = document.querySelectorAll("table td");
      cells.forEach(cell => {
        const num = parseFloat(cell.innerText);
        if (!isNaN(num)) {
          total += num;
        }
      });
      return total;
    });

    console.log(`Seed ${seed} sum =`, sum);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL =", grandTotal);

  await browser.close();
})();
