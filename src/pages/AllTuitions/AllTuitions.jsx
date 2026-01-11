import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Card from "../../components/Home/Card";
import Container from "../../components/Shared/Container";

const AllTuitions = () => {
  const axiosInstance = useAxios();

  // Data states
  const [tuitions, setTuitions] = useState([]);
  const [totalTuitions, setTotalTuitions] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const limit = 8;

  // Filter states
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [budgetRange, setBudgetRange] = useState({ min: "", max: "" });

  // UI state
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchTuitions = async () => {
      setLoading(true);
      setError("");
      try {
        const params = {
          limit,
          skip: currentPage * limit,
          sort,
          order,
        };

        // Add optional filter parameters only if they have values
        if (searchText.trim()) params.search = searchText.trim();
        if (selectedDistrict) params.district = selectedDistrict;
        if (selectedGender) params.tutorGender = selectedGender;
        if (budgetRange.min) params.minBudget = parseInt(budgetRange.min);
        if (budgetRange.max) params.maxBudget = parseInt(budgetRange.max);

        const res = await axiosInstance.get("all-accepted-tuitions-for-client", {
          params,
        });

        setTuitions(res.data.tuitions || []);
        setTotalTuitions(res.data.total || 0);
        const pages = Math.ceil((res.data.total || 0) / limit);
        setTotalPage(pages);
      } catch (error) {
        console.error("Error fetching tuitions:", error);
        setError("Failed to load tuitions. Please try again.");
        setTuitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, [
    currentPage,
    sort,
    order,
    searchText,
    selectedDistrict,
    selectedGender,
    budgetRange,
    axiosInstance,
  ]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchText, selectedDistrict, selectedGender, budgetRange]);

  const handleSortChange = (e) => {
    const [newSort, newOrder] = e.target.value.split("-");
    setSort(newSort);
    setOrder(newOrder);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const resetFilters = () => {
    setSelectedDistrict("");
    setSelectedGender("");
    setBudgetRange({ min: "", max: "" });
    setSearchText("");
    setCurrentPage(0);
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchText || selectedDistrict || selectedGender || budgetRange.min || budgetRange.max;

  // Example districts – adjust to your real data
  const districts = [
    "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal",
    "Sylhet", "Rangpur", "Mymensingh", "Comilla", "Narayanganj",
  ];

  return (
    <div className="my-10">
      <Container>
        <h1 className="text-4xl font-bold mt-10 mb-8 text-center text-primary">
          All Tuitions
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`
              w-full lg:w-80 xl:w-72 
              bg-base-100 p-6 rounded-xl shadow-lg border border-base-200
              lg:sticky lg:top-6 lg:h-fit
              ${showFilters ? "block" : "hidden"} lg:block
            `}
          >
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setShowFilters(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Search (mobile only – desktop has it in header) */}
              <div className="lg:hidden">
                <label className="input input-bordered w-full flex items-center gap-2">
                  <svg
                    className="h-5 opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search tuitions..."
                    value={searchText}
                    onChange={handleSearch}
                    className="flex-1 outline-none"
                  />
                </label>
              </div>

              {/* District Filter */}
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <select
                  className="select select-bordered w-full"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="">All Districts</option>
                  {districts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Preference */}
              <div>
                <h3 className="font-semibold mb-2">Tutor Gender</h3>
                <div className="space-y-2">
                  {["Any", "Male", "Female"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        className="radio radio-primary"
                        checked={selectedGender === g}
                        onChange={() => setSelectedGender(g === "Any" ? "" : g)}
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <h3 className="font-semibold mb-2">Budget (৳/month)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <label className="input input-bordered flex items-center">
                    <input
                      type="number"
                      placeholder="Min"
                      value={budgetRange.min}
                      onChange={(e) =>
                        setBudgetRange((prev) => ({ ...prev, min: e.target.value }))
                      }
                      className="outline-none w-full"
                    />
                  </label>
                  <label className="input input-bordered flex items-center">
                    <input
                      type="number"
                      placeholder="Max"
                      value={budgetRange.max}
                      onChange={(e) =>
                        setBudgetRange((prev) => ({ ...prev, max: e.target.value }))
                      }
                      className="outline-none w-full"
                    />
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col gap-3">
                {hasActiveFilters && (
                  <div className="text-sm text-base-content/70 text-center">
                    {hasActiveFilters && <p>✓ Filters Applied</p>}
                  </div>
                )}
                <button
                  className="btn btn-outline w-full"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">
                  {loading ? "Loading..." : `${totalTuitions} Tuitions Found`}
                </h2>
                <button
                  className="btn btn-sm lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  Filters
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Search – desktop */}
                <label className="input input-bordered hidden lg:flex items-center gap-2 max-w-xs">
                  <svg
                    className="h-5 opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search tuitions..."
                    value={searchText}
                    onChange={handleSearch}
                    className="flex-1 outline-none"
                  />
                </label>

                {/* Sort */}
                <select
                  className="select select-bordered w-full sm:w-48"
                  value={`${sort}-${order}`}
                  onChange={handleSortChange}
                >
                  <option disabled>Sort by...</option>
                  <option value="budget-desc">Budget: High to Low</option>
                  <option value="budget-asc">Budget: Low to High</option>
                  <option value="createdAt-desc">Date: Newest First</option>
                  <option value="createdAt-asc">Date: Oldest First</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mb-6">
                <svg className="h-6 w-6 shrink-0 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Cards */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : tuitions.length === 0 ? (
              <div className="text-center py-20 text-base-content/60">
                <p className="mb-2">No tuitions found matching your filters.</p>
                {hasActiveFilters && (
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={resetFilters}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tuitions.map((tuition) => (
                  <Card key={tuition._id} tuition={tuition} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPage > 1 && (
              <div className="flex justify-center flex-wrap gap-2 mt-12">
                <button
                  className="btn btn-outline"
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Prev
                </button>

                {[...Array(totalPage)].map((_, i) => (
                  <button
                    key={i}
                    className={`btn ${currentPage === i ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setCurrentPage(i)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="btn btn-outline"
                  disabled={currentPage === totalPage - 1}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllTuitions;