#Expense Claim Calculator#

Calculate the total Gross, VAT and Net costs for multiple line items.

[Click here to see a demo](http://owjones.bitbucket.org)

##Usage##

The totals for your expense (Net, VAT, Gross) are shown at the top of the page with line items listed below. To add a line item, simply click the 'Add New Expense' button. Line items include the following fields:

* Date, organised DD/MM/YYYY. This will default to the date of the previous line item or today's date for the first line item, which can obviously be changed. All 3 fields (day, month, year) must be numbers and must create a valid date.
* Expense Type. This determines the category of your expense and also the VAT rate for that expense. The possible expense types are, where Standard indicate the inclusion of VAT (20%) to this expense and Zero indicates no VAT:
    * Telephone - Standard
    * Public Transport & Taxis - Zero
    * Computer Consumables - Standard
    * Subsistence - Standard
    * Overseas Travel - Zero
* Description. A brief description of your expense.
* Gross. The total gross cost of your expense. All other fields in that expense need to be populated before the gross can be entered.

Once you have filled out a line item, the 3 total costs will be updated in the totals bar. As you add more line items the total will update accordingly.

To remove a line item simply click the 'Remove Expense' button underneith the expense you wish to remove. This will remove that line item and update the total with the corresponding costs removed.