// scripts/perf-test.mjs
// วัด latency ของ pages และ API routes

const BASE = "http://localhost:3000";

const ROUTES = [
    { name: "Homepage", url: "/" },
    { name: "Car List", url: "/car" },
    { name: "Car Detail (id=1)", url: "/car/1" },
    { name: "API: brands", url: "/api/brand" },
    { name: "API: trending", url: "/api/trending" },
    { name: "API: cars", url: "/api/car" },
];

const RUNS = 5; // วัดแต่ละ route กี่ครั้ง

async function measure(url) {
    const start = performance.now();
    const res = await fetch(url);
    const end = performance.now();
    const body = await res.text();
    return {
        status: res.status,
        latency: Math.round((end - start) * 100) / 100,
        bodySize: (body.length / 1024).toFixed(1) + " KB",
    };
}

async function run() {
    console.log("=".repeat(70));
    console.log("Performance Test — " + new Date().toISOString());
    console.log("=".repeat(70));
    console.log(`Base URL: ${BASE}`);
    console.log(`Runs per route: ${RUNS}`);
    console.log("");

    // Warm-up: hit each route once first
    console.log("Warming up...");
    for (const route of ROUTES) {
        try {
            await fetch(BASE + route.url);
        } catch (e) {
            console.log(`  ⚠ ${route.name}: ${e.message}`);
        }
    }
    console.log("Warm-up complete.\n");

    const results = [];

    for (const route of ROUTES) {
        const latencies = [];
        let status = 0;
        let bodySize = "";

        for (let i = 0; i < RUNS; i++) {
            try {
                const r = await measure(BASE + route.url);
                latencies.push(r.latency);
                status = r.status;
                bodySize = r.bodySize;
            } catch (e) {
                latencies.push(-1);
            }
        }

        const valid = latencies.filter((l) => l >= 0);
        const avg = valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : -1;
        const min = valid.length > 0 ? Math.min(...valid) : -1;
        const max = valid.length > 0 ? Math.max(...valid) : -1;
        const p50 = valid.length > 0 ? valid.sort((a, b) => a - b)[Math.floor(valid.length / 2)] : -1;

        results.push({
            name: route.name,
            status,
            bodySize,
            avg: Math.round(avg * 100) / 100,
            min: Math.round(min * 100) / 100,
            max: Math.round(max * 100) / 100,
            p50: Math.round(p50 * 100) / 100,
            runs: valid.length,
        });
    }

    // Print table
    console.log(
        "Route".padEnd(25) +
        "Status".padEnd(8) +
        "Avg(ms)".padEnd(10) +
        "Min(ms)".padEnd(10) +
        "P50(ms)".padEnd(10) +
        "Max(ms)".padEnd(10) +
        "Size".padEnd(10)
    );
    console.log("-".repeat(83));

    for (const r of results) {
        console.log(
            r.name.padEnd(25) +
            String(r.status).padEnd(8) +
            String(r.avg).padEnd(10) +
            String(r.min).padEnd(10) +
            String(r.p50).padEnd(10) +
            String(r.max).padEnd(10) +
            r.bodySize.padEnd(10)
        );
    }

    console.log("\n" + "=".repeat(70));
}

run().catch(console.error);
