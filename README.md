# LoomLine — Textile ERP

A working textile manufacturing ERP built as a static site: plain HTML, CSS and
JavaScript. Upload the folder to a web root and it runs. Nothing to install,
compile or configure.

Built by Tri Stone Industries Pvt Ltd, Trichy.

---

## Opening it

**On a server** — copy the folder to the web root, open `index.html`.
**On a laptop** — double-click `index.html`. No server needed.

Every demo user's passcode is **1234**. Pick a different user on the sign-in
screen to see the ERP through a different role — the sidebar changes with it.

| User | Role | Sees |
|---|---|---|
| John Britto | Director | Everything, including users and permissions |
| Varsha R | Accounts | Sales, dispatch, finance, purchase, people, reports |
| Selvam K | Production | Orders, looms, dyeing, printing, garment, job work, maintenance, quality |
| Meena P | Quality | Inspection, traceability, stock |
| Rajan M | Stores | Inventory, purchase, dispatch, job work |

---

## What changed in this build

**A new interface.** Sora for headings, Plus Jakarta Sans for the interface,
JetBrains Mono for codes and figures. Violet and teal on a soft grey canvas,
with a **dark mode** toggle in the top bar that remembers your choice. Rounded
cards, gradient sidebar, sticky table headers, a searchable top bar, an alerts
bell and a profile panel.

**Add, edit and delete, everywhere it belongs.** Customers, suppliers, fabrics,
yarn lots, machines, store items, employees, users, roles, designs, garment
styles, maintenance jobs, expenses and sales orders all have proper editors.
Deletes are guarded: a customer with live orders, a yarn lot already consumed, a
fabric that orders reference, a machine loaded with production — the system
explains why instead of corrupting itself.

**Real permissions.** Roles carry a list of screens. The sidebar only shows what
your role may open, and typing a URL directly gets you a polite refusal rather
than the page. Users → Permission matrix is a grid of every screen against every
role; tick a box and it applies immediately. The director role is locked at full
access so nobody can shut themselves out, you cannot delete the account you are
signed in with, and the last director cannot be removed.

**The modules that were missing**, now built:

- **Printing** — designs with colour and screen counts, artwork and buyer
  approval state; print jobs by machine with wastage on close.
- **Garment** — styles with SMV and size range; cutting lots that compute
  standard consumption, wastage and line minutes needed; a live board for each
  stitching line.
- **Maintenance** — breakdown and preventive job cards that drive machine status
  both ways, a preventive schedule with what is due, and downtime and spend
  totalled per machine.
- **People & payroll** — employee records, shift attendance posting, and a
  payroll run with PF and net payable.
- **Finance** — profit and loss, expense vouchers, cost build-up per metre
  against the average selling rate, and a GST working with output tax against
  input credit.

---

## The folder

```
textile-erp/
├── index.html          Sign in (role-aware)
├── dashboard.html      The day at a glance, alerts, delivery risk, spend
├── sales.html          Orders, quotations, customers — all editable
├── dispatch.html       Challans, invoices, payments, customer ageing
├── finance.html        P&L, expenses, cost per metre, GST
├── production.html     Production orders, BOM explosion, daily entry, machine load
├── looms.html          Loom board — status, output, efficiency
├── dyeing.html         Dye batches and recipe management
├── printing.html       Designs, screens, print jobs
├── garment.html        Styles, cutting, stitching lines
├── quality.html        4-point inspection, defect analysis
├── jobwork.html        Job work out and in, loss against the agreed limit
├── maintenance.html    Job cards, preventive schedule, machine history
├── inventory.html      Rolls, yarn lots, dyes/chemicals/packing
├── traceability.html   Roll → batch → machine → yarn lot → supplier
├── purchase.html       Purchase orders, GRN, what to buy next
├── hr.html             Employees, attendance, payroll
├── masters.html        Customer, supplier, fabric, yarn, machine, store masters
├── reports.html        Eight computed reports
├── users.html          Users, roles, permission matrix
├── settings.html       Company, module licensing, backup and reset
│
├── erp-styles.css      The whole design system, both themes
├── erp-core.js         Storage, permissions, shell, tables, CRUD, forms, charts
├── erp-data.js         The data the system starts with
└── README.md
```

Three shared files carry the application. A new screen is a short HTML stub plus
its own script — copy any page and change the middle. `ERP.crud({...})` gives
you a table with working add, edit and delete from a field list; that is how
most of the master screens are written in under fifty lines.

---

## What actually works

Records you create are read back by every other screen.

- Raise a sales order → plan it on Production, where the BOM works out yarn,
  sizing and packing from GSM × width × length and warns if the lot is short.
- Post daily production → production order, sales order and machine figure move.
- Inspect a roll → points, points per 100 sq yd and grade A/B/C on the 4-point
  system; the grade decides stock, hold or rejection.
- Dispatch → only quality-passed metres go out; challan and GST invoice are
  raised together; payment moves the ageing.
- Receive a purchase order → GRN posts and a yarn lot is created.
- Log a breakdown → the machine shows as down on the loom board and the
  dashboard until the job card is closed.
- Trace a roll → back through inspection, dye batch, job work, production order,
  machine, yarn lot and supplier.

---

## Where the data lives

In this browser, under `loomline.db.v2`, so it demos on a laptop at a mill with
no internet. Settings → Download a backup writes the whole database to JSON;
Settings → Reset demo data restores `erp-data.js`. Clearing site data wipes
entries, and two machines do not share records.

To put it on a server, replace `load()` and `save()` in `erp-core.js` with API
calls — everything else already goes through `ERP.db`. Replace `ERP.signIn` with
a real session before anyone outside a demo uses it; the passcode check here is
for demonstration only.

---

## Making it your own

- **Company** — Settings → Company, or the `company` block in `erp-data.js`.
- **Colours and type** — the `:root` and `[data-theme="dark"]` blocks at the top
  of `erp-styles.css`. Every screen follows them.
- **Product name** — "LoomLine" appears in the sidebar and sign-in page.
- **Starting data** — replace the arrays in `erp-data.js` with a prospect's own
  fabrics, looms and customers before a demo. It is the single highest-value
  half hour you can spend on this.

## Still to build

Customer and supplier portals, IoT capture from looms and energy meters,
predictive maintenance and demand forecasting, and multi-company consolidation.
