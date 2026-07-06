"use client";

import DashboardPageWrapper from "@/components/common/dashboard-page-wrapper";
import DateFilterSelect from "@/components/common/date-filter-select";
import DeleteItemDialog from "@/components/common/delete-item-diallog";
import ErrorComponent from "@/components/common/error-component";
import FilterSearch from "@/components/common/filter-search";
import FilterSelect from "@/components/common/filter-select";
import FilterTabs from "@/components/common/filter-tabs";
import { FromToDateFilter } from "@/components/common/from-to-date-filter";
import { PaginationComponent } from "@/components/common/pagination-component";
import { TableBuilder } from "@/components/common/table-builder";
import ToggleLocale from "@/components/common/toggle-locale";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TestCommon() {
  // Mock data and functions for components
  const mockFilterItems = [
    { label: "common.test-header", value: "all" },
    { label: "common.test-header", value: "active" },
    { label: "common.test-header", value: "inactive" },
  ];

  const mockFilterTabs = [
    { label: "common.test-header", value: "all" },
    { label: "common.test-header", value: "pending" },
    { label: "common.test-header", value: "completed" },
  ];

  const mockTableHeaders = [
    { headName: "test-header", className: "" },
    { headName: "test-header", className: "" },
    { headName: "test-header", className: "" },
  ];

  const mockTableData = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
    },
  ];

  const mockDeleteAction = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: "Item deleted successfully" };
  };

  const mockError = new Error("This is a sample error message");

  return (
    <DashboardPageWrapper
      title="Sample Dashboard Page"
      CTA={() => (
        <Button className="bg-brand hover:bg-brand/90 rounded-xl px-10 py-6 text-white">
          Create New
        </Button>
      )}
    >


      <div className="grid gap-6 pt-10 lg:grid-cols-3">
        {/* Toggle Locale */}
        <section className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Toggle Locale</h2>
          <div className="flex justify-center">
            <ToggleLocale />
          </div>
        </section>

        {/* Date Filter Select */}
        <section className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Date Filter Select</h2>
          <div className="flex justify-center">
            <DateFilterSelect />
          </div>
        </section>

        {/* Filter Select */}
        <section className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Filter Select</h2>
          <FilterSelect
            filterItems={mockFilterItems}
            filterName="status"
            placeholder="Select status"
          />
        </section>

        {/* Filter Tabs */}
        <section className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Filter Tabs</h2>
          <FilterTabs filterTabs={mockFilterTabs} filterName="tab" />
        </section>

        {/* Filter Search */}
        <section className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Filter Search</h2>
          <FilterSearch filterName="query" inputPlaceholder="search for statics" />
        </section>

        {/* From To Date Filter */}
        <section className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">From/To Date Filter</h2>
          <div className="flex justify-center">
            <FromToDateFilter />
          </div>
        </section>

        {/* Delete Item Dialog */}
        <section className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Delete Item Dialog</h2>
          <div className="flex justify-center">
            <DeleteItemDialog
              action={mockDeleteAction}
              itemName="Sample Item"
            />
          </div>
        </section>

        {/* Pagination Component */}
        <section className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Pagination Component</h2>
          <div className="flex justify-center">
            <PaginationComponent currentPage={3} totalPages={10} />
          </div>
        </section>

        {/* Table Builder */}
        <section className="bg-card space-y-4 rounded-xl border p-6 shadow-sm lg:col-span-3">
          <h2 className="text-2xl font-semibold">Table Builder</h2>
          <div className="w-full">
            <TableBuilder
              tableTitle="Sample Table"
              tableHeaders={mockTableHeaders}
              tableData={mockTableData}
              renderRow={(item) => (
                <TableRow key={item.id}>
                  <TableCell className="p-4">{item.name}</TableCell>
                  <TableCell className="p-4">{item.email}</TableCell>
                  <TableCell className="p-4">{item.status}</TableCell>
                </TableRow>
              )}
              headerCTA={() => <Button size="sm">Add Row</Button>}
              paginationCTA={() => (
                <div className="p-4">
                  <PaginationComponent currentPage={1} totalPages={5} />
                </div>
              )}
            />
          </div>
        </section>
      </div>
    </DashboardPageWrapper>
  );
}
